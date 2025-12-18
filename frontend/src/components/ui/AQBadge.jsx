import React from 'react';

const AQBadge = ({ level, value, className = '' }) => {
  const getAQIInfo = (level) => {
    switch (level) {
      case 'good':
        return { 
          text: 'Good', 
          bgColor: 'bg-green-100', 
          textColor: 'text-green-800',
          description: 'Air quality is satisfactory'
        };
      case 'moderate':
        return { 
          text: 'Moderate', 
          bgColor: 'bg-yellow-100', 
          textColor: 'text-yellow-800',
          description: 'Air quality is acceptable'
        };
      case 'unhealthy_sensitive':
        return { 
          text: 'Unhealthy for Sensitive Groups', 
          bgColor: 'bg-orange-100', 
          textColor: 'text-orange-800',
          description: 'Members of sensitive groups may experience health effects'
        };
      case 'unhealthy':
        return { 
          text: 'Unhealthy', 
          bgColor: 'bg-red-100', 
          textColor: 'text-red-800',
          description: 'Everyone may begin to experience health effects'
        };
      case 'very_unhealthy':
        return { 
          text: 'Very Unhealthy', 
          bgColor: 'bg-purple-100', 
          textColor: 'text-purple-800',
          description: 'Health alert: everyone may experience more serious health effects'
        };
      case 'hazardous':
        return { 
          text: 'Hazardous', 
          bgColor: 'bg-pink-100', 
          textColor: 'text-pink-800',
          description: 'Health warnings of emergency conditions'
        };
      default:
        return { 
          text: 'Unknown', 
          bgColor: 'bg-gray-100', 
          textColor: 'text-gray-800',
          description: 'Unknown air quality level'
        };
    }
  };

  const aqiInfo = getAQIInfo(level);

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${aqiInfo.bgColor} ${aqiInfo.textColor}`}>
        {aqiInfo.text}
      </span>
      {value && (
        <span className="mt-1 text-lg font-bold text-gray-900">
          {value}
        </span>
      )}
      <span className="mt-1 text-xs text-gray-500">
        {aqiInfo.description}
      </span>
    </div>
  );
};

export default AQBadge;