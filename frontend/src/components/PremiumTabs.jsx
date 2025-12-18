import React from 'react';

const PremiumTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'pollutant_trends', label: 'Pollutant Trends', icon: '📈' },
    { id: 'weather', label: 'Weather', icon: '🌤️' },
    { id: 'predictions', label: 'Predictions', icon: '🔮' },
    { id: 'insights', label: 'Insights', icon: '💡' },
    { id: 'alerts', label: 'Alerts', icon: '⚠️' },
    { id: 'heatmap', label: 'Heatmap', icon: '🔥' },
    { id: 'recent_data', label: 'Recent Data', icon: '📋' }
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto px-6 py-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
              ${activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
            `}
          >
            <span className="text-lg mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PremiumTabs;