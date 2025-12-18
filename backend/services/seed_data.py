import csv
import asyncio
import os
from datetime import datetime
from config.database import connect_to_mongo, close_mongo_connection, air_quality_collection

async def seed_air_quality_data():
    """Seed air quality data from cleaned CSV file to MongoDB"""
    # Connect to MongoDB
    await connect_to_mongo()
    
    # Clear existing data
    await air_quality_collection.delete_many({})
    print("Cleared existing data from air_quality collection")
    
    # Define CSV file path
    csv_file_path = '../data/cleaned/delhi_air_quality_cleaned.csv'
    
    # Check if CSV file exists
    if not os.path.exists(csv_file_path):
        print(f"Error: CSV file not found at {csv_file_path}")
        print("Please run the data preprocessing steps first.")
        return
    
    # Read and insert data
    try:
        air_quality_data = []
        with open(csv_file_path, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                # Convert data types and structure
                # Handle the date format with extra precision
                date_str = row['Date']
                # Remove extra precision from the date string
                if '.' in date_str:
                    date_str = date_str.split('.')[0]
                
                record = {
                    "timestamp": datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S') if 'Date' in row else datetime.now(),
                    "pm25": float(row['PM2.5']) if 'PM2.5' in row else 0.0,
                    "pm10": float(row['PM10']) if 'PM10' in row else 0.0,
                    "co2": float(row['CO']) if 'CO' in row else 0.0,
                    "no2": float(row['NO2']) if 'NO2' in row else 0.0,
                    "so2": float(row['SO2']) if 'SO2' in row else 0.0,
                    "temperature": 25.0,  # Default value
                    "humidity": 50.0      # Default value
                }
                air_quality_data.append(record)
        
        # Insert data to MongoDB
        if air_quality_data:
            result = await air_quality_collection.insert_many(air_quality_data)
            print(f"Inserted {len(result.inserted_ids)} records into MongoDB")
        else:
            print("No data to insert")
            
    except Exception as e:
        print(f"Error reading or inserting data: {e}")
        import traceback
        traceback.print_exc()
    
    # Close connection
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_air_quality_data())