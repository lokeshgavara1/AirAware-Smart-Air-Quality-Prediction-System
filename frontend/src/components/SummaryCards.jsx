import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SummaryCards = ({ selectedPollutant, onPollutantChange, onLoading, onError }) => {
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
      <div className="summary-cards">
        <h2>Air Quality Summary</h2>
        <div className="cards-loading">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-cards">
        <h2>Air Quality Summary</h2>
        <div className="cards-error">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchSummaryData}>
            Retry
          </button>
        </div>
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
    <div className="summary-cards">
      <h2>Air Quality Summary</h2>
      {pm25Status && (
        <div className={`air-quality-status ${pm25Status.class}`}>
          <h3>Air Quality: {pm25Status.status}</h3>
          <p>Average PM2.5: {summaryData.averages.pm25.toFixed(2)} μg/m³</p>
        </div>
      )}
      <div className="cards-grid">
        {pollutants.map((pollutant) => {
          if (!pollutant.value) return null;
          
          const status = pollutant.id === 'pm25' ? pm25Status : null;
          
          return (
            <div 
              key={pollutant.id}
              className={`summary-card ${selectedPollutant === pollutant.id ? 'selected' : ''}`}
              onClick={() => onPollutantChange(pollutant.id)}
            >
              <h3>{pollutant.name}</h3>
              <p className="value">{pollutant.value.toFixed(2)} {pollutant.unit}</p>
              {status && (
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${Math.min((pollutant.value / 250) * 100, 100)}%`,
                      backgroundColor: getColorForStatus(status.class)
                    }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
        <div className="summary-card">
          <h3>Total Records</h3>
          <p className="value">{summaryData.total_records}</p>
          {summaryData.date_range && (
            <p className="date-range">
              {summaryData.date_range.start ? new Date(summaryData.date_range.start).toLocaleDateString() : 'N/A'} to 
              {summaryData.date_range.end ? new Date(summaryData.date_range.end).toLocaleDateString() : 'N/A'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;