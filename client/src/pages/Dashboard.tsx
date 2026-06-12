import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { mockDashboardStats, mockOrders, mockRestaurants } from '@/lib/mockData';
import { LogOut, BarChart3, ShoppingBag, Users, TrendingUp, Star, Clock, Lock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import JWTTokenViewer from '@/components/JWTTokenViewer';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (user?.role !== 'restaurant') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">This page is only for restaurant owners</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const handleMenuUpdate = () => {
    toast.success('Menu updated successfully!');
  };
  
  const handleOrderStatusUpdate = () => {
    toast.success('Order status updated!');
  };
  
  const restaurant = mockRestaurants[0];
  const todayOrders = mockOrders.filter(o => o.restaurantId === restaurant.id);
  
  const COLORS = ['#FF6B35', '#00A8A8', '#FFD700', '#1A1A1A', '#F8F8F8'];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-orange-600">ADDIS-EAT Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.totalOrders}</p>
              </div>
              <ShoppingBag className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${mockDashboardStats.totalRevenue.toFixed(0)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-teal-600 opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.averageRating}</p>
              </div>
              <Star className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-gray-900">{mockDashboardStats.totalCustomers}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </Card>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Today Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Performance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Orders</span>
                    <span className="font-bold text-orange-600">{mockDashboardStats.todayOrders}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Revenue</span>
                    <span className="font-bold text-orange-600">${mockDashboardStats.todayRevenue.toFixed(2)}</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Restaurant Info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-700">Name</p>
                    <p className="font-semibold text-gray-900">{restaurant.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Status</p>
                    <p className="font-semibold text-green-600">🟢 Open</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Weekly Trend Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockDashboardStats.weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="orders" stroke="#FF6B35" strokeWidth={2} />
                  <Line type="monotone" dataKey="revenue" stroke="#00A8A8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h3>
                
                {todayOrders.length === 0 ? (
                  <p className="text-gray-600">No orders today</p>
                ) : (
                  <div className="space-y-4">
                    {todayOrders.map(order => (
                      <div key={order.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleTimeString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'out_for_delivery' ? 'bg-purple-100 text-purple-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="mb-3">
                          {order.items.map((item, idx) => (
                            <p key={idx} className="text-sm text-gray-700">
                              {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <span className="font-bold text-gray-900">Total: ${order.total.toFixed(2)}</span>
                          <Button
                            size="sm"
                            onClick={handleOrderStatusUpdate}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            Update Status
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Menu Items</h3>
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={handleMenuUpdate}
                  >
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {restaurant.menu.map(item => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          
                          <div className="flex items-center gap-4">
                            <span className="font-bold text-orange-600">${item.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-600">{item.category}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-semibold">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline" className="text-red-600">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Items */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Selling Items</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockDashboardStats.topItems}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#FF6B35" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              
              {/* Revenue Distribution */}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockDashboardStats.topItems}
                      dataKey="revenue"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {mockDashboardStats.topItems.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
            
            {/* Detailed Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Items Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-200">
                    <tr>
                      <th className="text-left py-2 px-4 font-semibold text-gray-900">Item Name</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-900">Orders</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-900">Revenue</th>
                      <th className="text-right py-2 px-4 font-semibold text-gray-900">Avg Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDashboardStats.topItems.map(item => (
                      <tr key={item.name} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 font-semibold">{item.name}</td>
                        <td className="py-3 px-4 text-right text-gray-700">{item.orders}</td>
                        <td className="py-3 px-4 text-right text-orange-600 font-semibold">${item.revenue.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right text-gray-700">${(item.revenue / item.orders).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          {/* Security Tab - JWT Token */}
          <TabsContent value="security" className="space-y-6">
            <JWTTokenViewer />
            
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Authentication Details
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                  <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Account Email:</span> {user?.email}</p>
                  <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">Account Name:</span> {user?.name}</p>
                  <p className="text-sm text-gray-700 mb-2"><span className="font-semibold">User ID:</span> <span className="font-mono text-xs">{user?.id}</span></p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Role:</span> <span className="capitalize font-semibold text-orange-600">{user?.role}</span></p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">JWT Token Features</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>✅ Secure token-based authentication</li>
                    <li>✅ 7-day expiration for security</li>
                    <li>✅ Encoded user information (email, role, ID)</li>
                    <li>✅ HMAC-SHA256 signature verification</li>
                    <li>✅ Persistent storage in secure cookies</li>
                    <li>✅ Automatic token refresh on login</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">How JWT Works</h4>
                  <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                    <li>User logs in with email and password</li>
                    <li>Server validates credentials and generates JWT token</li>
                    <li>Token is stored in secure cookie and Zustand store</li>
                    <li>Token is sent with every API request in Authorization header</li>
                    <li>Server verifies token signature and expiration</li>
                    <li>User is granted access if token is valid</li>
                  </ol>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Security tab content is added via edit below
