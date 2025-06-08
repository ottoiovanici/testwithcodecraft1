import React from 'react';
import { FiUser, FiShoppingBag, FiDollarSign, FiUserPlus } from 'react-icons/fi';
import { Activity } from '../../types';

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <FiUserPlus className="activity-icon user" />;
      case 'purchase':
        return <FiShoppingBag className="activity-icon purchase" />;
      case 'payment':
        return <FiDollarSign className="activity-icon payment" />;
      default:
        return <FiUser className="activity-icon default" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Recent Activity</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="activity-list">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            {getActivityIcon(activity.type)}
            <div className="activity-content">
              <p className="activity-description">{activity.description}</p>
              <span className="activity-time">{formatTime(activity.timestamp)}</span>
            </div>
            {activity.amount && (
              <div className="activity-amount">
                ${activity.amount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;