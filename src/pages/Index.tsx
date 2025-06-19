
import { useState } from "react";
import { ShoppingCart, Search, Grid2x2, List, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductGrid from "@/components/ProductGrid";
import ShoppingCartSidebar from "@/components/ShoppingCartSidebar";
import AdminDashboard from "@/components/AdminDashboard";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState("shop");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === "shop" && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Premium Products
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Discover our curated collection of exceptional items
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onAddToCart={addToCart}
            />
          </div>
        )}

        {currentView === "admin" && (
          <AdminDashboard />
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
};

export default Index;
