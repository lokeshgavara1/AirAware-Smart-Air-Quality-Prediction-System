import json
import asyncio
import os
from config.database import connect_to_mongo, close_mongo_connection, air_quality_collection

async def load_data_to_mongodb():
    """Load cleaned air quality data from JSON file to MongoDB"""
    # Connect to MongoDB
    await connect_to_mongo()
    
    # Clear existing data
    await air_quality_collection.delete_many({})
    print("Cleared existing data from air_quality collection")
    
    # Check if JSON file exists
    json_file_path = '../data/cleaned/air_quality_data.json'
    if not os.path.exists(json_file_path):
        print(f"Error: JSON file not found at {json_file_path}")
        print("Please run the data preprocessing notebook first to generate the JSON file.")
        return
    
    # Load data from JSON file
    try:
        with open(json_file_path, 'r') as f:
            air_quality_data = json.load(f)
        print(f"Loaded {len(air_quality_data)} records from JSON file")
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON format in the file: {e}")
        return
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        return
    
    # Insert data to MongoDB
    if air_quality_data:
        # Process data to match our data model
        from datetime import datetime
        processed_data = []
        
        for record in air_quality_data:
            try:
                # Create a new record with the correct structure
                processed_record = {}
                
                # Handle timestamp
                if 'Date' in record:
                    processed_record['timestamp'] = datetime.strptime(record['Date'], '%Y-%m-%d %H:%M:%S')
                else:
                    # If no Date field, use current time as fallback
                    processed_record['timestamp'] = datetime.now()
                
                # Map column names to our data model
                column_mapping = {
                    'PM2.5': 'pm25',
                    'PM10': 'pm10',
                    'CO': 'co2',
                    'NO2': 'no2',
                    'SO2': 'so2'
                }
                
                # Copy values with new names
                for old_name, new_name in column_mapping.items():
                    if old_name in record:
                        processed_record[new_name] = float(record[old_name])
                
                # Add default values for any missing fields
                required_fields = ['pm25', 'pm10', 'co2', 'no2', 'so2']
                for field in required_fields:
                    if field not in processed_record:
                        processed_record[field] = 0.0
                
                # Add humidity and temperature with default values
                processed_record['humidity'] = 50.0  # Default value
                processed_record['temperature'] = 25.0  # Default value
                
                processed_data.append(processed_record)
                
            except Exception as e:
                print(f"Error processing record: {e}")
                continue
        
        if processed_data:
            result = await air_quality_collection.insert_many(processed_data)
            print(f"Inserted {len(result.inserted_ids)} records into MongoDB")
        else:
            print("No valid data to insert")
    else:
        print("No data to insert")
    
    # Close connection
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(load_data_to_mongodb())