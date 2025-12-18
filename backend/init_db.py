import asyncio
import random
from datetime import datetime, timedelta
from config.database import connect_to_mongo, close_mongo_connection, air_quality_collection

async def init_database():
    """Initialize the database with sample data"""
    # Connect to MongoDB
    await connect_to_mongo()
    
    # Clear existing data
    await air_quality_collection.delete_many({})
    
    # Generate sample data for the past 30 days
    sample_data = []
    base_date = datetime.now() - timedelta(days=30)
    
    for i in range(100):  # Generate 100 sample records
        record_date = base_date + timedelta(hours=i*6)  # Every 6 hours
        
        # Generate realistic air quality data
        record = {
            "pm25": round(random.uniform(20, 150), 2),  # PM2.5 in μg/m³
            "pm10": round(random.uniform(30, 200), 2),  # PM10 in μg/m³
            "co2": round(random.uniform(300, 800), 2),   # CO2 in ppm
            "no2": round(random.uniform(10, 80), 2),    # NO2 in μg/m³
            "so2": round(random.uniform(5, 40), 2),     # SO2 in μg/m³
            "humidity": round(random.uniform(30, 80), 2), # Humidity in %
            "temperature": round(random.uniform(15, 40), 2), # Temperature in °C
            "timestamp": record_date
        }
        
        sample_data.append(record)
    
    # Insert sample data
    result = await air_quality_collection.insert_many(sample_data)
    print(f"Inserted {len(result.inserted_ids)} sample records into the database")
    
    # Close connection
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(init_database())