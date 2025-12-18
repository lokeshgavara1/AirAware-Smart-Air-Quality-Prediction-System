import requests
import json
from datetime import datetime

# Base URL for the API
BASE_URL = "http://localhost:8000/api/v1"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/../health")
        print(f"Health Check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")

def test_get_air_quality_data():
    """Test getting air quality data"""
    try:
        response = requests.get(f"{BASE_URL}/air-quality")
        print(f"Get Air Quality Data: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved {len(data)} records")
            if data:
                print("First record:", json.dumps(data[0], indent=2, default=str))
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Get Air Quality Data Failed: {e}")

def test_create_air_quality_data():
    """Test creating air quality data"""
    try:
        sample_data = {
            "pm25": 45.5,
            "pm10": 75.2,
            "co2": 420.3,
            "no2": 35.1,
            "so2": 12.4,
            "humidity": 65.0,
            "temperature": 28.5,
            "timestamp": datetime.now().isoformat()
        }
        
        response = requests.post(f"{BASE_URL}/air-quality", json=sample_data)
        print(f"Create Air Quality Data: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Created record:", json.dumps(data, indent=2, default=str))
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Create Air Quality Data Failed: {e}")

def test_get_summary():
    """Test getting summary statistics"""
    try:
        response = requests.get(f"{BASE_URL}/air-quality/stats/summary")
        print(f"Get Summary: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("Summary:", json.dumps(data, indent=2, default=str))
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Get Summary Failed: {e}")

if __name__ == "__main__":
    print("Testing AirAware API")
    print("=" * 30)
    
    test_health_check()
    test_get_air_quality_data()
    test_create_air_quality_data()
    test_get_summary()