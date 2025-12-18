import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import Card from './ui/Card';
import Button from './ui/Button';

const PremiumComparisonChart = ({ onLoading, onError }) => {
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // 'bar' or 'line'

  useEffect(() => {
    fetchComparisonData();
  }, []);

  const fetchComparisonData = async () => {
    try {
      setLoading(true);
      onError(null);
      onLoading(true);
      
      // Fetch comparison data from API
      const response = await axios.get('/api/v1/predict/batch?limit=50');
      
      // Transform data for chart
      const transformedData = response.data.actual.map((actual, index) => ({
        index: index + 1,
        actual: parseFloat(actual.toFixed(2)),
        predicted: parseFloat(response.data.predicted[index].toFixed(2)),
        difference: parseFloat(Math.abs(actual - response.data.predicted[index]).toFixed(2))
      }));
      
      setComparisonData(transformedData);
      setLoading(false);
      onLoading(false);
    } catch (err) {
      setError('Failed to fetch comparison data');
      onError('Failed to fetch comparison data');
      setLoading(false);
      onLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Sample #{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
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
          <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Comparison Data</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
          <Button
            onClick={fetchComparisonData}
            className="mt-4"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (!comparisonData || comparisonData.length === 0) {
    return (
      <Card className="h-96">
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No comparison data available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Actual vs Predicted PM2.5 Comparison
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Model performance visualization
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={chartType === 'bar' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === 'line' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setChartType('line')}
          >
            Line Chart
          </Button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart
              data={comparisonData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="index" 
                tick={{ fontSize: 12 }}
                label={{ value: 'Sample Index', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'PM2.5 Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="actual"
                name="Actual PM2.5"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="predicted"
                name="Predicted PM2.5"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart
              data={comparisonData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="index" 
                tick={{ fontSize: 12 }}
                label={{ value: 'Sample Index', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: 'PM2.5 Value', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual PM2.5"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#4f46e5', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="Predicted PM2.5"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PremiumComparisonChart;