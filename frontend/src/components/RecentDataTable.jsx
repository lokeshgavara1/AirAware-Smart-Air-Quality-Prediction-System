import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentDataTable = ({ limit = 10 }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [limit]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/air-quality/recent?limit=${limit}`);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recent data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="recent-data-table">
        <h2>Recent Air Quality Data</h2>
        <div className="table-loading">
          <p>Loading recent data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-data-table">
        <h2>Recent Air Quality Data</h2>
        <div className="table-error">
          <p>{error}</p>
          <button className="retry-button" onClick={fetchData}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="recent-data-table">
        <h2>Recent Air Quality Data</h2>
        <div className="table-empty">
          <p>No recent data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-data-table">
      <h2>Recent Air Quality Data</h2>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>PM2.5</th>
              <th>PM10</th>
              <th>NO2</th>
              <th>O3</th>
              <th>SO2</th>
              <th>CO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleString()}</td>
                <td>{record.pm25?.toFixed(2) || '-'}</td>
                <td>{record.pm10?.toFixed(2) || '-'}</td>
                <td>{record.no2?.toFixed(2) || '-'}</td>
                <td>{record.o3?.toFixed(2) || '-'}</td>
                <td>{record.so2?.toFixed(2) || '-'}</td>
                <td>{record.co?.toFixed(2) || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDataTable;