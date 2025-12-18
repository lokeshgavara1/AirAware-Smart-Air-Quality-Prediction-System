import pandas as pd
import json
import os

def convert_csv_to_json():
    """Convert cleaned CSV data to JSON format"""
    # Define file paths
    csv_file = '../data/cleaned/delhi_air_quality_cleaned.csv'
    json_file = '../data/cleaned/air_quality_data.json'
    
    # Check if CSV file exists
    if not os.path.exists(csv_file):
        print(f"Error: CSV file not found at {csv_file}")
        return False
    
    try:
        # Read the cleaned CSV file
        print(f"Reading CSV file from {csv_file}")
        df = pd.read_csv(csv_file)
        print(f"Loaded {len(df)} records from CSV file")
        
        # Convert Date column to proper format
        df['Date'] = pd.to_datetime(df['Date'])
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d %H:%M:%S')
        
        # Convert to JSON
        data = df.to_dict('records')
        
        # Save to JSON file
        print(f"Saving JSON data to {json_file}")
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f'Converted {len(data)} records to JSON format')
        print(f'JSON data saved to {json_file}')
        return True
        
    except Exception as e:
        print(f"Error converting CSV to JSON: {e}")
        return False

if __name__ == "__main__":
    convert_csv_to_json()