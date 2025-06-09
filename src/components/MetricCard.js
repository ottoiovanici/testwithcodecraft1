import React from 'react';
import Card from './Card';
import '../styles/MetricCard.css';

const MetricCard = ({ title, value, change, icon }) => {
  const isPositive = change > 0;
  const changeColor = isPositive ? 'positive' : 'negative';
  const changeSymbol = isPositive ? '+' : '';

  return (
    <Card className="metric-card">
      <div className="metric-content">
        <div className="metric-header">
          <span className="metric-icon">{icon}</span>
          <span className="metric-title">{title}</span>
        </div>
        <div className="metric-value">{value}</div>
        <div className={`metric-change ${changeColor}`}>
          <span className="change-arrow">
            {isPositive ? '↗' : '↘'}
          </span>
          <span className="change-value">
            {changeSymbol}{Math.abs(change)}%
          </span>
          <span className="change-text">vs last period</span>
        </div>
      </div>
    </Card>
  );
};

export default MetricCard;