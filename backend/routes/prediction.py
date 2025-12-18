from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Dict, Any
from schemas.prediction import (
    LatestPredictionResponse,
    BatchPredictionResponse,
    AccuracyResponse,
    HeatmapResponse
)
from services.prediction_service import (
    predict_next_pm25,
    calculate_accuracy_metrics,
    calculate_error_percentages
)
from services.air_quality_service import get_recent_air_quality_data
from utils.model_loader import model_loader
import json
import os
from datetime import datetime

router = APIRouter()

class PredictionRequest(BaseModel):
    """Request model for PM2.5 prediction"""
    pm25: float
    pm10: float
    co2: float
    no2: float
    so2: float
    temperature: float
    humidity: float

@router.post("/predict/pm25")
async def predict_pm25(request: PredictionRequest):
    """Predict the next PM2.5 value based on current air quality data"""
    try:
        # Convert request to dictionary
        air_quality_data = request.dict()
        
        # Make prediction
        predicted_value = predict_next_pm25(air_quality_data)
        
        return {"predicted_pm25": predicted_value}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.get("/predict/latest", response_model=LatestPredictionResponse)
async def predict_latest():
    """Get the latest PM2.5 prediction based on the most recent data"""
    try:
        # Get the most recent air quality data
        recent_data = await get_recent_air_quality_data(limit=1)
        
        if not recent_data:
            raise HTTPException(status_code=404, detail="No air quality data available")
        
        latest_record = recent_data[0]
        
        # Prepare data for prediction
        air_quality_data = {
            "pm25": latest_record.pm25,
            "pm10": latest_record.pm10,
            "co2": latest_record.co2,
            "no2": latest_record.no2,
            "so2": latest_record.so2,
            "temperature": latest_record.temperature,
            "humidity": latest_record.humidity
        }
        
        # Make prediction
        predicted_value = predict_next_pm25(air_quality_data)
        
        # Determine air quality label based on predicted PM2.5
        if predicted_value <= 12:
            air_quality_label = "Good"
        elif predicted_value <= 35:
            air_quality_label = "Moderate"
        elif predicted_value <= 55:
            air_quality_label = "Unhealthy"
        elif predicted_value <= 150:
            air_quality_label = "Unhealthy"
        elif predicted_value <= 250:
            air_quality_label = "Very Unhealthy"
        else:
            air_quality_label = "Hazardous"
        
        return LatestPredictionResponse(
            predicted_pm25=predicted_value,
            air_quality_label=air_quality_label,
            timestamp=datetime.now()
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to predict latest PM2.5: {str(e)}")

@router.get("/predict/batch", response_model=BatchPredictionResponse)
async def get_batch_predictions(limit: int = Query(100, ge=1, le=1000)):
    """Get batch of actual vs predicted values with timestamps"""
    try:
        # Load comparison data
        comparison_data_path = os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "artifacts", 
            "actual_vs_predicted.json"
        )
        
        # Try artifacts directory first, fallback to data/cleaned
        if not os.path.exists(comparison_data_path):
            comparison_data_path = os.path.join(
                os.path.dirname(__file__), 
                "..", 
                "..", 
                "data", 
                "cleaned", 
                "comparison_data.json"
            )
        
        with open(comparison_data_path, 'r') as f:
            comparison_data = json.load(f)
        
        # Return limited data
        if isinstance(comparison_data, list):
            limited_data = comparison_data[:limit] if limit > 0 else comparison_data
            actual_values = [item['actual'] for item in limited_data]
            predicted_values = [item['predicted'] for item in limited_data]
        else:
            actual_values = comparison_data['actual'][:limit] if limit > 0 else comparison_data['actual']
            predicted_values = comparison_data['predicted'][:limit] if limit > 0 else comparison_data['predicted']
        
        # For timestamps, we'll generate dummy timestamps for now
        # In a real implementation, these would come from the actual data
        timestamps = [datetime.now() for _ in range(len(actual_values))]
        
        return BatchPredictionResponse(
            actual=actual_values,
            predicted=predicted_values,
            timestamps=timestamps
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Comparison data not found. Please run the ML pipeline first.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load comparison data: {str(e)}")

@router.get("/predict/accuracy", response_model=AccuracyResponse)
async def get_prediction_accuracy():
    """Get accuracy metrics for the prediction model"""
    try:
        # Load accuracy data
        accuracy_data_path = os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "artifacts", 
            "accuracy.json"
        )
        
        # Try artifacts directory first, fallback to data/cleaned
        if not os.path.exists(accuracy_data_path):
            # Load comparison data for calculating metrics
            comparison_data_path = os.path.join(
                os.path.dirname(__file__), 
                "..", 
                "..", 
                "data", 
                "cleaned", 
                "comparison_data.json"
            )
            
            with open(comparison_data_path, 'r') as f:
                comparison_data = json.load(f)
            
            # Extract actual and predicted values
            actual_values = [item['actual'] for item in comparison_data]
            predicted_values = [item['predicted'] for item in comparison_data]
            
            # Calculate accuracy metrics
            metrics = calculate_accuracy_metrics(actual_values, predicted_values)
        else:
            # Load pre-calculated accuracy metrics
            with open(accuracy_data_path, 'r') as f:
                metrics = json.load(f)
        
        # Get model information
        model_info = model_loader.get_model_info()
        
        return AccuracyResponse(
            r2_score=metrics["r2_score"],
            mse=metrics["mse"],
            rmse=metrics["rmse"],
            model_used=model_info["model_type"]
        )
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Accuracy data not found. Please run the ML pipeline first.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate accuracy metrics: {str(e)}")

@router.get("/predict/heatmap", response_model=HeatmapResponse)
async def get_heatmap_data():
    """Get error heatmap data (matrix)"""
    try:
        # Load heatmap data
        heatmap_data_path = os.path.join(
            os.path.dirname(__file__), 
            "..", 
            "artifacts", 
            "heatmap.json"
        )
        
        # Try artifacts directory first, fallback to data/cleaned
        if not os.path.exists(heatmap_data_path):
            # Load comparison data for calculating heatmap
            comparison_data_path = os.path.join(
                os.path.dirname(__file__), 
                "..", 
                "..", 
                "data", 
                "cleaned", 
                "comparison_data.json"
            )
            
            with open(comparison_data_path, 'r') as f:
                comparison_data = json.load(f)
            
            # Extract actual and predicted values
            actual_values = [item['actual'] for item in comparison_data]
            predicted_values = [item['predicted'] for item in comparison_data]
            
            # Calculate error percentages
            error_percentages = calculate_error_percentages(actual_values, predicted_values)
        else:
            # Load pre-calculated heatmap data
            with open(heatmap_data_path, 'r') as f:
                heatmap_data = json.load(f)
            error_percentages = heatmap_data['percentage_error']
        
        # Create a matrix for heatmap (10x10)
        matrix_size = 10
        matrix = []
        
        # Take first 100 error percentages and arrange in 10x10 grid
        for i in range(matrix_size):
            row = []
            for j in range(matrix_size):
                index = i * matrix_size + j
                if index < len(error_percentages):
                    row.append(float(error_percentages[index]))
                else:
                    row.append(0.0)
            matrix.append(row)
        
        return HeatmapResponse(matrix=matrix)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Heatmap data not found. Please run the ML pipeline first.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate heatmap data: {str(e)}")