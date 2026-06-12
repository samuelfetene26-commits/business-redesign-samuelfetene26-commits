import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';
import { mockRestaurants } from '@/lib/mockData';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, getItemCount } = useCartStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const restaurant = mockRestaurants.find(r => r.id === id);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }
  
  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));
  const filteredMenu = selectedCategory
    ? restaurant.menu.filter(item => item.category === selectedCategory)
    : restaurant.menu;
  
  const handleAddToCart = (item: typeof restaurant.menu[0]) => {
    const quantity = quantities[item.id] || 1;
    addItem(
      {
        id: item.id,
        restaurantId: restaurant.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
      quantity
    );
    setQuantities({ ...quantities, [item.id]: 0 });
    toast.success(`${item.name} added to cart!`);
  };
  
  const handleQuantityChange = (itemId: string, delta: number) => {
    const current = quantities[itemId] || 0;
    const newQuantity = Math.max(0, current + delta);
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };
  
  const cartCount = getItemCount();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-gray-900">{restaurant.name}</h1>
          </div>
          
          <Button
            onClick={() => navigate('/cart')}
            className="relative bg-orange-600 hover:bg-orange-700 text-white"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </header>
      
      {/* Restaurant Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-4">{restaurant.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{restaurant.rating}</span>
                    <span className="text-gray-600">({restaurant.menu.length} items)</span>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold">Delivery:</span> {restaurant.deliveryTime} min • ${restaurant.deliveryFee}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Min Order:</span> ${restaurant.minOrder}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-orange-900">
                  <span className="font-semibold">Status:</span> {restaurant.isOpen ? '🟢 Open' : '🔴 Closed'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Menu Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Items
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40 overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    {item.rating}
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{item.reviews} reviews</span>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-center font-semibold w-8">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="p-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(item)}
                    disabled={(quantities[item.id] || 0) === 0}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
