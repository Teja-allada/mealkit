import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "wouter";

interface CartItem {
  id: string;
  name: string;
  price: number;
  servings: number;
  selectedIngredients: boolean[];
}

interface CartProps {
  items: CartItem[];
  onUpdateItem: (id: string, updates: Partial<CartItem>) => void;
  onRemoveItem: (id: string) => void;
}

export function Cart({ items, onUpdateItem, onRemoveItem }: CartProps) {
  const [, setLocation] = useLocation();

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const selectedCount = item.selectedIngredients.filter(Boolean).length;
      const totalIngredients = item.selectedIngredients.length;
      const pricePerIngredient = item.price / totalIngredients;
      const adjustedPrice = item.price - (selectedCount * pricePerIngredient);
      return total + (adjustedPrice * item.servings);
    }, 0);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    setLocation("/checkout");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.selectedIngredients.filter(Boolean).length} ingredients selected
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <Label htmlFor={`servings-${item.id}`}>Servings:</Label>
                  <Input
                    id={`servings-${item.id}`}
                    type="number"
                    min="1"
                    value={item.servings}
                    onChange={(e) => onUpdateItem(item.id, { servings: parseInt(e.target.value) || 1 })}
                    className="w-20"
                  />
                </div>
                <div className="mt-2">
                  <span className="text-orange-600 font-semibold">
                    ₹{(item.price * item.servings).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Subtotal:</span>
            <span className="text-orange-600 font-bold">₹{calculateSubtotal().toFixed(2)}</span>
          </div>
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 