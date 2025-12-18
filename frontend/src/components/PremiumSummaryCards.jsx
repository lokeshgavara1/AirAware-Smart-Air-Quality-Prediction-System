import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './ui/Card';
import AQBadge from './ui/AQBadge';
import PollutantBadge from './ui/PollutantBadge';

const PremiumSummaryCards = ({ selectedPollutant, onPollutantChange, onLoading, onError }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      const response = await axios.get('/api/v1/air-quality/stats/summary');
      setSummaryData(response.data);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch summary data');
      onError('Failed to fetch summary data');
      setLoading(false);
      onLoading(false);
    }
  };

  // Function to get air quality status based on PM2.5 levels
  const getAirQualityStatus = (pm25) => {
    if (pm25 <= 12) return { status: 'Good', class: 'good' };
    if (pm25 <= 35) return { status: 'Moderate', class: 'moderate' };
    if (pm25 <= 55) return { status: 'Unhealthy for Sensitive', class: 'unhealthy-sensitive' };
    if (pm25 <= 150) return { status: 'Unhealthy', class: 'unhealthy' };
    if (pm25 <= 250) return { status: 'Very Unhealthy', class: 'very-unhealthy' };
    return { status: 'Hazardous', class: 'hazardous' };
  };

  // Helper function to get color based on air quality status
  const getColorForStatus = (statusClass) => {
    const colors = {
      'good': '#4ade80',
      'moderate': '#fbbf24',
      'unhealthy-sensitive': '#fb923c',
      'unhealthy': '#f87171',
      'very-unhealthy': '#c084fc',
      'hazardous': '#dc2626'
    };
    return colors[statusClass] || '#667eea';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <h3 className="ml-2 text-lg font-medium text-red-800">Error Loading Data</h3>
        </div>
        <p className="mt-2 text-red-700">{error}</p>
        <button
          onClick={fetchSummaryData}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!summaryData) return <div>No summary data available</div>;

  const pm25Status = summaryData.averages ? getAirQualityStatus(summaryData.averages.pm25) : null;

  // Define pollutants for clickable cards
  const pollutants = [
    { id: 'pm25', name: 'PM2.5', value: summaryData.averages?.pm25, unit: 'μg/m³' },
    { id: 'pm10', name: 'PM10', value: summaryData.averages?.pm10, unit: 'μg/m³' },
    { id: 'co2', name: 'CO2', value: summaryData.averages?.co2, unit: 'ppm' },
    { id: 'no2', name: 'NO2', value: summaryData.averages?.no2, unit: 'μg/m³' },
    { id: 'so2', name: 'SO2', value: summaryData.averages?.so2, unit: 'μg/m³' },
    { id: 'temperature', name: 'Temperature', value: summaryData.averages?.temperature, unit: '°C' },
    { id: 'humidity', name: 'Humidity', value: summaryData.averages?.humidity, unit: '%' }
  ];

  return (
    <div className="space-y-6">
      {/* Air Quality Status Badge */}
      {pm25Status && (
        <div className="mb-6">
          <AQBadge level={pm25Status.class} value={summaryData.averages.pm25.toFixed(2)} />
        </div>
      )}

      {/* Pollutant Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pollutants.map((pollutant) => {
          if (!pollutant.value) return null;
          
          const status = pollutant.id === 'pm25' ? pm25Status : null;
          
          return (
            <PollutantBadge
              key={pollutant.id}
              pollutant={pollutant.id}
              value={pollutant.value.toFixed(2)}
              unit={pollutant.unit}
              isActive={selectedPollutant === pollutant.id}
              onClick={() => onPollutantChange(pollutant.id)}
            />
          );
        })}
        
        {/* Total Records Card */}
        <Card className="flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-medium text-gray-900">Total Records</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">{summaryData.total_records}</p>
          {summaryData.date_range && (
            <p className="mt-2 text-sm text-gray-500">
              {summaryData.date_range.start ? new Date(summaryData.date_range.start).toLocaleDateString() : 'N/A'} to 
              {summaryData.date_range.end ? new Date(summaryData.date_range.end).toLocaleDateString() : 'N/A'}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PremiumSummaryCards;