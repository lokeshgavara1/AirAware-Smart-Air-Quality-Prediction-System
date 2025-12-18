from fastapi import APIRouter, HTTPException, Query
from models.air_quality import AirQualityCreate, AirQualityInDB
from services.air_quality_service import (
    get_air_quality_data,
    get_air_quality_item,
    create_air_quality_item,
    get_air_quality_summary,
    get_recent_air_quality_data
)
from typing import List

router = APIRouter()

@router.get("/air-quality", response_model=List[AirQualityInDB])
async def read_air_quality_data(skip: int = 0, limit: int = 100):
    """Get air quality data with pagination"""
    return await get_air_quality_data(skip=skip, limit=limit)

@router.get("/air-quality/recent", response_model=List[AirQualityInDB])
async def read_recent_air_quality_data(limit: int = Query(50, ge=1, le=1000)):
    """Get the most recent N records from MongoDB"""
    return await get_recent_air_quality_data(limit=limit)

@router.get("/air-quality/{item_id}", response_model=AirQualityInDB)
async def read_air_quality_item(item_id: str):
    """Get a specific air quality item by ID"""
    item = await get_air_quality_item(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Air quality item not found")
    return item

@router.post("/air-quality", response_model=AirQualityInDB)
async def create_new_air_quality_item(item: AirQualityCreate):
    """Create a new air quality item"""
    return await create_air_quality_item(item)

@router.get("/air-quality/stats/summary")
async def read_air_quality_summary():
    """Get summary statistics for air quality data"""
    return await get_air_quality_summary()

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "AirAware backend running"}