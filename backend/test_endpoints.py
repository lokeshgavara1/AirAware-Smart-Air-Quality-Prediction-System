import requests
import json

# Base URL for the API
BASE_URL = "http://localhost:8000/api/v1"

def test_health_check():
    """Test the health check endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Health Check: {response.status_code} - {response.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")

def test_get_recent_data():
    """Test getting recent air quality data"""
    try:
        response = requests.get(f"{BASE_URL}/air-quality/recent?limit=5")
        print(f"Get Recent Data: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved {len(data)} records")
            if data:
                print("First record:", json.dumps(data[0], indent=2, default=str))
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Get Recent Data Failed: {e}")

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
    print("Testing AirAware API Endpoints")
    print("=" * 30)
    
    test_health_check()
    test_get_recent_data()
    test_get_summary()