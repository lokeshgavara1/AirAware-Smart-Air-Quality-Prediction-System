from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class LatestPredictionResponse(BaseModel):
    """Response model for latest PM2.5 prediction"""
    predicted_pm25: float
    air_quality_label: str  # Changed from air_quality_level to air_quality_label
    timestamp: datetime

class BatchPredictionResponse(BaseModel):
    """Response model for batch predictions"""
    actual: List[float]
    predicted: List[float]
    timestamps: List[datetime]

class AccuracyResponse(BaseModel):
    """Response model for accuracy metrics"""
    r2_score: float
    mse: float
    rmse: float
    model_used: str

class HeatmapResponse(BaseModel):
    """Response model for heatmap data"""
    matrix: List[List[float]]  # Changed to match requirement