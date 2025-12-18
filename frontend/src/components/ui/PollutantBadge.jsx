import React from 'react';

const PollutantBadge = ({ pollutant, value, unit, isActive, onClick, className = '' }) => {
  const getPollutantInfo = (pollutant) => {
    switch (pollutant) {
      case 'pm25':
        return { 
          name: 'PM2.5', 
          fullName: 'Fine Particulate Matter',
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'pm10':
        return { 
          name: 'PM10', 
          fullName: 'Coarse Particulate Matter',
          color: 'bg-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'no2':
        return { 
          name: 'NO₂', 
          fullName: 'Nitrogen Dioxide',
          color: 'bg-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200'
        };
      case 'o3':
        return { 
          name: 'O₃', 
          fullName: 'Ground-level Ozone',
          color: 'bg-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200'
        };
      case 'so2':
        return { 
          name: 'SO₂', 
          fullName: 'Sulfur Dioxide',
          color: 'bg-purple-500',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      case 'co':
        return { 
          name: 'CO', 
          fullName: 'Carbon Monoxide',
          color: 'bg-pink-500',
          bgColor: 'bg-pink-50',
          borderColor: 'border-pink-200'
        };
      default:
        return { 
          name: pollutant.toUpperCase(), 
          fullName: pollutant,
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  const pollutantInfo = getPollutantInfo(pollutant);

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 ${
        isActive 
          ? `${pollutantInfo.borderColor} ring-2 ring-offset-2 ${pollutantInfo.color.replace('500', '200')} transform scale-105` 
          : 'border-gray-100 hover:border-gray-200'
      } ${pollutantInfo.bgColor} ${className}`}
    >
      <span className={`text-lg font-bold ${isActive ? pollutantInfo.color : 'text-gray-700'}`}>
        {pollutantInfo.name}
      </span>
      {value !== undefined && (
        <span className={`text-sm font-semibold mt-1 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
          {value} {unit}
        </span>
      )}
      <span className="text-xs text-gray-500 mt-1 text-center">
        {pollutantInfo.fullName}
      </span>
    </button>
  );
};

export default PollutantBadge;