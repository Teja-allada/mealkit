import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { IndianRupee, CheckCircle2, Clock, MapPin, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";

interface OrderDetails {
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

export default function Checkout() {
  const [, setLocation] = useLocation();
  const params = useParams<{ id: string }>();
  const recipeId = params?.id || "";
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [formData, setFormData] = useState({
    address: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Mock function to generate order ID
  const generateOrderId = () => {
    return `ORD${Date.now().toString().slice(-6)}`;
  };

  // Mock function to calculate total price
  const calculateTotalPrice = () => {
    // In a real app, this would come from the cart/recipe context
    return 399; // Example price
  };

  const handlePlaceOrder = async () => {
    // Create order details
    const newOrder: OrderDetails = {
      recipeId,
      servings: 4, // This should come from the recipe page
      customized: false, // This should come from the recipe page
      totalPrice: calculateTotalPrice(),
      deliveryAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString(),
      orderId: generateOrderId(),
      status: "pending",
    };

    // In a real app, this would be an API call
    // For now, we'll simulate an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save order to localStorage (in a real app, this would be saved to a database)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    setOrderDetails(newOrder);
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Nav />
      <div className="py-12">
        <div className="max-w-2xl mx-auto px-4">
          <AnimatePresence>
            {!orderPlaced ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-orange-100">
                  <CardHeader>
                    <CardTitle className="text-orange-900">Checkout</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Delivery Address */}
                      <div>
                        <Label className="text-orange-700">Delivery Address</Label>
                        <div className="mt-2 relative">
                          <MapPin className="absolute left-3 top-3 text-gray-400" />
                          <Input
                            placeholder="Enter your delivery address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="pl-10 border-orange-200"
                          />
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <Label className="text-orange-700">Payment Method</Label>
                        <div className="mt-2 space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="card"
                              checked={formData.paymentMethod === "card"}
                              onCheckedChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                              className="border-orange-200 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                            />
                            <label htmlFor="card" className="text-sm text-gray-700">
                              Credit Card
                            </label>
                          </div>
                          {formData.paymentMethod === "card" && (
                            <div className="space-y-4 pl-6">
                              <div className="relative">
                                <CreditCard className="absolute left-3 top-3 text-gray-400" />
                                <Input
                                  placeholder="Card Number"
                                  value={formData.cardNumber}
                                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                  className="pl-10 border-orange-200"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <Input
                                  placeholder="MM/YY"
                                  value={formData.expiryDate}
                                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                                  className="border-orange-200"
                                />
                                <Input
                                  placeholder="CVV"
                                  value={formData.cvv}
                                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                  className="border-orange-200"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="pt-4 border-t border-orange-100">
                        <h3 className="text-lg font-semibold text-orange-900 mb-4">Order Summary</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-medium">₹{calculateTotalPrice()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee:</span>
                            <span className="font-medium">₹50</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-orange-100">
                            <span className="text-lg font-semibold text-orange-900">Total:</span>
                            <span className="text-2xl font-bold text-orange-600 flex items-center gap-1">
                              <IndianRupee className="w-5 h-5" />
                              {calculateTotalPrice() + 50}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Place Order Button */}
                      <Button
                        onClick={handlePlaceOrder}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="mb-6"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                </motion.div>
                <h2 className="text-2xl font-bold text-orange-900 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. Your order ID is:{" "}
                  <span className="font-semibold text-orange-600">{orderDetails?.orderId}</span>
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={() => setLocation("/dashboard")}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  >
                    View Order Status
                  </Button>
                  <Button
                    onClick={() => setLocation("/menu")}
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
