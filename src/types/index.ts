export interface DashboardData {
  totalUsers: number;
  userGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  orderGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
}

export interface Activity {
  id: string;
  type: 'user_signup' | 'purchase' | 'payment' | 'other';
  description: string;
  timestamp: string;
  amount?: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TopItem {
  id: string;
  name: string;
  revenue: number;
  sales: number;
  orders: number;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  status: 'active' | 'inactive';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  sales: number;
}

export interface Order {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}