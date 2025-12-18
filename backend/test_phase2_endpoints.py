import requests
import json

# Base URL for the API
BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_latest_prediction():
    """Test the latest prediction endpoint"""
    print("Testing /predict/latest endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/predict/latest")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

def test_batch_predictions():
    """Test the batch predictions endpoint"""
    print("\nTesting /predict/batch endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/predict/batch?limit=5")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

def test_accuracy():
    """Test the accuracy endpoint"""
    print("\nTesting /predict/accuracy endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/predict/accuracy")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

def test_heatmap():
    """Test the heatmap endpoint"""
    print("\nTesting /predict/heatmap endpoint...")
    
    try:
        response = requests.get(f"{BASE_URL}/predict/heatmap")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    print("Testing AirAware Phase 2 API Endpoints")
    print("=" * 50)
    
    test_latest_prediction()
    test_batch_predictions()
    test_accuracy()
    test_heatmap()
    
    print("\nPhase 2 API testing completed!")