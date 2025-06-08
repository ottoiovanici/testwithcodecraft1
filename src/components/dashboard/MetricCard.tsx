import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'blue' 
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <div className="metric-icon">
          {icon}
        </div>
        <h3 className="metric-title">{title}</h3>
      </div>
      
      <div className="metric-value">
        {value}
      </div>
      
      {change !== undefined && (
        <div className={`metric-change ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
          {isPositive && <FiTrendingUp size={16} />}
          {isNegative && <FiTrendingDown size={16} />}
          <span>{Math.abs(change)}% from last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;