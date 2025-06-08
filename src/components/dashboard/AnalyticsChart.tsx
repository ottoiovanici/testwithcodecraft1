import React, { useState } from 'react';
import Chart from './Chart';
import { ChartData } from '../../types';

interface AnalyticsChartProps {
  data: ChartData[];
  title: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, title }) => {
  const [timePeriod, setTimePeriod] = useState('30d');

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
  ];

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{title}</h3>
        <div className="time-period-selector">
          {periods.map((period) => (
            <button
              key={period.value}
              className={`period-btn ${timePeriod === period.value ? 'active' : ''}`}
              onClick={() => setTimePeriod(period.value)}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="chart-container">
        <Chart
          type="area"
          data={data}
          dataKey="value"
          xAxisKey="name"
          height={350}
          color="#6366f1"
        />
      </div>
    </div>
  );
};

export default AnalyticsChart;