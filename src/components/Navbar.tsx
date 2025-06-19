
import { ShoppingCart, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NavbarProps {
  cartItemCount: number;
  onCartClick: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navbar = ({ cartItemCount, onCartClick, currentView, onViewChange }: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-blue-600">
              ShopPro
            </div>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => onViewChange("shop")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "shop" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => onViewChange("admin")}
                className={`text-sm font-medium transition-colors ${
                  currentView === "admin" 
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1" 
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                Admin Dashboard
              </button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Account</span>
            </Button>

            {/* Cart Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
