import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IndianRupee, Clock, MapPin, Package, CheckCircle2, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";

interface Order {
  recipeId: string;
  servings: number;
  customized: boolean;
  totalPrice: number;
  deliveryAddress: string;
  paymentMethod: string;
  orderDate: string;
  orderId: string;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
}

const recipeNames: Record<string, string> = {
  "1": "Butter Chicken",
  "2": "Masala Dosa",
  "3": "Paneer Tikka",
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-purple-100 text-purple-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
};

const statusIcons: Record<string, any> = {
  pending: Clock,
  confirmed: Package,
  preparing: ChefHat,
  ready: CheckCircle2,
  delivered: CheckCircle2,
};

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Nav />
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-orange-900">My Orders</h1>
            <Button
              onClick={() => setLocation("/menu")}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              Order More
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
                <CardHeader>
                  <CardTitle className="text-orange-900">Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <motion.div
                          key={order.orderId}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          className="cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Card className="border-orange-100 hover:border-orange-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold text-orange-900">
                                    {recipeNames[order.recipeId]}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    Order ID: {order.orderId}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {formatDate(order.orderDate)}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-orange-600 flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4" />
                                    {order.totalPrice}
                                  </span>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                                  >
                                    {getStatusText(order.status)}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Order Details */}
            <div className="lg:col-span-1">
              <AnimatePresence>
                {selectedOrder ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
                      <CardHeader>
                        <CardTitle className="text-orange-900">Order Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-orange-900 mb-2">Order Status</h4>
                            <div className="flex items-center gap-2">
                              {React.createElement(statusIcons[selectedOrder.status], {
                                className: "w-5 h-5",
                              })}
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[selectedOrder.status]}`}>
                                {getStatusText(selectedOrder.status)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-orange-900 mb-2">Order Summary</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                {recipeNames[selectedOrder.recipeId]}
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedOrder.servings} servings
                              </p>
                              <p className="text-sm text-gray-600">
                                {selectedOrder.customized ? "Customized" : "Standard"} order
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-orange-900 mb-2">Delivery Address</h4>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                              <p className="text-sm text-gray-600">{selectedOrder.deliveryAddress}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold text-orange-900 mb-2">Payment Details</h4>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">
                                Method: {selectedOrder.paymentMethod === "card" ? "Credit Card" : "Cash"}
                              </p>
                              <p className="text-sm text-gray-600">
                                Amount: ₹{selectedOrder.totalPrice}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-600">Select an order to view details</p>
                    </CardContent>
                  </Card>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 