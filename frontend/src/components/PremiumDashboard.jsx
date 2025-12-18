import React, { useState } from 'react';
import PremiumHeader from './PremiumHeader';
import PremiumTabs from './PremiumTabs';
import PremiumSummaryCards from './PremiumSummaryCards';
import PremiumMainChart from './PremiumMainChart';
import PremiumComparisonChart from './PremiumComparisonChart';
import PredictionCard from './PredictionCard';
import AccuracyCard from './AccuracyCard';
import PredictionChart from './PredictionChart';
import Heatmap from './Heatmap';
import Chatbot from './Chatbot';
import ChatbotFloatingButton from './ChatbotFloatingButton';

const PremiumDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPollutant, setSelectedPollutant] = useState('pm25');
  const [filters, setFilters] = useState({
    dateRange: '30',
    pollutant: 'pm25',
    city: 'delhi'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handlePollutantChange = (pollutant) => {
    setSelectedPollutant(pollutant);
    setFilters(prev => ({ ...prev, pollutant }));
  };

  const handleLoading = (loading) => {
    setIsLoading(loading);
  };

  const handleError = (error) => {
    if (error) {
      console.error('Dashboard error:', error);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <PremiumSummaryCards 
              selectedPollutant={selectedPollutant}
              onPollutantChange={handlePollutantChange}
              onLoading={handleLoading}
              onError={handleError}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PremiumMainChart 
                selectedPollutant={selectedPollutant}
                filters={filters}
                onLoading={handleLoading}
                onError={handleError}
              />
              <PremiumComparisonChart 
                onLoading={handleLoading}
                onError={handleError}
              />
            </div>
          </div>
        );
      case 'pollutant_trends':
        return (
          <div className="space-y-8">
            <PremiumSummaryCards 
              selectedPollutant={selectedPollutant}
              onPollutantChange={handlePollutantChange}
              onLoading={handleLoading}
              onError={handleError}
            />
            <PremiumMainChart 
              selectedPollutant={selectedPollutant}
              filters={filters}
              onLoading={handleLoading}
              onError={handleError}
            />
          </div>
        );
      case 'predictions':
        return (
          <div className="space-y-8">
            {/* Top row: Prediction Card and Accuracy Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PredictionCard 
                onLoading={handleLoading}
                onError={handleError}
              />
              <AccuracyCard 
                onLoading={handleLoading}
                onError={handleError}
              />
            </div>
            
            {/* Prediction Chart spanning full width */}
            <PredictionChart 
              dateRange={filters.dateRange}
              onLoading={handleLoading}
              onError={handleError}
            />
            
            {/* Heatmap */}
            <Heatmap 
              onLoading={handleLoading}
              onError={handleError}
            />
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-2 text-gray-500">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Air Quality Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor and predict air quality in real-time
          </p>
        </div>
        
        <PremiumTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {renderActiveTab()}
        </div>
      </div>
      
      {/* Chatbot Components */}
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
};

export default PremiumDashboard;