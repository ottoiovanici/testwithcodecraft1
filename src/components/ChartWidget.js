import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import Card from './Card';
import '../styles/ChartWidget.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartWidget = ({ title, type, data, height = 300 }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: type !== 'pie' && type !== 'doughnut' ? {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    } : {},
  };

  const areaOptions = {
    ...chartOptions,
    fill: true,
    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />;
      case 'area':
        return <Line data={data} options={areaOptions} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <Card title={title} className="chart-widget">
      <div className="chart-container" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </Card>
  );
};

export default ChartWidget;