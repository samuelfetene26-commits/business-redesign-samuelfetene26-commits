export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  minOrder: number;
  cuisine: string;
  isOpen: boolean;
  menu: MenuItem[];
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  createdAt: string;
  estimatedDelivery: string;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest_1',
    name: 'Addis Red Sea',
    description: 'Authentic Ethiopian cuisine with traditional recipes',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    rating: 4.8,
    deliveryTime: 30,
    deliveryFee: 2.5,
    minOrder: 15,
    cuisine: 'Ethiopian',
    isOpen: true,
    menu: [
      {
        id: 'item_1',
        name: 'Doro Wot',
        description: 'Spiced chicken stew with hard-boiled eggs',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.9,
        reviews: 156,
      },
      {
        id: 'item_2',
        name: 'Misir Wot',
        description: 'Red lentil stew with Ethiopian spices',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.7,
        reviews: 98,
      },
      {
        id: 'item_3',
        name: 'Injera',
        description: 'Traditional Ethiopian flatbread',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Bread',
        rating: 4.8,
        reviews: 203,
      },
      {
        id: 'item_4',
        name: 'Tibs',
        description: 'Sautéed meat with vegetables',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.9,
        reviews: 142,
      },
    ],
  },
  {
    id: 'rest_2',
    name: 'Habesha Kitchen',
    description: 'Modern take on traditional Ethiopian flavors',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    rating: 4.6,
    deliveryTime: 40,
    deliveryFee: 3.0,
    minOrder: 20,
    cuisine: 'Ethiopian',
    isOpen: true,
    menu: [
      {
        id: 'item_5',
        name: 'Kitfo',
        description: 'Minced raw beef with spiced butter and cheese',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.8,
        reviews: 87,
      },
      {
        id: 'item_6',
        name: 'Gomen',
        description: 'Collard greens with garlic and ginger',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Vegetables',
        rating: 4.7,
        reviews: 64,
      },
      {
        id: 'item_7',
        name: 'Shiro',
        description: 'Chickpea flour stew with traditional spices',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.6,
        reviews: 72,
      },
    ],
  },
  {
    id: 'rest_3',
    name: 'Lion of Judah',
    description: 'Premium Ethiopian dining experience',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    rating: 4.9,
    deliveryTime: 35,
    deliveryFee: 2.0,
    minOrder: 25,
    cuisine: 'Ethiopian',
    isOpen: true,
    menu: [
      {
        id: 'item_8',
        name: 'Doro Tibs',
        description: 'Sautéed chicken with peppers and onions',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.9,
        reviews: 178,
      },
      {
        id: 'item_9',
        name: 'Lamb Wot',
        description: 'Tender lamb in rich spiced sauce',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Main Course',
        rating: 4.9,
        reviews: 134,
      },
      {
        id: 'item_10',
        name: 'Mixed Platter',
        description: 'Selection of 5 different Ethiopian dishes',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
        category: 'Combo',
        rating: 4.9,
        reviews: 256,
      },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order_1',
    restaurantId: 'rest_1',
    restaurantName: 'Addis Red Sea',
    items: [
      { name: 'Doro Wot', quantity: 2, price: 12.99 },
      { name: 'Injera', quantity: 1, price: 4.99 },
    ],
    total: 30.97,
    status: 'delivered',
    createdAt: '2026-06-10T14:30:00Z',
    estimatedDelivery: '2026-06-10T15:00:00Z',
  },
  {
    id: 'order_2',
    restaurantId: 'rest_2',
    restaurantName: 'Habesha Kitchen',
    items: [
      { name: 'Kitfo', quantity: 1, price: 15.99 },
      { name: 'Gomen', quantity: 1, price: 8.99 },
    ],
    total: 24.98,
    status: 'delivered',
    createdAt: '2026-06-09T18:00:00Z',
    estimatedDelivery: '2026-06-09T18:40:00Z',
  },
  {
    id: 'order_3',
    restaurantId: 'rest_3',
    restaurantName: 'Lion of Judah',
    items: [
      { name: 'Mixed Platter', quantity: 1, price: 24.99 },
    ],
    total: 24.99,
    status: 'out_for_delivery',
    createdAt: '2026-06-12T16:00:00Z',
    estimatedDelivery: '2026-06-12T16:35:00Z',
  },
];

export const mockDashboardStats = {
  totalOrders: 1247,
  totalRevenue: 18945.50,
  averageRating: 4.8,
  totalCustomers: 3421,
  todayOrders: 24,
  todayRevenue: 456.75,
  weeklyTrend: [
    { day: 'Mon', orders: 45, revenue: 675 },
    { day: 'Tue', orders: 52, revenue: 780 },
    { day: 'Wed', orders: 48, revenue: 720 },
    { day: 'Thu', orders: 61, revenue: 915 },
    { day: 'Fri', orders: 78, revenue: 1170 },
    { day: 'Sat', orders: 92, revenue: 1380 },
    { day: 'Sun', orders: 68, revenue: 1020 },
  ],
  topItems: [
    { name: 'Doro Wot', orders: 234, revenue: 3034.66 },
    { name: 'Mixed Platter', orders: 156, revenue: 3898.44 },
    { name: 'Kitfo', orders: 128, revenue: 2046.72 },
    { name: 'Lamb Wot', orders: 112, revenue: 1902.88 },
    { name: 'Tibs', orders: 98, revenue: 1469.02 },
  ],
};
