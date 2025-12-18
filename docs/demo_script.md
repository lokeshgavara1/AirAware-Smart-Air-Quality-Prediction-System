# AirAware Demo Script

## Overview

This script provides a comprehensive walkthrough of the AirAware system, demonstrating all key features including the ML notebook, API calls, dashboard predictions, and chatbot functionality.

## Prerequisites

1. AirAware backend running on `http://localhost:8000`
2. AirAware frontend running on `http://localhost:3000`
3. MongoDB instance with air quality data loaded
4. Trained ML model saved in `backend/models/`

## Demo Flow

### 1. ML Notebook Demonstration

#### Step 1: Open the ML Notebook
- Navigate to `notebooks/milestone2_ml.ipynb`
- Show the notebook structure:
  - Data loading and preprocessing
  - Feature engineering
  - Model training (Linear Regression, Random Forest, SVM)
  - Model evaluation
  - Best model selection
  - Results export

#### Step 2: Highlight Key Sections
- **Data Preparation** (Cells 22-48):
  - Show how raw data is loaded and cleaned
  - Explain feature mapping (CO as proxy for CO2)
  - Note synthetic temperature/humidity generation

- **Model Training** (Cells 71-89):
  - Three models trained simultaneously
  - Consistent evaluation approach

- **Results** (Cells 91-105):
  - R² scores for all models
  - Linear Regression winning with 0.9432

#### Step 3: Show Output Files
- `backend/models/best_pm25_model.pkl` - Saved model
- `data/cleaned/comparison_data.json` - Actual vs Predicted data

### 2. API Calls Demonstration

#### Step 1: Access API Documentation
- Open `http://localhost:8000/docs` in browser
- Show available endpoints under "prediction"

#### Step 2: Demonstrate Key Endpoints

##### a) Latest Prediction
```bash
curl -X GET "http://localhost:8000/api/v1/predict/latest" -H "accept: application/json"
```

Expected Response:
```json
{
  "predicted_pm25": 82.7,
  "air_quality_level": "Unhealthy",
  "model_used": "LinearRegression",
  "timestamp": "2023-06-15T14:30:00Z"
}
```

##### b) Prediction Accuracy
```bash
curl -X GET "http://localhost:8000/api/v1/predict/accuracy" -H "accept: application/json"
```

Expected Response:
```json
{
  "r2_score": 0.9432,
  "mse": 152.45,
  "rmse": 12.35
}
```

##### c) Custom Prediction
```bash
curl -X POST "http://localhost:8000/api/v1/predict/pm25" \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{
  "pm25": 75.5,
  "pm10": 85.2,
  "co2": 420.0,
  "no2": 35.7,
  "so2": 12.3,
  "temperature": 28.5,
  "humidity": 65.0
}'
```

Expected Response:
```json
{
  "predicted_pm25": 78.3
}
```

### 3. Dashboard Predictions Demonstration

#### Step 1: Access the Dashboard
- Open `http://localhost:3000` in browser
- Show the main dashboard layout

#### Step 2: Navigate to Predictions Tab
- Click on "Predictions" in the sidebar
- Show the Prediction Form for custom inputs
- Show Prediction Charts with actual vs predicted values

#### Step 3: Show Model Insights Tab
- Click on "Predictions & Model Insights" tab
- Highlight components:
  - **Prediction Card**: Next PM2.5 prediction with air quality level
  - **Accuracy Card**: R² Score, MSE, RMSE metrics
  - **Prediction Chart**: Visualization of actual vs predicted values
  - **Error Heatmap**: Color-coded prediction errors

#### Step 4: Demonstrate Real-time Updates
- Refresh the dashboard
- Show how data updates dynamically
- Point out the last updated timestamp

### 4. Chatbot Demonstration

#### Step 1: Access Chatbot
- Open the chatbot interface (either dedicated page or embedded in dashboard)
- Show the chat interface with message bubbles

#### Step 2: Demonstrate Sample Queries

##### a) Basic Air Quality Question
**User**: "What is PM2.5 and why is it harmful?"

**Expected Response**: 
"PM2.5 refers to particulate matter that is 2.5 micrometers or smaller in diameter. These tiny particles can penetrate deep into your lungs and even enter your bloodstream. They're harmful because they can cause respiratory issues, cardiovascular problems, and other health complications, especially for children, elderly people, and those with pre-existing conditions."

##### b) Current Conditions Query
**User**: "What are the current air quality conditions in Delhi?"

**Expected Response**:
"Based on the latest data, Delhi's air quality is currently [condition] with a PM2.5 level of [value] μg/m³. This falls in the [category] range according to the AQI scale. I recommend [health advice] for sensitive individuals."

##### c) Prediction Explanation
**User**: "How does the air quality prediction work?"

**Expected Response**:
"Our air quality prediction system uses machine learning models trained on historical Delhi air quality data. The model analyzes patterns in pollutants like PM2.5, PM10, NO2, SO2, and CO, along with weather factors like temperature and humidity. It identifies trends and correlations to forecast future air quality levels. Our best-performing model is Linear Regression with an R² score of 0.9432, meaning it's quite accurate at predicting PM2.5 levels."

##### d) Health Recommendations
**User**: "What precautions should I take today?"

**Expected Response**:
"Based on current air quality data, here are my recommendations:
1. Limit outdoor activities, especially during peak pollution hours (morning and evening)
2. Wear an N95 mask if you must go outside
3. Keep windows closed and use air purifiers indoors
4. Drink plenty of water to help your body flush out pollutants
5. People with asthma, heart conditions, or other respiratory issues should consult their doctor
6. Check back regularly for updated forecasts and alerts"

#### Step 3: Show Quick Suggestions
- Point out the suggestion chips at the bottom
- Demonstrate clicking on suggestions
- Show how they populate the input field

#### Step 4: Demonstrate Loading States
- Send a complex query
- Show the typing indicator animation
- Explain the loading state UX

## Troubleshooting Tips

### If APIs Are Not Responding
1. Check if backend server is running: `cd backend && uvicorn main:app --reload`
2. Verify MongoDB connection
3. Confirm model file exists at `backend/models/best_pm25_model.pkl`

### If Dashboard Is Not Loading
1. Check if frontend server is running: `cd frontend && npm run dev`
2. Verify API endpoints are accessible
3. Check browser console for errors

### If Chatbot Is Not Responding
1. Confirm OpenAI API key is set in `backend/.env`
2. Check internet connectivity
3. Verify `openai` package is installed: `pip install openai>=0.27.0`

## Closing Remarks

The AirAware system demonstrates a complete pipeline from data ingestion to AI-powered predictions and user interaction. Key achievements include:

1. **Accurate Predictions**: 94.32% R² score with Linear Regression model
2. **Real-time Dashboard**: Interactive visualizations with live data
3. **Intelligent Chatbot**: Natural language interface for air quality information
4. **Scalable Architecture**: Well-structured backend with RESTful APIs
5. **User Experience**: Intuitive interface with responsive design

This foundation enables future enhancements like real-time sensor integration, mobile applications, and more sophisticated ML models.