import numpy as np
from typing import Dict, Any, List
from models.air_quality import AirQualityCreate
from utils.model_loader import model_loader

def load_model():
    """Load the trained model from disk using the model loader utility"""
    return model_loader.load_model()

def predict_next_pm25(air_quality_data: Dict[str, Any]) -> float:
    """
    Predict the next PM2.5 value based on current air quality data
    
    Args:
        air_quality_data: Dictionary containing current air quality measurements
            Required keys: pm25, pm10, co2, no2, so2, temperature, humidity
    
    Returns:
        Predicted PM2.5 value
    """
    # Load the model
    model = load_model()
    
    # Extract features in the correct order
    feature_order = ['pm25', 'pm10', 'co2', 'no2', 'so2', 'temperature', 'humidity']
    features = [air_quality_data[key] for key in feature_order]
    
    # Convert to numpy array and reshape for prediction
    X = np.array(features).reshape(1, -1)
    
    # Make prediction
    prediction = model.predict(X)[0]
    
    return float(prediction)

def calculate_accuracy_metrics(actual_values: List[float], predicted_values: List[float]) -> Dict[str, float]:
    """
    Calculate accuracy metrics for predictions
    
    Args:
        actual_values: List of actual PM2.5 values
        predicted_values: List of predicted PM2.5 values
    
    Returns:
        Dictionary containing accuracy metrics
    """
    if len(actual_values) != len(predicted_values):
        raise ValueError("Actual and predicted value lists must have the same length")
    
    # Convert to numpy arrays
    actual = np.array(actual_values)
    predicted = np.array(predicted_values)
    
    # Calculate metrics
    mse = np.mean((actual - predicted) ** 2)
    rmse = np.sqrt(mse)
    
    # R² score
    ss_res = np.sum((actual - predicted) ** 2)
    ss_tot = np.sum((actual - np.mean(actual)) ** 2)
    r2_score = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0
    
    return {
        "mse": float(mse),
        "rmse": float(rmse),
        "r2_score": float(r2_score)
    }

def calculate_error_percentages(actual_values: List[float], predicted_values: List[float]) -> List[float]:
    """
    Calculate percentage errors between actual and predicted values
    
    Args:
        actual_values: List of actual PM2.5 values
        predicted_values: List of predicted PM2.5 values
    
    Returns:
        List of percentage errors
    """
    if len(actual_values) != len(predicted_values):
        raise ValueError("Actual and predicted value lists must have the same length")
    
    # Convert to numpy arrays
    actual = np.array(actual_values)
    predicted = np.array(predicted_values)
    
    # Calculate percentage errors (avoiding division by zero)
    percentage_errors = np.abs((actual - predicted) / np.where(actual != 0, actual, 1)) * 100
    
    return percentage_errors.tolist()