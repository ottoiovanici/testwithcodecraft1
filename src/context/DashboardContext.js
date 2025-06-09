import React, { createContext, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_PERIOD: 'SET_PERIOD',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_METRIC: 'UPDATE_METRIC',
  SET_THEME: 'SET_THEME',
};

// Initial state
const initialState = {
  data: null,
  loading: false,
  error: null,
  selectedPeriod: 'month',
  theme: 'light',
  lastUpdated: null,
};

// Reducer
const dashboardReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: action.payload ? null : state.error, // Clear error when starting to load
      };

    case actionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.SET_PERIOD:
      return {
        ...state,
        selectedPeriod: action.payload,
      };

    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case actionTypes.UPDATE_METRIC:
      if (!state.data?.metrics) return state;
      
      return {
        ...state,
        data: {
          ...state.data,
          metrics: {
            ...state.data.metrics,
            [action.payload.key]: action.payload.value,
          },
        },
        lastUpdated: new Date().toISOString(),
      };

    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
};

// Create contexts
const DashboardStateContext = createContext(undefined);
const DashboardDispatchContext = createContext(undefined);

// Provider component
export const DashboardProvider = ({ children, initialData = null }) => {
  const [state, dispatch] = useReducer(dashboardReducer, {
    ...initialState,
    data: initialData,
  });

  return (
    <DashboardStateContext.Provider value={state}>
      <DashboardDispatchContext.Provider value={dispatch}>
        {children}
      </DashboardDispatchContext.Provider>
    </DashboardStateContext.Provider>
  );
};

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialData: PropTypes.object,
};

// Custom hooks for using context
export const useDashboardState = () => {
  const context = useContext(DashboardStateContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a DashboardProvider');
  }
  return context;
};

export const useDashboardDispatch = () => {
  const context = useContext(DashboardDispatchContext);
  if (context === undefined) {
    throw new Error('useDashboardDispatch must be used within a DashboardProvider');
  }
  return context;
};

// Combined hook for both state and actions
export const useDashboard = () => {
  const state = useDashboardState();
  const dispatch = useDashboardDispatch();

  const actions = {
    setLoading: useCallback((loading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: loading });
    }, [dispatch]),

    setData: useCallback((data) => {
      dispatch({ type: actionTypes.SET_DATA, payload: data });
    }, [dispatch]),

    setError: useCallback((error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    }, [dispatch]),

    setPeriod: useCallback((period) => {
      dispatch({ type: actionTypes.SET_PERIOD, payload: period });
    }, [dispatch]),

    clearError: useCallback(() => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    }, [dispatch]),

    updateMetric: useCallback((key, value) => {
      dispatch({ 
        type: actionTypes.UPDATE_METRIC, 
        payload: { key, value } 
      });
    }, [dispatch]),

    setTheme: useCallback((theme) => {
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
      // Also update CSS custom property for theme
      document.documentElement.setAttribute('data-theme', theme);
    }, [dispatch]),
  };

  return {
    state,
    actions,
  };
};

// Selectors for derived state
export const useDashboardSelectors = () => {
  const state = useDashboardState();

  return {
    // Check if data is available
    hasData: Boolean(state.data),
    
    // Check if currently loading
    isLoading: state.loading,
    
    // Check if there's an error
    hasError: Boolean(state.error),
    
    // Get formatted last updated time
    lastUpdatedFormatted: state.lastUpdated 
      ? new Date(state.lastUpdated).toLocaleString()
      : null,
    
    // Check if data is stale (older than 5 minutes)
    isDataStale: state.lastUpdated 
      ? (Date.now() - new Date(state.lastUpdated).getTime()) > 5 * 60 * 1000
      : true,
    
    // Get metrics safely
    metrics: state.data?.metrics || {},
    
    // Get charts data safely
    charts: state.data?.charts || {},
    
    // Get stats safely
    stats: state.data?.stats || [],
    
    // Get recent transactions safely
    recentTransactions: state.data?.recentTransactions || [],
  };
};

// Higher-order component for providing dashboard context
export const withDashboard = (Component) => {
  const WrappedComponent = (props) => (
    <DashboardProvider>
      <Component {...props} />
    </DashboardProvider>
  );
  
  WrappedComponent.displayName = `withDashboard(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default DashboardProvider;