import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockOrders } from '@/lib/mockData';
import { ArrowLeft, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  confirmed: { icon: CheckCircle, label: 'Confirmed', color: 'text-blue-600', bg: 'bg-blue-50' },
  preparing: { icon: Clock, label: 'Preparing', color: 'text-orange-600', bg: 'bg-orange-50' },
  ready: { icon: CheckCircle, label: 'Ready', color: 'text-green-600', bg: 'bg-green-50' },
  out_for_delivery: { icon: Truck, label: 'Out for Delivery', color: 'text-purple-600', bg: 'bg-purple-50' },
  delivered: { icon: CheckCircle, label: 'Delivered', color: 'text-green-600', bg: 'bg-green-50' },
};

export default function Orders() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        {mockOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You haven't placed any orders yet</p>
            <Button
              onClick={() => navigate('/')}
              className="mt-4 bg-orange-600 hover:bg-orange-700 text-white"
            >
              Start Ordering
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map(order => {
              const config = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = config.icon;
              
              return (
                <Card key={order.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Order Info */}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order ID</p>
                      <p className="font-mono text-sm font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600 mt-3 mb-1">Restaurant</p>
                      <p className="font-semibold text-gray-900">{order.restaurantName}</p>
                    </div>
                    
                    {/* Items */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Items</p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-900">
                            {item.quantity}x {item.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Status</p>
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${config.bg}`}>
                        <StatusIcon className={`w-4 h-4 ${config.color}`} />
                        <span className={`text-sm font-semibold ${config.color}`}>
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-2">
                        Estimated: {new Date(order.estimatedDelivery).toLocaleTimeString()}
                      </p>
                    </div>
                    
                    {/* Total & Action */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total</p>
                        <p className="text-2xl font-bold text-orange-600">${order.total.toFixed(2)}</p>
                      </div>
                      <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="w-full"
                      >
                        Order Again
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
