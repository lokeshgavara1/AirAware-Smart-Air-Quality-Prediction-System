# Import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.metrics import r2_score, mean_squared_error
import math
import pickle
import json
import os
import warnings
warnings.filterwarnings('ignore')

print("=== AirAware Milestone-2 ML Pipeline ===")

# 1. Load and Prepare Data
print("\n1. Loading and preparing data...")
# Load the cleaned dataset
df = pd.read_csv('../data/cleaned/delhi_air_quality_cleaned.csv')
print(f"Dataset shape: {df.shape}")
print("Columns:", df.columns.tolist())

# Select features as per requirements
# Note: We need to map the available columns to the required features
# Available columns: Date,Month,Year,Holidays_Count,Days,PM2.5,PM10,NO2,SO2,CO,Ozone,AQI
# Required features: pm25, pm10, co2, no2, so2, temperature, humidity

# Since we don't have temperature and humidity in the dataset, 
# we'll use PM2.5, PM10, NO2, SO2, CO for modeling
# For CO2, we'll use CO values (as a proxy)

# Rename columns to match required feature names
df_features = df[['PM2.5', 'PM10', 'CO', 'NO2', 'SO2']].copy()
df_features.columns = ['pm25', 'pm10', 'co2', 'no2', 'so2']

# Add dummy temperature and humidity values (since they're not in the dataset)
# In a real scenario, these would come from weather data
np.random.seed(42)  # For reproducibility
df_features['temperature'] = np.random.normal(25, 5, len(df_features))  # Mean 25°C, std 5°C
df_features['humidity'] = np.random.normal(60, 15, len(df_features))    # Mean 60%, std 15%

print("Feature dataset shape:", df_features.shape)

# 2. Create Target Variable
print("\n2. Creating target variable...")
# Create target variable: Predict next PM2.5 value
df_features["target_pm25"] = df_features["pm25"].shift(-1)

# Drop rows with NaN values
df_features.dropna(inplace=True)

print(f"Dataset shape after creating target: {df_features.shape}")

# 3. Train/Test Split (80/20)
print("\n3. Creating train/test split...")
# Define features and target
feature_columns = ['pm25', 'pm10', 'co2', 'no2', 'so2', 'temperature', 'humidity']
X = df_features[feature_columns]
y = df_features["target_pm25"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training set size: {X_train.shape}")
print(f"Testing set size: {X_test.shape}")

# 4. Model Training
print("\n4. Training models...")
# Initialize models
models = {
    'Linear Regression': LinearRegression(),
    'Random Forest': RandomForestRegressor(n_estimators=100, random_state=42),
    'Support Vector Machine': SVR(kernel='rbf')
}

# Train models and store predictions
trained_models = {}
predictions = {}

for name, model in models.items():
    print(f"Training {name}...")
    model.fit(X_train, y_train)
    trained_models[name] = model
    predictions[name] = model.predict(X_test)
    print(f"{name} training completed.")

# 5. Model Evaluation
print("\n5. Evaluating models...")
# Evaluate models
evaluation_results = {}

for name, y_pred in predictions.items():
    r2 = r2_score(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = math.sqrt(mse)
    
    evaluation_results[name] = {
        'R2_Score': r2,
        'MSE': mse,
        'RMSE': rmse
    }
    
    print(f"\n{name} Results:")
    print(f"  R² Score: {r2:.4f}")
    print(f"  MSE: {mse:.4f}")
    print(f"  RMSE: {rmse:.4f}")

# 6. Identify Best Model
print("\n6. Identifying best model...")
# Find the best model based on R² score
best_model_name = max(evaluation_results, key=lambda x: evaluation_results[x]['R2_Score'])
best_model = trained_models[best_model_name]

print(f"Best Model: {best_model_name}")
print(f"R² Score: {evaluation_results[best_model_name]['R2_Score']:.4f}")

# 7. Save Best Model
print("\n7. Saving best model...")
# Create models directory if it doesn't exist
os.makedirs('../backend/models', exist_ok=True)

# Save the best model
model_path = '../backend/models/best_pm25_model.pkl'
with open(model_path, 'wb') as f:
    pickle.dump(best_model, f)

print(f"Best model ({best_model_name}) saved to {model_path}")

# 8. Generate Actual vs Predicted Arrays
print("\n8. Generating actual vs predicted arrays...")
# Get predictions from the best model
best_predictions = predictions[best_model_name]

# Store actual vs predicted values
actual_vs_predicted = {
    'actual': y_test.values.tolist(),
    'predicted': best_predictions.tolist()
}

print(f"Number of actual values: {len(actual_vs_predicted['actual'])}")
print(f"Number of predicted values: {len(actual_vs_predicted['predicted'])}")

# 9. Calculate Accuracy Values
print("\n9. Calculating accuracy values...")
# Calculate accuracy metrics for the best model
accuracy_values = evaluation_results[best_model_name]
print("Accuracy values for the best model:")
for metric, value in accuracy_values.items():
    print(f"  {metric}: {value:.4f}")

# 10. Calculate Error-Percentage Matrix for Heatmap
print("\n10. Calculating error percentages...")
# Calculate error percentages
actual_vals = np.array(actual_vs_predicted['actual'])
predicted_vals = np.array(actual_vs_predicted['predicted'])

# Calculate percentage error (avoiding division by zero)
percentage_errors = np.abs((actual_vals - predicted_vals) / np.where(actual_vals != 0, actual_vals, 1)) * 100

# Create error matrix for heatmap visualization
error_matrix = {
    'actual': actual_vals.tolist(),
    'predicted': predicted_vals.tolist(),
    'percentage_error': percentage_errors.tolist()
}

print(f"Calculated {len(percentage_errors)} error percentages")
print(f"Mean percentage error: {np.mean(percentage_errors):.2f}%")

# 11. Export Comparison Dataset as JSON for Dashboard
print("\n11. Exporting comparison dataset as JSON...")
# Create comparison dataset
comparison_data = []
for i in range(len(actual_vals)):
    comparison_data.append({
        'index': i,
        'actual': float(actual_vals[i]),
        'predicted': float(predicted_vals[i]),
        'percentage_error': float(percentage_errors[i])
    })

# Save as JSON
comparison_json_path = '../data/cleaned/comparison_data.json'
with open(comparison_json_path, 'w') as f:
    json.dump(comparison_data, f, indent=2)

print(f"Comparison dataset exported to {comparison_json_path}")
print(f"Total records exported: {len(comparison_data)}")

# 12. Summary
print("\n=== MILESTONE-2 SUMMARY ===")
print(f"Best Model: {best_model_name}")
print(f"R² Score: {evaluation_results[best_model_name]['R2_Score']:.4f}")
print(f"MSE: {evaluation_results[best_model_name]['MSE']:.4f}")
print(f"RMSE: {evaluation_results[best_model_name]['RMSE']:.4f}")
print(f"Model saved to: ../backend/models/best_pm25_model.pkl")
print(f"Comparison data exported to: ../data/cleaned/comparison_data.json")

print("\nMilestone-2 ML Pipeline completed successfully!")