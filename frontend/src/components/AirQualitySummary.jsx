import React from 'react';

const AirQualitySummary = ({ aqiData }) => {
  // Determine AQI category and color
  const getAQICategory = (aqi) => {
    if (aqi <= 50) return { label: 'Good', class: 'bg-green-500' };
    if (aqi <= 100) return { label: 'Moderate', class: 'bg-yellow-500' };
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', class: 'bg-orange-500' };
    if (aqi <= 200) return { label: 'Unhealthy', class: 'bg-red-500' };
    if (aqi <= 300) return { label: 'Very Unhealthy', class: 'bg-purple-500' };
    return { label: 'Hazardous', class: 'bg-red-800' };
  };

  // Get progress percentage for status bar
  const getProgressPercentage = (aqi) => {
    return Math.min((aqi / 500) * 100, 100);
  };

  const aqiCategory = aqiData ? getAQICategory(aqiData.aqi) : { label: 'Unknown', class: 'bg-gray-500' };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Air Quality Index</h3>
          <p className="mt-1 text-sm text-gray-500">Current conditions in Delhi</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${aqiCategory.class}`}>
          {aqiCategory.label}
        </span>
      </div>
      
      <div className="mt-6">
        <p className="text-5xl font-bold text-gray-900">
          {aqiData?.aqi || 'N/A'}
          <span className="text-lg font-normal text-gray-500 ml-2">AQI</span>
        </p>
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>0</span>
          <span>Good</span>
          <span>Unhealthy</span>
          <span>Hazardous</span>
          <span>500+</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${aqiCategory.class} transition-all duration-500 ease-out`}
            style={{ width: `${getProgressPercentage(aqiData?.aqi || 0)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">PM2.5 Level</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {aqiData?.pm25 !== undefined ? aqiData.pm25.toFixed(1) : 'N/A'}
            <span className="text-sm font-normal text-gray-500 ml-1">μg/m³</span>
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Last Updated</p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {aqiData?.timestamp ? new Date(aqiData.timestamp).toLocaleString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirQualitySummary;