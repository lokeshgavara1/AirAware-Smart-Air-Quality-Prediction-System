import json
import os

def test_json_file():
    """Test if the JSON file is properly formatted"""
    json_file_path = '../data/cleaned/air_quality_data.json'
    
    # Check if file exists
    if not os.path.exists(json_file_path):
        print(f"JSON file not found at {json_file_path}")
        return False
    
    # Try to load and parse JSON
    try:
        with open(json_file_path, 'r') as f:
            data = json.load(f)
        
        print(f"JSON file loaded successfully with {len(data)} records")
        
        # Check first record structure
        if data:
            first_record = data[0]
            print("First record structure:")
            for key, value in first_record.items():
                print(f"  {key}: {value} ({type(value).__name__})")
            
            # Check required fields
            required_fields = ['Date', 'PM2.5', 'PM10', 'CO', 'NO2', 'SO2']
            missing_fields = [field for field in required_fields if field not in first_record]
            
            if missing_fields:
                print(f"Missing fields in JSON data: {missing_fields}")
                return False
            else:
                print("All required fields present in JSON data")
                return True
        else:
            print("JSON file is empty")
            return False
            
    except json.JSONDecodeError as e:
        print(f"Invalid JSON format: {e}")
        return False
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        return False

if __name__ == "__main__":
    print("Testing JSON data file...")
    success = test_json_file()
    if success:
        print("JSON file test PASSED")
    else:
        print("JSON file test FAILED")