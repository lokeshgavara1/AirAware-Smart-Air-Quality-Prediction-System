import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './ui/Card';

const PredictionCard = ({ onLoading, onError }) => {
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPrediction();
  }, []);

  const fetchLatestPrediction = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      // Fetch latest prediction from API
      const response = await axios.get('/api/v1/predict/latest');
      
      setPredictionData(response.data);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch prediction data');
      onError('Failed to fetch prediction data');
      setLoading(false);
      onLoading(false);
    }
  };

  // Function to get air quality color based on label
  const getAQIColor = (label) => {
    switch (label) {
      case 'Good':
        return 'bg-green-500';
      case 'Moderate':
        return 'bg-yellow-500';
      case 'Unhealthy':
        return 'bg-red-500';
      case 'Very Unhealthy':
        return 'bg-purple-500';
      case 'Hazardous':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Function to get air quality text color based on label
  const getAQITextColor = (label) => {
    switch (label) {
      case 'Good':
        return 'text-green-800';
      case 'Moderate':
        return 'text-yellow-800';
      case 'Unhealthy':
        return 'text-red-800';
      case 'Very Unhealthy':
        return 'text-purple-800';
      case 'Hazardous':
        return 'text-pink-800';
      default:
        return 'text-gray-800';
    }
  };

  // Function to get air quality background color based on label
  const getAQIBackgroundColor = (label) => {
    switch (label) {
      case 'Good':
        return 'bg-green-100';
      case 'Moderate':
        return 'bg-yellow-100';
      case 'Unhealthy':
        return 'bg-red-100';
      case 'Very Unhealthy':
        return 'bg-purple-100';
      case 'Hazardous':
        return 'bg-pink-100';
      default:
        return 'bg-gray-100';
    }
  };

  if (loading) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="text-center">
          <svg className="h-12 w-12 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Error Loading Data</h3>
          <p className="mt-1 text-sm text-gray-500">{error}</p>
          <button
            onClick={fetchLatestPrediction}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!predictionData) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500">No prediction data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl shadow-md bg-white p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Next PM2.5 Prediction</h3>
          <p className="mt-1 text-sm text-gray-500">Based on current air quality data</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAQIBackgroundColor(predictionData.air_quality_label)} ${getAQITextColor(predictionData.air_quality_label)}`}>
          {predictionData.air_quality_label}
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-3xl font-bold text-gray-900">
          {predictionData.predicted_pm25.toFixed(2)}
          <span className="text-lg font-normal text-gray-500 ml-2">μg/m³</span>
        </p>
      </div>
      
      {/* Color indicator bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${getAQIColor(predictionData.air_quality_label)}`} 
            style={{ 
              width: `${Math.min((predictionData.predicted_pm25 / 300) * 100, 100)}%` 
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>Good</span>
          <span>Unhealthy</span>
          <span>Hazardous</span>
          <span>500+</span>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Updated: {new Date(predictionData.timestamp).toLocaleString()}</p>
      </div>
    </Card>
  );
};

export default PredictionCard;