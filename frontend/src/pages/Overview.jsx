import React from 'react';
import AirQualitySummary from '../components/AirQualitySummary';
import PollutantCards from '../components/PollutantCards';
import TrendChart from '../components/TrendChart';
import ComparisonChart from '../components/ComparisonChart';

const Overview = ({ 
  aqiData, 
  pollutantData, 
  trendData, 
  comparisonData, 
  selectedPollutant, 
  onPollutantSelect
}) => {
  return (
    <div className="space-y-6">
      {/* First Row: Air Quality Summary and Pollutant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AirQualitySummary aqiData={aqiData} />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Pollutant Levels</h3>
            <PollutantCards 
              pollutants={pollutantData}
              selectedPollutant={selectedPollutant}
              onPollutantSelect={onPollutantSelect}
            />
          </div>
        </div>
      </div>

      {/* PM10 Trend Chart */}
      <div>
        <TrendChart 
          data={trendData}
          title="PM10 Trend Analysis"
        />
      </div>

      {/* Pollutant Comparison Chart (Full Width) */}
      <div>
        <ComparisonChart 
          data={comparisonData}
          title="Pollutant Comparison"
        />
      </div>
    </div>
  );
};

export default Overview;