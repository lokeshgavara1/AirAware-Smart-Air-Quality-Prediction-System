import React from 'react';

const PollutantCards = ({ pollutants, selectedPollutant, onPollutantSelect }) => {
  // Get status and color for each pollutant level
  const getPollutantStatus = (value, thresholds) => {
    if (value <= thresholds.good) return { label: 'Good', class: 'bg-green-500' };
    if (value <= thresholds.moderate) return { label: 'Moderate', class: 'bg-yellow-500' };
    if (value <= thresholds.unhealthy_sensitive) return { label: 'Unhealthy for Sensitive', class: 'bg-orange-500' };
    if (value <= thresholds.unhealthy) return { label: 'Unhealthy', class: 'bg-red-500' };
    if (value <= thresholds.very_unhealthy) return { label: 'Very Unhealthy', class: 'bg-purple-500' };
    return { label: 'Hazardous', class: 'bg-red-800' };
  };

  // Define thresholds for each pollutant type
  const pollutantThresholds = {
    pm25: { good: 12, moderate: 35, unhealthy_sensitive: 55, unhealthy: 150, very_unhealthy: 250 },
    pm10: { good: 54, moderate: 154, unhealthy_sensitive: 254, unhealthy: 354, very_unhealthy: 420 },
    no2: { good: 53, moderate: 100, unhealthy_sensitive: 360, unhealthy: 649, very_unhealthy: 1249 },
    so2: { good: 75, moderate: 185, unhealthy_sensitive: 304, unhealthy: 604, very_unhealthy: 804 },
    co: { good: 4.4, moderate: 9.4, unhealthy_sensitive: 12.4, unhealthy: 15.4, very_unhealthy: 30.4 },
    o3: { good: 54, moderate: 124, unhealthy_sensitive: 164, unhealthy: 204, very_unhealthy: 404 }
  };

  // Get progress percentage for pollutant bar
  const getProgressPercentage = (value, pollutantType) => {
    const thresholds = pollutantThresholds[pollutantType] || pollutantThresholds.pm25;
    const maxThreshold = thresholds.very_unhealthy || 300;
    return Math.min((value / maxThreshold) * 100, 100);
  };

  // Format pollutant name for display
  const formatPollutantName = (name) => {
    const names = {
      pm25: 'PM2.5',
      pm10: 'PM10',
      no2: 'NO₂',
      so2: 'SO₂',
      co: 'CO',
      o3: 'O₃'
    };
    return names[name] || name.toUpperCase();
  };

  // Format unit for display
  const getUnit = (pollutantType) => {
    const units = {
      pm25: 'μg/m³',
      pm10: 'μg/m³',
      no2: 'μg/m³',
      so2: 'μg/m³',
      co: 'mg/m³',
      o3: 'μg/m³'
    };
    return units[pollutantType] || '';
  };

  const pollutantList = [
    { key: 'pm25', label: 'PM2.5', value: pollutants?.pm25 || 0 },
    { key: 'pm10', label: 'PM10', value: pollutants?.pm10 || 0 },
    { key: 'no2', label: 'NO₂', value: pollutants?.no2 || 0 },
    { key: 'so2', label: 'SO₂', value: pollutants?.so2 || 0 },
    { key: 'co', label: 'CO', value: pollutants?.co || 0 },
    { key: 'o3', label: 'O₃', value: pollutants?.o3 || 0 }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pollutantList.map((pollutant) => {
        const thresholds = pollutantThresholds[pollutant.key];
        const status = getPollutantStatus(pollutant.value, thresholds);
        const isSelected = selectedPollutant === pollutant.key;
        
        return (
          <div 
            key={pollutant.key}
            className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer transition-all duration-300 hover:shadow-md ${
              isSelected ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => onPollutantSelect(pollutant.key)}
          >
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold text-gray-900">
                {formatPollutantName(pollutant.key)}
              </h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                status.label === 'Good' ? 'bg-green-100 text-green-800' : 
                status.label === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 
                status.label.includes('Unhealthy') ? 'bg-red-100 text-red-800' : 
                'bg-purple-100 text-purple-800'
              }`}>
                {status.label}
              </span>
            </div>
            
            <div className="mt-4">
              <p className="text-3xl font-bold text-gray-900">
                {pollutant.value.toFixed(1)}
                <span className="text-sm font-normal text-gray-500 ml-1">{getUnit(pollutant.key)}</span>
              </p>
            </div>
            
            <div className="mt-4 h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${status.class} transition-all duration-500 ease-out`}
                style={{ width: `${getProgressPercentage(pollutant.value, pollutant.key)}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PollutantCards;