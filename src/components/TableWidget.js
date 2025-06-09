import React from 'react';
import Card from './Card';
import '../styles/TableWidget.css';

const TableWidget = ({ title, data, columns }) => {
  if (!data || data.length === 0) {
    return (
      <Card title={title} className="table-widget">
        <div className="empty-state">
          <p>No data available</p>
        </div>
      </Card>
    );
  }

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'status-success';
      case 'pending':
      case 'processing':
        return 'status-warning';
      case 'failed':
      case 'error':
        return 'status-error';
      default:
        return 'status-default';
    }
  };

  const formatCellValue = (value, key) => {
    if (key === 'amount' && typeof value === 'string' && value.startsWith('$')) {
      return <span className="amount-value">{value}</span>;
    }
    if (key === 'status') {
      return <span className={`status-badge ${getStatusClass(value)}`}>{value}</span>;
    }
    return value;
  };

  return (
    <Card title={title} className="table-widget">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="table-header">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="table-row">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {formatCellValue(row[column.key], column.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TableWidget;