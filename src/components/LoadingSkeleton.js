import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LoadingSkeleton.css';

const SkeletonLine = ({ width = '100%', height = '16px' }) => (
  <div 
    className="skeleton-line" 
    style={{ width, height }}
    aria-hidden="true"
  />
);

const MetricCardSkeleton = () => (
  <div className="skeleton-metric-card" aria-label="Loading metric card">
    <div className="skeleton-metric-header">
      <div className="skeleton-icon" />
      <SkeletonLine width="60%" height="14px" />
    </div>
    <SkeletonLine width="80%" height="24px" />
    <div className="skeleton-metric-change">
      <div className="skeleton-arrow" />
      <SkeletonLine width="50%" height="12px" />
    </div>
  </div>
);

const ChartSkeleton = ({ height = 300 }) => (
  <div className="skeleton-chart" aria-label="Loading chart">
    <SkeletonLine width="40%" height="18px" />
    <div 
      className="skeleton-chart-area" 
      style={{ height: `${height}px` }}
    />
  </div>
);

const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="skeleton-table" aria-label="Loading table">
    <SkeletonLine width="40%" height="18px" />
    <div className="skeleton-table-content">
      <div className="skeleton-table-header">
        {Array.from({ length: columns }, (_, i) => (
          <SkeletonLine key={i} width="80%" height="16px" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {Array.from({ length: columns }, (_, colIndex) => (
            <SkeletonLine key={colIndex} width="70%" height="14px" />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const StatCardSkeleton = () => (
  <div className="skeleton-stat-card" aria-label="Loading stat card">
    <div className="skeleton-stat-icon" />
    <div className="skeleton-stat-content">
      <SkeletonLine width="60%" height="20px" />
      <SkeletonLine width="80%" height="14px" />
    </div>
  </div>
);

const DashboardSkeleton = () => (
  <div className="dashboard-skeleton" role="status" aria-label="Loading dashboard">
    <div className="skeleton-header">
      <SkeletonLine width="300px" height="32px" />
      <div className="skeleton-controls">
        <SkeletonLine width="120px" height="36px" />
        <SkeletonLine width="100px" height="36px" />
      </div>
    </div>
    
    <div className="skeleton-metrics-grid">
      {Array.from({ length: 4 }, (_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>
    
    <div className="skeleton-charts-grid">
      {Array.from({ length: 4 }, (_, i) => (
        <ChartSkeleton key={i} />
      ))}
    </div>
    
    <div className="skeleton-bottom-section">
      <div className="skeleton-stats-section">
        <SkeletonLine width="150px" height="24px" />
        <div className="skeleton-stats-grid">
          {Array.from({ length: 4 }, (_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>
      <TableSkeleton />
    </div>
  </div>
);

const LoadingSkeleton = ({ type, ...props }) => {
  switch (type) {
    case 'metric-card':
      return <MetricCardSkeleton {...props} />;
    case 'chart':
      return <ChartSkeleton {...props} />;
    case 'table':
      return <TableSkeleton {...props} />;
    case 'stat-card':
      return <StatCardSkeleton {...props} />;
    case 'dashboard':
      return <DashboardSkeleton {...props} />;
    default:
      return <SkeletonLine {...props} />;
  }
};

LoadingSkeleton.propTypes = {
  type: PropTypes.oneOf(['metric-card', 'chart', 'table', 'stat-card', 'dashboard', 'line']),
  width: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
  columns: PropTypes.number,
};

SkeletonLine.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default LoadingSkeleton;