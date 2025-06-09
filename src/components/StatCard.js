import React from 'react';
import Card from './Card';
import '../styles/StatCard.css';

const StatCard = ({ title, value, icon, color = 'blue' }) => {
  return (
    <Card className={`stat-card stat-card-${color}`}>
      <div className="stat-content">
        <div className="stat-icon-container">
          <span className="stat-icon">{icon}</span>
        </div>
        <div className="stat-details">
          <div className="stat-value">{value}</div>
          <div className="stat-title">{title}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;