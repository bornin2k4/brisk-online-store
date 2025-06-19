
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199.99,
    category: "electronics",
    description: "Premium wireless headphones with noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    category: "electronics",
    description: "Advanced fitness tracking and notifications",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.3,
    inStock: true
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 29.99,
    category: "clothing",
    description: "Comfortable 100% cotton t-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 149.99,
    category: "home",
    description: "Programmable coffee maker with thermal carafe",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    rating: 4.2,
    inStock: false
  },
  {
    id: 5,
    name: "JavaScript Guide",
    price: 39.99,
    category: "books",
    description: "Complete guide to modern JavaScript development",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    rating: 4.8,
    inStock: true
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 79.99,
    category: "electronics",
    description: "Portable speaker with excellent sound quality",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
    rating: 4.4,
    inStock: true
  }
];

interface ProductGridProps {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  onAddToCart: (product: any) => void;
}

const ProductGrid = ({ searchTerm, selectedCategory, sortBy, onAddToCart }: ProductGridProps) => {
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-sm ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredAndSortedProducts.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!product.inStock && (
                <Badge variant="secondary" className="absolute top-2 right-2">
                  Out of Stock
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-3">
              {product.description}
            </CardDescription>
            {renderStars(product.rating)}
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              ${product.price}
            </div>
            <Button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}

      {filteredAndSortedProducts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
