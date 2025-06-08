import { DashboardData, Activity, ChartData, TopItem } from '../types';

export const mockData: {
  overview: DashboardData;
  trafficData: ChartData[];
  revenueByCategory: ChartData[];
  monthlySales: ChartData[];
  recentActivities: Activity[];
  topProducts: TopItem[];
  topCustomers: TopItem[];
} = {
  overview: {
    totalUsers: 15847,
    userGrowth: 12.5,
    totalRevenue: 89342,
    revenueGrowth: 8.2,
    totalOrders: 2134,
    orderGrowth: -2.1,
    conversionRate: 3.2,
    conversionGrowth: 0.8,
  },
  
  trafficData: [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
    { name: 'Aug', value: 6500 },
    { name: 'Sep', value: 8000 },
    { name: 'Oct', value: 7500 },
    { name: 'Nov', value: 9000 },
    { name: 'Dec', value: 8500 },
  ],
  
  revenueByCategory: [
    { name: 'Electronics', value: 35000 },
    { name: 'Clothing', value: 25000 },
    { name: 'Books', value: 15000 },
    { name: 'Home & Garden', value: 10000 },
    { name: 'Sports', value: 4342 },
  ],
  
  monthlySales: [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 30000 },
  ],
  
  recentActivities: [
    {
      id: '1',
      type: 'user_signup',
      description: 'New user Sarah Johnson signed up',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    },
    {
      id: '2',
      type: 'purchase',
      description: 'Order #1234 completed by Mike Chen',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      amount: 299.99,
    },
    {
      id: '3',
      type: 'payment',
      description: 'Payment received from Emma Wilson',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      amount: 149.50,
    },
    {
      id: '4',
      type: 'user_signup',
      description: 'New user David Brown signed up',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
    },
    {
      id: '5',
      type: 'purchase',
      description: 'Order #1235 completed by Lisa Garcia',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      amount: 89.99,
    },
  ],
  
  topProducts: [
    {
      id: '1',
      name: 'iPhone 14 Pro',
      revenue: 45000,
      sales: 150,
      orders: 150,
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      revenue: 38000,
      sales: 38,
      orders: 38,
    },
    {
      id: '3',
      name: 'AirPods Pro',
      revenue: 22000,
      sales: 110,
      orders: 110,
    },
    {
      id: '4',
      name: 'iPad Air',
      revenue: 18000,
      sales: 30,
      orders: 30,
    },
    {
      id: '5',
      name: 'Apple Watch Series 8',
      revenue: 15000,
      sales: 45,
      orders: 45,
    },
  ],
  
  topCustomers: [
    {
      id: '1',
      name: 'John Smith',
      revenue: 2850,
      sales: 0,
      orders: 12,
    },
    {
      id: '2',
      name: 'Emily Davis',
      revenue: 2340,
      sales: 0,
      orders: 9,
    },
    {
      id: '3',
      name: 'Michael Johnson',
      revenue: 1990,
      sales: 0,
      orders: 8,
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      revenue: 1750,
      sales: 0,
      orders: 7,
    },
    {
      id: '5',
      name: 'Robert Brown',
      revenue: 1420,
      sales: 0,
      orders: 6,
    },
  ],
};