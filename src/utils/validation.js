/**
 * Validation utilities for data sanitization and validation
 */

export const isValidNumber = (value) => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const isValidString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const isValidArray = (value) => {
  return Array.isArray(value) && value.length > 0;
};

export const isValidObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export const sanitizeString = (value) => {
  if (!isValidString(value)) return '';
  return value.trim().replace(/[<>]/g, '');
};

export const sanitizeNumber = (value, fallback = 0) => {
  const num = Number(value);
  return isValidNumber(num) ? num : fallback;
};

export const validateMetricData = (data) => {
  if (!isValidObject(data)) {
    throw new Error('Metric data must be an object');
  }

  const errors = [];

  if (!isValidString(data.title)) {
    errors.push('Title is required and must be a non-empty string');
  }

  if (data.value === undefined || data.value === null) {
    errors.push('Value is required');
  }

  if (!isValidNumber(data.change)) {
    errors.push('Change must be a valid number');
  }

  if (errors.length > 0) {
    throw new Error(`Metric validation failed: ${errors.join(', ')}`);
  }

  return {
    title: sanitizeString(data.title),
    value: data.value,
    change: sanitizeNumber(data.change),
    icon: sanitizeString(data.icon) || '📊',
  };
};

export const validateChartData = (data) => {
  if (!isValidObject(data)) {
    throw new Error('Chart data must be an object');
  }

  if (!isValidArray(data.labels)) {
    throw new Error('Chart labels must be a non-empty array');
  }

  if (!isValidArray(data.datasets)) {
    throw new Error('Chart datasets must be a non-empty array');
  }

  data.datasets.forEach((dataset, index) => {
    if (!isValidObject(dataset)) {
      throw new Error(`Dataset ${index} must be an object`);
    }
    if (!isValidArray(dataset.data)) {
      throw new Error(`Dataset ${index} data must be a non-empty array`);
    }
  });

  return data;
};

export const validateTableData = (data, columns) => {
  if (!isValidArray(data)) {
    throw new Error('Table data must be a non-empty array');
  }

  if (!isValidArray(columns)) {
    throw new Error('Table columns must be a non-empty array');
  }

  columns.forEach((column, index) => {
    if (!isValidObject(column)) {
      throw new Error(`Column ${index} must be an object`);
    }
    if (!isValidString(column.key)) {
      throw new Error(`Column ${index} key must be a non-empty string`);
    }
    if (!isValidString(column.label)) {
      throw new Error(`Column ${index} label must be a non-empty string`);
    }
  });

  // Validate that each row has the required keys
  const requiredKeys = columns.map(col => col.key);
  data.forEach((row, index) => {
    if (!isValidObject(row)) {
      throw new Error(`Row ${index} must be an object`);
    }
    
    const missingKeys = requiredKeys.filter(key => !(key in row));
    if (missingKeys.length > 0) {
      console.warn(`Row ${index} is missing keys: ${missingKeys.join(', ')}`);
    }
  });

  return { data, columns };
};

export const validateDashboardData = (data) => {
  if (!isValidObject(data)) {
    throw new Error('Dashboard data must be an object');
  }

  const errors = [];

  // Validate metrics section
  if (!isValidObject(data.metrics)) {
    errors.push('Metrics section is required and must be an object');
  }

  // Validate charts section
  if (!isValidObject(data.charts)) {
    errors.push('Charts section is required and must be an object');
  }

  // Validate stats section
  if (!isValidArray(data.stats)) {
    errors.push('Stats section must be an array');
  }

  // Validate recent transactions
  if (!isValidArray(data.recentTransactions)) {
    errors.push('Recent transactions must be an array');
  }

  if (errors.length > 0) {
    throw new Error(`Dashboard validation failed: ${errors.join(', ')}`);
  }

  return data;
};

export const createSafeData = (data, type) => {
  try {
    switch (type) {
      case 'metric':
        return validateMetricData(data);
      case 'chart':
        return validateChartData(data);
      case 'dashboard':
        return validateDashboardData(data);
      default:
        return data;
    }
  } catch (error) {
    console.error(`Data validation failed for type ${type}:`, error);
    return null;
  }
};

// Utility to safely access nested object properties
export const safeGet = (obj, path, defaultValue = null) => {
  try {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  } catch {
    return defaultValue;
  }
};

// Format numbers safely
export const formatNumber = (value, options = {}) => {
  try {
    const {
      decimals = 0,
      prefix = '',
      suffix = '',
      fallback = '0'
    } = options;

    if (!isValidNumber(value)) {
      return fallback;
    }

    const formatted = value.toFixed(decimals);
    return `${prefix}${formatted}${suffix}`;
  } catch {
    return options.fallback || '0';
  }
};

// Format currency safely
export const formatCurrency = (value, currency = 'USD', fallback = '$0') => {
  try {
    if (!isValidNumber(value)) {
      return fallback;
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(value);
  } catch {
    return fallback;
  }
};