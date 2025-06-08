import React from 'react';
import { FiUsers, FiDollarSign, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';
import MetricCard from './MetricCard';
import { DashboardData } from '../../types';

interface QuickStatsProps {
  data: DashboardData;
}

const QuickStats: React.FC<QuickStatsProps> = ({ data }) => {
  return (
    <div className="quick-stats">
      <MetricCard
        title="Total Users"
        value={data.totalUsers.toLocaleString()}
        change={data.userGrowth}
        icon={<FiUsers size={24} />}
        color="blue"
      />
      
      <MetricCard
        title="Revenue"
        value={`$${data.totalRevenue.toLocaleString()}`}
        change={data.revenueGrowth}
        icon={<FiDollarSign size={24} />}
        color="green"
      />
      
      <MetricCard
        title="Orders"
        value={data.totalOrders.toLocaleString()}
        change={data.orderGrowth}
        icon={<FiShoppingCart size={24} />}
        color="purple"
      />
      
      <MetricCard
        title="Conversion Rate"
        value={`${data.conversionRate}%`}
        change={data.conversionGrowth}
        icon={<FiTrendingUp size={24} />}
        color="orange"
      />
    </div>
  );
};

export default QuickStats;