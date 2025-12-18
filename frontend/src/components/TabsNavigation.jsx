import React from 'react';

const TabsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pollutant_trends', label: 'Pollutant Trends' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'insights', label: 'Insights' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'heatmap', label: 'Heatmap' },
    { id: 'recent_data', label: 'Recent Data' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-4 md:gap-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabsNavigation;