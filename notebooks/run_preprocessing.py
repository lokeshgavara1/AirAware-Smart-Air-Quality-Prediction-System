import pandas as pd
import numpy as np
import json
from sklearn.preprocessing import MinMaxScaler
from datetime import datetime
import os

def run_data_preprocessing():
    """Run data preprocessing steps directly without Jupyter"""
    print("Starting data preprocessing...")
    
    # Load the dataset
    try:
        df = pd.read_csv('final_dataset.csv')
        print("Dataset loaded successfully!")
    except FileNotFoundError:
        print("Error: Dataset file 'final_dataset.csv' not found.")
        print("Creating sample data for demonstration...")
        # Create sample data for demonstration
        dates = pd.date_range(start='2023-07-01', end='2023-10-31', freq='D')
        df = pd.DataFrame({
            'Date': dates,
            'PM2.5': np.random.uniform(20, 150, len(dates)),
            'PM10': np.random.uniform(30, 200, len(dates)),
            'CO': np.random.uniform(0.5, 5.0, len(dates)),
            'NO2': np.random.uniform(10, 80, len(dates)),
            'SO2': np.random.uniform(5, 40, len(dates)),
            'Ozone': np.random.uniform(10, 100, len(dates))
        })
        print("Generated sample data for demonstration purposes.")

    print(f"Dataset shape: {df.shape}")
    print("Dataset columns:", df.columns.tolist())
    
    # Convert date column to datetime
    df['Date'] = pd.to_datetime(df['Date'])

    # Filter 3-4 months of Delhi AQ data
    start_date = '2023-07-01'
    end_date = '2023-10-31'
    df_filtered = df[(df['Date'] >= start_date) & (df['Date'] <= end_date)]
    print(f"Filtered dataset shape: {df_filtered.shape}")

    # Handle missing values
    df_filtered = df_filtered.dropna()
    print(f"After dropping NA values: {df_filtered.shape}")

    # Remove irrelevant columns - Keep only essential columns
    available_columns = [col for col in ['Date', 'PM2.5', 'PM10', 'CO', 'NO2', 'SO2'] if col in df_filtered.columns]
    if 'Ozone' in df_filtered.columns:
        available_columns.append('Ozone')

    df_essential = df_filtered[available_columns].copy()
    print(f"After keeping essential columns: {df_essential.shape}")
    
    # Normalize numeric features using Min-Max scaling
    numeric_columns = [col for col in df_essential.columns if col != 'Date' and df_essential[col].dtype in ['float64', 'int64']]
    print("Numeric columns to normalize:", numeric_columns)

    # Apply Min-Max scaling
    scaler = MinMaxScaler()
    df_normalized = df_essential.copy()
    df_normalized[numeric_columns] = scaler.fit_transform(df_essential[numeric_columns])

    print("Data after Min-Max normalization:")
    print(df_normalized.describe())

    # Save cleaned data to CSV
    os.makedirs('../data/cleaned', exist_ok=True)
    df_essential.to_csv('../data/cleaned/cleaned_air_quality.csv', index=False)
    print("Cleaned data saved successfully to ../data/cleaned/cleaned_air_quality.csv!")

    # Convert cleaned DataFrame to JSON list for MongoDB insertion
    # Convert Date to string format for JSON serialization
    df_for_mongo = df_essential.copy()
    df_for_mongo['Date'] = df_for_mongo['Date'].dt.strftime('%Y-%m-%d %H:%M:%S')

    # Convert to JSON
    air_quality_json = df_for_mongo.to_dict('records')

    # Save JSON to file
    with open('../data/cleaned/air_quality_data.json', 'w') as f:
        json.dump(air_quality_json, f, indent=2)

    print(f"Converted {len(air_quality_json)} records to JSON format")
    print("JSON data saved successfully to ../data/cleaned/air_quality_data.json!")

    # Display first few records as example
    print("First 3 records in JSON format:")
    print(json.dumps(air_quality_json[:3], indent=2))
    
    print("\nData preprocessing completed successfully!")
    return True

if __name__ == "__main__":
    run_data_preprocessing()