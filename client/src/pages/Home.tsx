import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { mockRestaurants } from '@/lib/mockData';
import { Star, MapPin, Clock, LogOut, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export default function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  
  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCuisine = !selectedCuisine || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  
  const cartCount = getItemCount();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <h1 className="text-2xl font-bold text-orange-600">ADDIS-EAT</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
                <Button
                  onClick={() => navigate('/cart')}
                  variant="outline"
                  className="relative"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Discover Your Next Favorite Meal</h2>
          <p className="text-lg opacity-90 mb-8">Order from the best Ethiopian restaurants in your area</p>
          
          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl">
            <Input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-white text-orange-600 hover:bg-gray-100 font-semibold">
              Search
            </Button>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-6 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedCuisine(null)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCuisine === null
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {['Ethiopian'].map(cuisine => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  selectedCuisine === cuisine
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Restaurants Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Featured Restaurants</h3>
          
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No restaurants found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <Card
                  key={restaurant.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  {/* Restaurant Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {!restaurant.isOpen && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Closed</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Restaurant Info */}
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{restaurant.description}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{restaurant.deliveryTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>${restaurant.deliveryFee}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap mb-4">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-semibold">
                        {restaurant.cuisine}
                      </span>
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-semibold">
                        Min ${restaurant.minOrder}
                      </span>
                    </div>
                    
                    <Button
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold"
                      disabled={!restaurant.isOpen}
                    >
                      {restaurant.isOpen ? 'Order Now' : 'Closed'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
