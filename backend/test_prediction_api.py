import requests
import json

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_prediction_endpoint():
    """Test the PM2.5 prediction endpoint"""
    print("Testing PM2.5 prediction endpoint...")
    
    # Sample data for prediction
    sample_data = {
        "pm25": 50.0,
        "pm10": 75.0,
        "co2": 400.0,
        "no2": 30.0,
        "so2": 10.0,
        "temperature": 25.0,
        "humidity": 60.0
    }
    
    try:
        response = requests.post(f"{BASE_URL}/predict/pm25", json=sample_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_accuracy_endpoint():
    """Test the accuracy metrics endpoint"""
    print("\nTesting accuracy metrics endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/prediction/accuracy")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_comparison_endpoint():
    """Test the comparison data endpoint"""
    print("\nTesting comparison data endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/prediction/comparison?limit=5")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_error_percentages_endpoint():
    """Test the error percentages endpoint"""
    print("\nTesting error percentages endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/prediction/error-percentages")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Testing AirAware Prediction API Endpoints")
    print("=" * 50)
    
    test_prediction_endpoint()
    test_accuracy_endpoint()
    test_comparison_endpoint()
    test_error_percentages_endpoint()
    
    print("\nAPI testing completed!")