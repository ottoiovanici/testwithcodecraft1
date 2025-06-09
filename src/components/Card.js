import React from 'react';
import '../styles/Card.css';

const Card = ({ children, className = '', title, padding = true }) => {
  return (
    <div className={`card ${className} ${padding ? 'card-padded' : ''}`}>
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;