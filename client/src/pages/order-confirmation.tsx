import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Order } from "@shared/schema";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingState() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: ["/api/orders", orderId],
  });

  if (isLoading) return <LoadingState />;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">
          Thank you for your order. We'll email you the confirmation details.
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="font-semibold mb-4">Order Details</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>Order #{order.id}</p>
          <p>Name: {order.customerName}</p>
          <p>Email: {order.email}</p>
          <p>Address: {order.address}</p>
          <p>Total: ${(order.total / 100).toFixed(2)}</p>
        </div>
      </div>

      <Link href="/">
        <Button>Browse More Recipes</Button>
      </Link>
    </div>
  );
}
