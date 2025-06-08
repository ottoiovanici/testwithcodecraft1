import React from 'react';
import { TopItem } from '../../types';

interface TopItemsProps {
  items: TopItem[];
  title: string;
  type: 'products' | 'users';
}

const TopItems: React.FC<TopItemsProps> = ({ items, title, type }) => {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{title}</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="top-items-list">
        {items.map((item, index) => (
          <div key={item.id} className="top-item">
            <div className="rank">#{index + 1}</div>
            
            <div className="item-avatar">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="avatar-placeholder">
                  {item.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            <div className="item-info">
              <h4 className="item-name">{item.name}</h4>
              <p className="item-detail">
                {type === 'products' ? `${item.sales} sales` : `${item.orders} orders`}
              </p>
            </div>
            
            <div className="item-value">
              ${item.revenue.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopItems;