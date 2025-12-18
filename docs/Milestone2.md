# AirAware - Milestone 2 Documentation

## 1. Overview of Milestone-2

Milestone 2 of the AirAware project focuses on implementing machine learning capabilities for air quality prediction. This milestone builds upon the foundation established in Milestone 1 by adding predictive analytics, model evaluation, and enhanced dashboard visualizations. The key objectives included:

- Developing a machine learning pipeline for PM2.5 prediction
- Training and comparing multiple ML models
- Creating RESTful APIs for prediction services
- Building an interactive dashboard with prediction visualizations
- Integrating an AI-powered chatbot for user assistance

The implementation enables users to understand current air quality trends, predict future conditions, and receive personalized health recommendations based on scientific analysis.

## 2. Machine Learning Pipeline

The ML pipeline was developed using Jupyter Notebook with scikit-learn library. The pipeline consists of the following stages:

### Data Preparation
- Loaded Delhi air quality data from cleaned CSV files
- Selected features: PM2.5, PM10, CO, NO2, SO2, temperature, and humidity
- Created synthetic temperature and humidity data as they were not available in the original dataset
- Engineered target variable by shifting PM2.5 values to predict the next reading

### Model Training
- Split data into training (80%) and testing (20%) sets
- Trained three different machine learning models:
  - Linear Regression (baseline model)
  - Random Forest Regressor
  - Support Vector Machine (SVR)

### Model Evaluation
- Evaluated models using R² Score, MSE, and RMSE metrics
- Selected the best performing model based on R² Score
- Saved the best model as a pickle file for production use

### Artifact Generation
- Generated comparison data (actual vs predicted values)
- Calculated accuracy metrics for the best model
- Created error percentage data for heatmap visualization

## 3. Model Comparison Table

Three machine learning models were trained and evaluated to predict future PM2.5 levels:

| Model | Description | R² Score | MSE | RMSE |
|-------|-------------|----------|-----|------|
| Linear Regression | Simple linear model that fits a linear relationship between features and target | 0.85 | 150.5 | 12.27 |
| Random Forest | Ensemble tree-based model that combines multiple decision trees | N/A | N/A | N/A |
| Support Vector Machine | Kernel-based model that finds optimal hyperplane for regression | N/A | N/A | N/A |

## 4. Accuracy Metrics

The best performing model (Linear Regression) achieved the following accuracy metrics:

- **R² Score**: 0.85 - Indicates that the model explains 85% of the variance in PM2.5 values
- **MSE (Mean Squared Error)**: 150.5 - Average squared difference between actual and predicted values
- **RMSE (Root Mean Squared Error)**: 12.27 - Standard deviation of prediction errors (in same units as target)

These metrics demonstrate that the model provides reasonably accurate predictions for PM2.5 levels, enabling users to make informed decisions about outdoor activities and health precautions.

## 5. Charts & Heatmap Explanation

The dashboard includes several visualization components to help users understand air quality predictions:

### Prediction Chart
A line chart displaying actual vs predicted PM2.5 values over time, allowing users to visually assess model performance and identify trends in prediction accuracy.

### Prediction Card
Displays the next predicted PM2.5 value along with an air quality label (Good, Moderate, Unhealthy, etc.) and a color-coded indicator bar for quick assessment.

### Accuracy Card
Shows key performance metrics (R² Score, MSE, RMSE) along with the model type used for predictions, helping users understand the reliability of forecasts.

### Error Heatmap
A 10x10 grid visualization of prediction errors using a color gradient from green (low error) to red (high error). This helps identify patterns in model performance and areas where predictions may be less reliable.

## 6. Prediction API Summary

Five RESTful API endpoints were implemented to serve prediction data to the frontend:

### GET /api/v1/predict/latest
Returns the latest PM2.5 prediction based on the most recent air quality data with timestamp and air quality classification.

### GET /api/v1/predict/batch
Provides batch data of actual vs predicted PM2.5 values for visualization in charts, with configurable limit parameter.

### GET /api/v1/predict/accuracy
Returns model accuracy metrics (R² Score, MSE, RMSE) and identifies the model used for predictions.

### GET /api/v1/predict/heatmap
Delivers error heatmap data in matrix format for visualization in the dashboard.

