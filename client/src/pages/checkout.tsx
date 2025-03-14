import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type Recipe, type InsertOrder, type Order } from "@shared/schema";
import { OrderForm } from "@/components/order-form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingState() {
  return (
    <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const recipeId = Number(params.id);

  const { data: recipe, isLoading } = useQuery<Recipe>({
    queryKey: ["/api/recipes", recipeId],
  });

  const orderMutation = useMutation({
    mutationFn: async (data: InsertOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json() as Promise<Order>;
    },
    onSuccess: (data) => {
      setLocation(`/order-confirmation/${data.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <LoadingState />;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-600 mb-8">
        Order {recipe.name} - ${(recipe.price / 100).toFixed(2)}
      </p>

      <OrderForm
        recipeId={recipeId}
        onSubmit={(data) => orderMutation.mutate(data)}
        isSubmitting={orderMutation.isPending}
      />
    </div>
  );
}
