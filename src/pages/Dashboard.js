import React, { useState, useEffect, useCallback } from 'react';
import MetricCard from '../components/MetricCard';
import ChartWidget from '../components/ChartWidget';
import TableWidget from '../components/TableWidget';
import StatCard from '../components/StatCard';
import { fetchDashboardData } from '../utils/dataUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await fetchDashboardData(selectedPeriod);
      setData(dashboardData);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedPeriod]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = () => {
    loadData();
  };

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Business Dashboard</h1>
          <div className="header-controls">
            <select 
              value={selectedPeriod} 
              onChange={handlePeriodChange}
              className="period-selector"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button onClick={handleRefresh} className="refresh-button">
              ↻ Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Key Metrics Section */}
        <section className="metrics-section">
          <div className="metrics-grid">
            <MetricCard
              title="Total Revenue"
              value={data.metrics.totalRevenue}
              change={data.metrics.revenueChange}
              icon="💰"
            />
            <MetricCard
              title="Active Users"
              value={data.metrics.activeUsers}
              change={data.metrics.usersChange}
              icon="👥"
            />
            <MetricCard
              title="Conversion Rate"
              value={`${data.metrics.conversionRate}%`}
              change={data.metrics.conversionChange}
              icon="📈"
            />
            <MetricCard
              title="Avg. Order Value"
              value={data.metrics.avgOrderValue}
              change={data.metrics.orderValueChange}
              icon="🛒"
            />
          </div>
        </section>

        {/* Charts Section */}
        <section className="charts-section">
          <div className="charts-grid">
            <ChartWidget
              title="Revenue Trend"
              type="line"
              data={data.charts.revenueTrend}
              height={300}
            />
            <ChartWidget
              title="Sales by Category"
              type="bar"
              data={data.charts.salesByCategory}
              height={300}
            />
            <ChartWidget
              title="Traffic Sources"
              type="pie"
              data={data.charts.trafficSources}
              height={300}
            />
            <ChartWidget
              title="User Growth"
              type="area"
              data={data.charts.userGrowth}
              height={300}
            />
          </div>
        </section>

        {/* Statistics and Table Section */}
        <section className="bottom-section">
          <div className="bottom-grid">
            <div className="stats-container">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                {data.stats.map((stat, index) => (
                  <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                  />
                ))}
              </div>
            </div>
            <TableWidget
              title="Recent Transactions"
              data={data.recentTransactions}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'customer', label: 'Customer' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' },
                { key: 'date', label: 'Date' }
              ]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;