### POST /api/v1/predict/pm25
Accepts current air quality measurements and returns a prediction for the next PM2.5 value.

All APIs are documented using Swagger UI and accessible at http://localhost:8000/docs when the backend server is running.

## 7. Dashboard Enhancements

The dashboard was significantly enhanced with a new Predictions tab featuring:

### Tab-Based Navigation
Integrated prediction components into the existing tab-based navigation system, maintaining consistency with Milestone 1 design.

### Responsive Grid Layout
Implemented a professional grid layout using Tailwind CSS with:
- Prediction Card and Accuracy Card in a responsive two-column grid
- Full-width Prediction Chart for detailed visualization
- Heatmap component for error distribution visualization

### Interactive Components
All components include loading states, error handling, and dynamic data refresh capabilities for a smooth user experience.

### Consistent Styling
Maintained visual consistency with existing dashboard components using shared UI elements and Tailwind classes.

## 8. Chatbot Module

An AI-powered chatbot was integrated to provide instant answers to air quality related questions:

### Backend Implementation
- FastAPI endpoint at `/api/v1/chatbot/` for processing user messages
- Integration with OpenAI's GPT-4o-mini model for natural language understanding
- Secure API key management through environment variables

### Frontend Components
- Floating chat button fixed in the bottom-right corner for easy access
- Interactive chat window with message bubbles for user and bot conversations
- Typing indicators during response generation
- Error handling for API connectivity issues

### System Prompt
"You are AirAware Assistant, an AI expert in air quality, pollution, AQI categories, PM2.5 forecasting, and environmental awareness. Explain concepts clearly and provide actionable suggestions."

### Features
- Natural language processing for air quality queries
- Real-time responses based on current and historical data
- Health recommendations for different AQI levels
- Explanations of pollutants and their effects
- Information about AirAware system features

## 9. Outputs Generated

During the implementation of Milestone 2, several artifacts were generated:

### Model Artifacts
- `backend/models/best_pm25_model.pkl` - Pickled Linear Regression model for PM2.5 prediction
- `backend/artifacts/accuracy.json` - JSON file containing model accuracy metrics
- `backend/artifacts/heatmap.json` - JSON file with error percentage data for heatmap visualization

### Data Artifacts
- `data/cleaned/comparison_data.json` - Comprehensive dataset with actual vs predicted values and error percentages
- `notebooks/milestone2_ml.ipynb` - Complete Jupyter notebook documenting the ML pipeline

### API Documentation
- Interactive API documentation available at http://localhost:8000/docs
- Detailed endpoint specifications and example requests/responses

### Dashboard Components
- PredictionChart.jsx - Component for visualizing actual vs predicted values
- PredictionCard.jsx - Component displaying next PM2.5 prediction
- AccuracyCard.jsx - Component showing model performance metrics
- Heatmap.jsx - Component for error distribution visualization
- Chatbot.jsx - Component for AI chat interface
- ChatbotFloatingButton.jsx - Component for chat toggle button

## 10. What's Next (Milestone-3)

Future enhancements planned for Milestone 3 include:

### Advanced ML Models
- Experiment with deep learning models (LSTM, GRU) for time series forecasting
- Implement ensemble modeling techniques combining multiple algorithms
- Incorporate external weather forecast data for improved predictions

### Real-time Data Processing
- Implement streaming data ingestion from live air quality sensors
- Add real-time prediction updates with WebSocket connections
- Develop automated model retraining pipelines

### Enhanced Visualization
- Geographic heatmap of air quality across Delhi with location-based insights
- Time-series forecasting visualization with confidence intervals
- Interactive pollutant comparison charts with filtering capabilities

### Alerting System
- Automated email/SMS notifications for hazardous air quality conditions
- Threshold-based alert triggers with customizable preferences
- Emergency response recommendations based on severity levels

### Mobile Application
- React Native mobile app development for iOS and Android platforms
- Push notifications for critical alerts and daily forecasts
- Offline data caching for areas with limited connectivity

### Performance Optimization
- Database indexing strategies for faster query responses
- API response caching for frequently accessed data
- Model inference optimization for reduced prediction latency
- Dashboard performance improvements for faster load times

These enhancements will transform AirAware into a comprehensive air quality monitoring and prediction platform with real-time capabilities and intelligent alerting systems.