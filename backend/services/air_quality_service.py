from models.air_quality import AirQualityCreate, AirQualityInDB
from config.database import air_quality_collection
from bson import ObjectId
from typing import List, Optional
from datetime import datetime

async def get_air_quality_data(skip: int = 0, limit: int = 100) -> List[AirQualityInDB]:
    """Retrieve air quality data from MongoDB with pagination"""
    cursor = air_quality_collection.find().skip(skip).limit(limit)
    air_quality_list = []
    
    async for document in cursor:
        # Convert ObjectId to string for the id field
        document["id"] = str(document["_id"])
        del document["_id"]
        air_quality_list.append(AirQualityInDB(**document))
    
    return air_quality_list

async def get_air_quality_item(item_id: str) -> Optional[AirQualityInDB]:
    """Retrieve a specific air quality item by ID from MongoDB"""
    document = await air_quality_collection.find_one({"_id": ObjectId(item_id)})
    
    if document:
        document["id"] = str(document["_id"])
        del document["_id"]
        return AirQualityInDB(**document)
    
    return None

async def create_air_quality_item(item: AirQualityCreate) -> AirQualityInDB:
    """Create a new air quality item in MongoDB"""
    item_dict = item.dict()
    result = await air_quality_collection.insert_one(item_dict)
    
    # Add the inserted ID to the item
    item_dict["id"] = str(result.inserted_id)
    
    return AirQualityInDB(**item_dict)

async def get_air_quality_summary():
    """Get summary statistics for air quality data"""
    total_count = await air_quality_collection.count_documents({})
    
    if total_count == 0:
        return {"message": "No data available"}
    
    # Get the first and last records for date range
    first_record = await air_quality_collection.find_one(sort=[("timestamp", 1)])
    last_record = await air_quality_collection.find_one(sort=[("timestamp", -1)])
    
    # Calculate averages for key metrics
    pipeline = [
        {
            "$group": {
                "_id": None,
                "avg_pm25": {"$avg": "$pm25"},
                "avg_pm10": {"$avg": "$pm10"},
                "avg_co2": {"$avg": "$co2"},
                "avg_no2": {"$avg": "$no2"},
                "avg_so2": {"$avg": "$so2"},
                "avg_temperature": {"$avg": "$temperature"},
                "avg_humidity": {"$avg": "$humidity"},
                "min_pm25": {"$min": "$pm25"},
                "max_pm25": {"$max": "$pm25"},
                "min_pm10": {"$min": "$pm10"},
                "max_pm10": {"$max": "$pm10"},
            }
        }
    ]
    
    stats_result = await air_quality_collection.aggregate(pipeline).to_list(length=1)
    stats = stats_result[0] if stats_result else {}
    
    return {
        "total_records": total_count,
        "date_range": {
            "start": first_record["timestamp"] if first_record else None,
            "end": last_record["timestamp"] if last_record else None
        },
        "averages": {
            "pm25": round(stats.get("avg_pm25", 0), 2) if "avg_pm25" in stats else 0,
            "pm10": round(stats.get("avg_pm10", 0), 2) if "avg_pm10" in stats else 0,
            "co2": round(stats.get("avg_co2", 0), 2) if "avg_co2" in stats else 0,
            "no2": round(stats.get("avg_no2", 0), 2) if "avg_no2" in stats else 0,
            "so2": round(stats.get("avg_so2", 0), 2) if "avg_so2" in stats else 0,
            "temperature": round(stats.get("avg_temperature", 0), 2) if "avg_temperature" in stats else 0,
            "humidity": round(stats.get("avg_humidity", 0), 2) if "avg_humidity" in stats else 0,
        },
        "ranges": {
            "pm25": {
                "min": stats.get("min_pm25", 0) if "min_pm25" in stats else 0,
                "max": stats.get("max_pm25", 0) if "max_pm25" in stats else 0
            },
            "pm10": {
                "min": stats.get("min_pm10", 0) if "min_pm10" in stats else 0,
                "max": stats.get("max_pm10", 0) if "max_pm10" in stats else 0
            }
        }
    }

async def get_recent_air_quality_data(limit: int = 50) -> List[AirQualityInDB]:
    """Get the most recent N records from MongoDB"""
    cursor = air_quality_collection.find().sort("timestamp", -1).limit(limit)
    air_quality_list = []
    
    async for document in cursor:
        # Convert ObjectId to string for the id field
        document["id"] = str(document["_id"])
        del document["_id"]
        air_quality_list.append(AirQualityInDB(**document))
    
    return air_quality_list