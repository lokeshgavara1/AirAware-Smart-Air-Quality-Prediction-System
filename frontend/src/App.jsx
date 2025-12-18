import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import FilterBar from './components/FilterBar';
import TabsNavigation from './components/TabsNavigation';
import Overview from './pages/Overview';
import Chatbot from './components/Chatbot';
import ChatbotFloatingButton from './components/ChatbotFloatingButton';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPollutant, setSelectedPollutant] = useState('pm25');
  const [filters, setFilters] = useState({
    dateRange: '30',
    pollutant: 'pm25',
    city: 'delhi'
  });
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [aqiData, setAqiData] = useState(null);
  const [pollutantData, setPollutantData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  // Fetch data when filters change
  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    try {
      // Mock data for demonstration
      // In a real app, you would fetch from your API endpoints
      setAqiData({
        aqi: 85,
        pm25: 42.3,
        timestamp: new Date()
      });

      setPollutantData({
        pm25: 42.3,
        pm10: 68.7,
        no2: 28.5,
        so2: 12.1,
        co: 1.2,
        o3: 45.8
      });

      // Mock trend data
      const mockTrendData = [];
      for (let i = 0; i < 30; i++) {
        mockTrendData.push({
          date: `Day ${i + 1}`,
          value: 30 + Math.random() * 50
        });
      }
      setTrendData(mockTrendData);

      // Mock comparison data
      const mockComparisonData = [];
      for (let i = 0; i < 10; i++) {
        mockComparisonData.push({
          name: `Sample ${i + 1}`,
          actual: 30 + Math.random() * 70,
          predicted: 30 + Math.random() * 70
        });
      }
      setComparisonData(mockComparisonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePollutantSelect = (pollutant) => {
    setSelectedPollutant(pollutant);
    setFilters(prev => ({ ...prev, pollutant }));
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div className="App">
      <div className="dashboard-layout">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Air Quality Dashboard</h1>
          <p className="dashboard-subtitle">Monitor and predict air quality in real-time</p>
        </div>

        <FilterBar 
          filters={filters} 
          setFilters={setFilters} 
          onRefresh={handleRefresh} 
        />

        <TabsNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <Overview 
          aqiData={aqiData}
          pollutantData={pollutantData}
          trendData={trendData}
          comparisonData={comparisonData}
          selectedPollutant={selectedPollutant}
          onPollutantSelect={handlePollutantSelect}
        />
      </div>

      <ChatbotFloatingButton 
        onClick={() => setIsChatbotOpen(!isChatbotOpen)} 
        isOpen={isChatbotOpen} 
      />
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
}

export default App;