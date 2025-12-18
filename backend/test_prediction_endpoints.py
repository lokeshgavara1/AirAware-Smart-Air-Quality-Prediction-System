import requests
import json

# Test the prediction endpoints
BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_latest_prediction():
    """Test the /predict/latest endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/predict/latest")
        print("GET /predict/latest")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing /predict/latest: {e}")
        print()

def test_batch_prediction():
    """Test the /predict/batch endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/predict/batch?limit=10")
        print("GET /predict/batch?limit=10")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing /predict/batch: {e}")
        print()

def test_accuracy():
    """Test the /predict/accuracy endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/predict/accuracy")
        print("GET /predict/accuracy")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing /predict/accuracy: {e}")
        print()

def test_heatmap():
    """Test the /predict/heatmap endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/predict/heatmap")
        print("GET /predict/heatmap")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing /predict/heatmap: {e}")
        print()

def test_pm25_prediction():
    """Test the /predict/pm25 endpoint"""
    try:
        data = {
            "pm25": 50.5,
            "pm10": 75.2,
            "co2": 450.0,
            "no2": 30.1,
            "so2": 15.3,
            "temperature": 25.0,
            "humidity": 60.0
        }
        response = requests.post(f"{BASE_URL}/predict/pm25", json=data)
        print("POST /predict/pm25")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Error testing /predict/pm25: {e}")
        print()

if __name__ == "__main__":
    print("Testing Prediction API Endpoints")
    print("=" * 40)
    
    test_latest_prediction()
    test_batch_prediction()
    test_accuracy()
    test_heatmap()
    test_pm25_prediction()