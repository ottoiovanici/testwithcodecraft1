import React from 'react';
import QuickStats from '../components/dashboard/QuickStats';
import AnalyticsChart from '../components/dashboard/AnalyticsChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import TopItems from '../components/dashboard/TopItems';
import Chart from '../components/dashboard/Chart';
import { mockData } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      <QuickStats data={mockData.overview} />
      
      <div className="dashboard-grid">
        <div className="grid-item-large">
          <AnalyticsChart 
            data={mockData.trafficData} 
            title="Website Traffic" 
          />
        </div>
        
        <div className="grid-item">
          <div className="widget">
            <div className="widget-header">
              <h3>Revenue by Category</h3>
            </div>
            <Chart
              type="pie"
              data={mockData.revenueByCategory}
              dataKey="value"
              height={250}
            />
          </div>
        </div>
        
        <div className="grid-item">
          <div className="widget">
            <div className="widget-header">
              <h3>Monthly Sales</h3>
            </div>
            <Chart
              type="bar"
              data={mockData.monthlySales}
              dataKey="sales"
              xAxisKey="month"
              height={250}
              color="#10b981"
            />
          </div>
        </div>
        
        <div className="grid-item">
          <RecentActivity activities={mockData.recentActivities} />
        </div>
        
        <div className="grid-item">
          <TopItems 
            items={mockData.topProducts} 
            title="Top Products" 
            type="products" 
          />
        </div>
        
        <div className="grid-item">
          <TopItems 
            items={mockData.topCustomers} 
            title="Top Customers" 
            type="users" 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;