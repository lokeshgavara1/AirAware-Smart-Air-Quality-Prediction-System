import React from 'react';
import SummaryCards from './SummaryCards';
import RecentDataTable from './RecentDataTable';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>AirAware – Smart Air Quality Prediction</h1>
      </header>

      <main className="dashboard-main">
        {/* Last few months air quality (real data) */}
        <section className="dashboard-section">
          <SummaryCards />
        </section>

        <section className="dashboard-section">
          <RecentDataTable limit={50} />
        </section>

        {/* Current weather (placeholder) */}
        <section className="dashboard-section">
          <div className="placeholder-card">
            <h2>Current Weather</h2>
            <p>Weather data will be displayed here</p>
          </div>
        </section>

        {/* Predictions (coming soon) */}
        <section className="dashboard-section">
          <div className="placeholder-card">
            <h2>Predictions</h2>
            <p>Machine learning predictions will be displayed here</p>
          </div>
        </section>

        {/* Accuracy heatmap (coming soon) */}
        <section className="dashboard-section">
          <div className="placeholder-card">
            <h2>Accuracy Heatmap</h2>
            <p>Model accuracy heatmap will be displayed here</p>
          </div>
        </section>

        {/* Alerts (coming soon) */}
        <section className="dashboard-section">
          <div className="placeholder-card">
            <h2>Alerts</h2>
            <p>Real-time alerts will be displayed here</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;