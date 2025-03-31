import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import LandingPage from "@/pages/landing";
import Home from "@/pages/home";
import Recipe from "@/pages/recipe";
import Checkout from "@/pages/checkout";
import OrderConfirmation from "@/pages/order-confirmation";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/menu" component={Home} />
      <Route path="/recipe/:id" component={Recipe} />
      <Route path="/checkout/:id" component={Checkout} />
      <Route path="/order-confirmation/:id" component={OrderConfirmation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  // Hide navbar on landing page
  const showNavbar = location !== "/";
  
  return (
    <QueryClientProvider client={queryClient}>
      {showNavbar && <Navbar />}
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
