
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, Plus, User } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const ShoppingCartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  cartTotal,
  onRemoveItem,
  onUpdateQuantity
}: ShoppingCartSidebarProps) => {
  const handleCheckout = () => {
    // In a real app, this would integrate with payment processing
    alert("Checkout functionality requires authentication and payment integration. Please connect to Supabase first!");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart
            <Badge variant="secondary" className="ml-2">
              {cartItems.length} items
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-blue-600 font-semibold">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              
              <Separator />
              
              <Button 
                onClick={handleCheckout} 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <User className="h-4 w-4 mr-2" />
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Secure checkout with authentication required
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSidebar;
