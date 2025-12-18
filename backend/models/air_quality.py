from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class AirQualityBase(BaseModel):
    pm25: float
    pm10: float
    co2: float
    no2: float
    so2: float
    humidity: float
    temperature: float
    timestamp: datetime

class AirQualityCreate(AirQualityBase):
    pass

class AirQualityUpdate(AirQualityBase):
    pass

class AirQualityInDB(AirQualityBase):
    id: str
    
    class Config:
        orm_mode = True