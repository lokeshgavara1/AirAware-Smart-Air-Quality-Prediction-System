import csv
import json
from datetime import datetime

def convert_csv_to_json():
    """Convert cleaned CSV data to JSON format using basic Python"""
    # Define file paths
    csv_file = '../data/cleaned/delhi_air_quality_cleaned.csv'
    json_file = '../data/cleaned/air_quality_data.json'
    
    try:
        # Read the CSV file
        print(f"Reading CSV file from {csv_file}")
        data = []
        with open(csv_file, 'r', newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Convert Date to proper format
                if 'Date' in row:
                    # Parse the date and reformat it
                    try:
                        date_obj = datetime.strptime(row['Date'], '%Y-%m-%d %H:%M:%S')
                        row['Date'] = date_obj.strftime('%Y-%m-%d %H:%M:%S')
                    except ValueError:
                        # If parsing fails, keep the original format
                        pass
                data.append(row)
        
        print(f"Loaded {len(data)} records from CSV file")
        
        # Save to JSON file
        print(f"Saving JSON data to {json_file}")
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        
        print(f'Converted {len(data)} records to JSON format')
        print(f'JSON data saved to {json_file}')
        
        # Show first few records as example
        print("\nFirst 3 records in JSON format:")
        print(json.dumps(data[:3], indent=2))
        
        return True
        
    except FileNotFoundError:
        print(f"Error: CSV file not found at {csv_file}")
        return False
    except Exception as e:
        print(f"Error converting CSV to JSON: {e}")
        return False

if __name__ == "__main__":
    convert_csv_to_json()