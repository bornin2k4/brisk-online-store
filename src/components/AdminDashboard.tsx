
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Grid2x2, List, FileText, User } from "lucide-react";

const AdminDashboard = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  const handleAddProduct = () => {
    // In a real app, this would save to database
    console.log("Adding product:", newProduct);
    alert("Product management requires database integration. Please connect to Supabase first!");
    setNewProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: ""
    });
  };

  const mockOrders = [
    { id: "ORD-001", customer: "John Doe", total: 299.99, status: "pending", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", total: 149.99, status: "shipped", date: "2024-01-14" },
    { id: "ORD-003", customer: "Bob Johnson", total: 79.99, status: "delivered", date: "2024-01-13" }
  ];

  const mockStats = {
    totalOrders: 156,
    totalRevenue: 15670.50,
    totalProducts: 24,
    totalCustomers: 89
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your store products and orders</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Settings className="h-4 w-4 mr-2" />
          Admin Access
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Grid2x2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+3 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Product Management</TabsTrigger>
          <TabsTrigger value="orders">Order Management</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>
                Create a new product listing for your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <Button onClick={handleAddProduct} className="w-full">
                Add Product
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Manage and track customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold">${order.total}</p>
                      <Badge 
                        variant={
                          order.status === "delivered" ? "default" :
                          order.status === "shipped" ? "secondary" : "outline"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
