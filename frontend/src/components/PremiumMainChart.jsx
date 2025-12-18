import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Card from './ui/Card';
import Button from './ui/Button';

const PremiumMainChart = ({ selectedPollutant, filters, onLoading, onError }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChartData();
  }, [selectedPollutant, filters]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      // Fetch data from API
      const response = await axios.get('/api/v1/air-quality/chart-data', {
        params: {
          pollutant: selectedPollutant,
          days: filters.dateRange || 30
        }
      });
      
      setChartData(response.data);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch chart data');
      onError('Failed to fetch chart data');
      setLoading(false);
      onLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          <p className="text-sm text-indigo-600">
            {`${payload[0].name}: ${payload[0].value.toFixed(2)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Card className="h-96">
        <div className="h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-96">
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <svg className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Chart Data</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <Button
            onClick={fetchChartData}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <Card className="h-96">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No chart data available</p>
        </div>
      </Card>
    );
  }

  // Get pollutant name for chart title
  const pollutantNames = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    no2: 'NO2',
    o3: 'O3',
    so2: 'SO2',
    co: 'CO',
    co2: 'CO2',
    temperature: 'Temperature',
    humidity: 'Humidity'
  };

  const pollutantName = pollutantNames[selectedPollutant] || selectedPollutant.toUpperCase();

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {pollutantName} Levels Over Time
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Historical trend analysis for the selected period
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name={pollutantName}
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PremiumMainChart;