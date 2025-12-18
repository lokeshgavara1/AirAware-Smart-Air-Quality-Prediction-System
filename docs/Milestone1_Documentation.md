# AirAware - Milestone 1 Documentation

## Project Overview

AirAware is a Smart Air Quality Prediction System designed to collect, store, and visualize air quality data for Delhi, India. This system will help monitor pollution levels and provide predictive insights for better environmental management.

## Team Members

- Rajalaksmi
- Rahul
- Sreya
- Lokesh
- Divija Nandana

## Milestone 1 Goals

✅ Project setup
✅ Dataset preparation
✅ MongoDB integration
✅ Backend APIs
✅ Frontend dashboard skeleton
❌ No ML yet (ML coming in Milestone 50–75%)

## Project Structure

```
/airaware
   /backend
      main.py
      /routes
      /models
      /config
      /services
      /utils
      requirements.txt
   /frontend
      src/
      public/
      index.html
      package.json
      vite.config.js
   /notebooks
      data_preprocessing.ipynb
   /docs
      Milestone1_Documentation.md
   /data
      raw/
      cleaned/
```

## Technology Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Motor**: Asynchronous MongoDB driver for Python.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **Python 3.10+**: Programming language.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Next generation frontend tooling.
- **Axios**: Promise based HTTP client for the browser and node.js.
- **TailwindCSS/CSS**: Styling framework.

### Database
- **MongoDB**: Document-oriented NoSQL database.
- **MongoDB Atlas**: Cloud database service.

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 16+
- MongoDB (Local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd airaware/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file in the backend directory with your MongoDB configuration:
   ```env
   MONGODB_URL=mongodb://localhost:27017
   DATABASE_NAME=airaware
   ```

6. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd airaware/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Air Quality Data

- `GET /api/v1/air-quality` - Get air quality data with pagination
- `GET /api/v1/air-quality/{item_id}` - Get a specific air quality item by ID
- `POST /api/v1/air-quality` - Create a new air quality item
- `GET /api/v1/air-quality/stats/summary` - Get summary statistics for air quality data

## Data Model

The system stores air quality data with the following fields:

- `pm25`: PM2.5 concentration (μg/m³)
- `pm10`: PM10 concentration (μg/m³)
- `co2`: Carbon dioxide concentration (ppm)
- `no2`: Nitrogen dioxide concentration (μg/m³)
- `so2`: Sulfur dioxide concentration (μg/m³)
- `humidity`: Humidity percentage (%)
- `temperature`: Temperature in Celsius (°C)
- `timestamp`: Date and time of the reading

## Dataset Preparation

The [data_preprocessing.ipynb](../notebooks/data_preprocessing.ipynb) notebook contains code for:

1. Loading the Delhi Air Quality dataset from Kaggle
2. Data cleaning and preprocessing
3. Handling missing values
4. Saving cleaned data to CSV format

## MongoDB Integration

The system uses MongoDB to store air quality data with the following configuration:

- Database: `airaware`
- Collection: `air_quality`
- Connection: Configurable via environment variables

## Frontend Dashboard

The dashboard includes:

1. Air Quality Data section - Displays current air quality readings
2. Summary Statistics section - Shows data metrics
3. Prediction Models section - Placeholder for ML models
4. Accuracy Metrics section - Placeholder for model accuracy
5. Heatmap Visualization section - Placeholder for geographical visualization
6. Alerts & Notifications section - Placeholder for real-time alerts

## Future Enhancements

- Implementation of machine learning models for air quality prediction
- Real-time data processing
- Advanced visualization features
- Alerting system for hazardous conditions
- Mobile application development

## Team Responsibilities

- **Rajalaksmi**: Backend API development
- **Rahul**: Frontend dashboard implementation
- **Sreya**: Data preprocessing and cleaning
- **Lokesh**: MongoDB integration and database design
- **Divija Nandana**: Documentation and testing

## Conclusion

Milestone 1 successfully establishes the foundation for the AirAware system with a complete project structure, working backend APIs, MongoDB integration, and a frontend dashboard skeleton. The team is now ready to proceed with more advanced features in subsequent milestones.