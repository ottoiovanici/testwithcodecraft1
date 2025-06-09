import { useEffect, useCallback, useRef } from 'react';
import { useDashboard, useDashboardSelectors } from '../context/DashboardContext';
import { fetchDashboardData } from '../utils/dataUtils';
import { validateDashboardData } from '../utils/validation';

export const useDashboardData = (options = {}) => {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    retryAttempts = 3,
    retryDelay = 1000,
  } = options;

  const { state, actions } = useDashboard();
  const selectors = useDashboardSelectors();
  const retryCountRef = useRef(0);
  const refreshTimeoutRef = useRef(null);

  const loadData = useCallback(async (period = state.selectedPeriod, isRetry = false) => {
    try {
      if (!isRetry) {
        actions.setLoading(true);
        actions.clearError();
        retryCountRef.current = 0;
      }

      const dashboardData = await fetchDashboardData(period);
      
      // Validate data before setting it
      const validatedData = validateDashboardData(dashboardData);
      actions.setData(validatedData);
      
      retryCountRef.current = 0; // Reset retry count on success
      
    } catch (error) {
      console.error('Dashboard data loading error:', error);
      
      // Implement retry logic
      if (retryCountRef.current < retryAttempts) {
        retryCountRef.current += 1;
        
        setTimeout(() => {
          loadData(period, true);
        }, retryDelay * retryCountRef.current); // Exponential backoff
        
      } else {
        const errorMessage = error.message || 'Failed to load dashboard data';
        actions.setError(errorMessage);
        retryCountRef.current = 0;
      }
    }
  }, [state.selectedPeriod, actions, retryAttempts, retryDelay]);

  const refresh = useCallback(() => {
    loadData(state.selectedPeriod);
  }, [loadData, state.selectedPeriod]);

  const changePeriod = useCallback((newPeriod) => {
    actions.setPeriod(newPeriod);
    loadData(newPeriod);
  }, [actions, loadData]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh && selectors.hasData && !state.loading) {
      refreshTimeoutRef.current = setTimeout(() => {
        refresh();
      }, refreshInterval);
    }

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, selectors.hasData, state.loading, refresh]);

  // Load initial data
  useEffect(() => {
    if (!selectors.hasData && !state.loading && !state.error) {
      loadData();
    }
  }, [loadData, selectors.hasData, state.loading, state.error]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    data: state.data,
    loading: state.loading,
    error: state.error,
    selectedPeriod: state.selectedPeriod,
    
    // Selectors
    ...selectors,
    
    // Actions
    refresh,
    changePeriod,
    clearError: actions.clearError,
    
    // Additional utilities
    retryCount: retryCountRef.current,
    canRetry: retryCountRef.current < retryAttempts,
  };
};

// Hook for real-time updates (WebSocket or polling)
export const useRealTimeUpdates = (enabled = false) => {
  const { actions } = useDashboard();

  useEffect(() => {
    if (!enabled) return;

    // This would connect to a WebSocket or set up polling
    // For now, we'll simulate with a polling mechanism
    const interval = setInterval(() => {
      // In a real implementation, this would receive updates from a WebSocket
      // and update specific metrics without full refresh
      console.log('Checking for real-time updates...');
    }, 5000);

    return () => clearInterval(interval);
  }, [enabled, actions]);
};

// Hook for caching and offline support
export const useDashboardCache = () => {
  const { state, actions } = useDashboard();

  const saveToCache = useCallback((data) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        period: state.selectedPeriod,
      };
      localStorage.setItem('dashboard_cache', JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to save dashboard data to cache:', error);
    }
  }, [state.selectedPeriod]);

  const loadFromCache = useCallback(() => {
    try {
      const cached = localStorage.getItem('dashboard_cache');
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const isStale = Date.now() - cacheData.timestamp > 10 * 60 * 1000; // 10 minutes

      if (isStale) {
        localStorage.removeItem('dashboard_cache');
        return null;
      }

      return cacheData;
    } catch (error) {
      console.warn('Failed to load dashboard data from cache:', error);
      localStorage.removeItem('dashboard_cache');
      return null;
    }
  }, []);

  // Save to cache when data changes
  useEffect(() => {
    if (state.data) {
      saveToCache(state.data);
    }
  }, [state.data, saveToCache]);

  return {
    loadFromCache,
    clearCache: () => localStorage.removeItem('dashboard_cache'),
  };
};

export default useDashboardData;