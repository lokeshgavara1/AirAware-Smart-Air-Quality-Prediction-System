import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './ui/Card';

const Heatmap = ({ onLoading, onError }) => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHeatmapData();
  }, []);

  const fetchHeatmapData = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      // Fetch heatmap data from API
      const response = await axios.get('/api/v1/predict/heatmap');
      
      setHeatmapData(response.data);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch heatmap data');
      onError('Failed to fetch heatmap data');
      setLoading(false);
      onLoading(false);
    }
  };

  // Function to get color based on error percentage
  const getHeatmapColor = (value) => {
    // Normalize value to 0-100 range for color calculation
    const normalizedValue = Math.min(Math.max(value, 0), 100);
    
    // Green to Yellow to Orange to Red gradient
    if (normalizedValue < 25) {
      // Green (0-25%)
      const intensity = normalizedValue / 25;
      const green = 255;
      const red = Math.floor(255 * intensity);
      return `rgb(${red}, ${green}, 0)`;
    } else if (normalizedValue < 50) {
      // Yellow to Orange (25-50%)
      const intensity = (normalizedValue - 25) / 25;
      const red = 255;
      const green = Math.floor(255 * (1 - intensity * 0.5)); // From 255 to 128
      return `rgb(${red}, ${green}, 0)`;
    } else if (normalizedValue < 75) {
      // Orange to Red (50-75%)
      const intensity = (normalizedValue - 50) / 25;
      const red = 255;
      const green = Math.floor(128 * (1 - intensity)); // From 128 to 0
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // Red (75-100%)
      return 'rgb(255, 0, 0)';
    }
  };

  if (loading) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
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
            onClick={fetchHeatmapData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  if (!heatmapData || !heatmapData.matrix) {
    return (
      <Card className="rounded-xl shadow-md bg-white p-6">
        <div className="text-center">
          <p className="text-gray-500">No heatmap data available</p>
        </div>
      </Card>
    );
  }

  // Flatten the matrix for display
  const flattenedMatrix = heatmapData.matrix.flat();
  
  // Calculate min and max for normalization
  const minValue = Math.min(...flattenedMatrix);
  const maxValue = Math.max(...flattenedMatrix);
  
  // Normalize values to 0-100 range
  const normalizedValues = flattenedMatrix.map(value => {
    if (maxValue === minValue) return 50; // Avoid division by zero
    return ((value - minValue) / (maxValue - minValue)) * 100;
  });

  return (
    <Card className="rounded-xl shadow-md bg-white p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Prediction Error Heatmap</h3>
          <p className="mt-1 text-sm text-gray-500">Model accuracy visualization</p>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="grid grid-cols-10 gap-1">
          {normalizedValues.map((value, index) => (
            <div
              key={index}
              className="aspect-square rounded-sm flex items-center justify-center text-xs font-medium text-white"
              style={{ 
                backgroundColor: getHeatmapColor(value),
                color: value > 50 ? 'white' : 'black'
              }}
              title={`Error: ${flattenedMatrix[index].toFixed(2)}%`}
            >
              {value > 70 ? Math.round(flattenedMatrix[index]) : ''}
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient legend */}
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Low Error</span>
          <span>High Error</span>
        </div>
        <div className="h-4 rounded-full overflow-hidden flex">
          <div className="w-1/4 bg-green-500"></div>
          <div className="w-1/4 bg-yellow-500"></div>
          <div className="w-1/4 bg-orange-500"></div>
          <div className="w-1/4 bg-red-500"></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </Card>
  );
};

export default Heatmap;