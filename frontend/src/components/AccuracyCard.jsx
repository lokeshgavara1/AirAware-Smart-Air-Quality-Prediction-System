import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './ui/Card';

const AccuracyCard = ({ onLoading, onError }) => {
  const [accuracyData, setAccuracyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccuracyData();
  }, []);

  const fetchAccuracyData = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      // Fetch accuracy data from API
      const response = await axios.get('/api/v1/predict/accuracy');
      
      setAccuracyData(response.data);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch accuracy data');
      onError('Failed to fetch accuracy data');
      setLoading(false);
      onLoading(false);
    }
  };

  // Function to get rating color based on R² score
  const getRatingColor = (r2Score) => {
    if (r2Score >= 0.9) return 'text-green-600';
    if (r2Score >= 0.7) return 'text-yellow-600';
    if (r2Score >= 0.5) return 'text-orange-600';
    return 'text-red-600';
  };

  // Function to get rating text based on R² score
  const getRatingText = (r2Score) => {
    if (r2Score >= 0.9) return 'Excellent';
    if (r2Score >= 0.7) return 'Good';
    if (r2Score >= 0.5) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
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
            onClick={fetchAccuracyData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!accuracyData) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500">No accuracy data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl shadow-md bg-white p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Model Accuracy</h3>
          <p className="mt-1 text-sm text-gray-500">Performance metrics</p>
        </div>
        <div className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {accuracyData.model_used}
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">R² Score</p>
            <p className={`text-2xl font-bold ${getRatingColor(accuracyData.r2_score)}`}>
              {accuracyData.r2_score.toFixed(3)}
            </p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(accuracyData.r2_score)} bg-opacity-20`}>
            {getRatingText(accuracyData.r2_score)}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Mean Squared Error</p>
          <p className="text-xl font-bold text-gray-900">
            {accuracyData.mse.toFixed(2)}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">Root Mean Squared Error</p>
          <p className="text-xl font-bold text-gray-900">
            {accuracyData.rmse.toFixed(2)}
          </p>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Higher R² = Better fit
        </div>
      </div>
    </Card>
  );
};

export default AccuracyCard;