import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { insertWaitlistSchema } from "@shared/schema";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

// Extend the schema with validation
const waitlistFormSchema = insertWaitlistSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }).optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

export default function LandingPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(data: WaitlistFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again later.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Authentic Indian Cuisine</span>
                <br /> Delivered to Your Door
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Experience the rich flavors of India with fresh, pre-measured ingredients and easy-to-follow recipes delivered right to your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg" onClick={() => {
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Join Waitlist
                </Button>
                <Button variant="outline" size="lg" className="text-lg" asChild>
                  <Link href="/menu"><span>Browse Recipes</span></Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1585937421612-70a008356c36"
                  alt="Indian Cuisine"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-6 left-0 w-full h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 25%)' }}></div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Spice Box Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-amber-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Choose Your Dishes</h3>
                <p className="text-gray-600 text-center">
                  Browse our menu of authentic Indian recipes and select your favorites.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-amber-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">We Deliver Ingredients</h3>
                <p className="text-gray-600 text-center">
                  We deliver pre-measured ingredients right to your door, with everything you need.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="pt-6">
                <div className="rounded-full bg-amber-100 w-16 h-16 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-amber-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Cook Like a Chef</h3>
                <p className="text-gray-600 text-center">
                  Follow our easy step-by-step instructions to prepare delicious Indian meals at home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Dishes Preview */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Dishes</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We'll be launching with a selection of authentic Indian dishes, freshly prepared with high-quality ingredients and traditional spices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dish previews */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href="/recipe/1">
                <img
                  src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
                  alt="Butter Chicken"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Butter Chicken</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Rich and creamy curry with tender chicken in a mildly spiced tomato sauce.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-orange-600 font-semibold">₹399.00</div>
                    <Button variant="outline" size="sm">View Recipe</Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href="/recipe/2">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc"
                  alt="Masala Dosa"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Masala Dosa</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Crisp fermented rice pancake stuffed with spiced potato filling.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-orange-600 font-semibold">₹149.00</div>
                    <Button variant="outline" size="sm">View Recipe</Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <Link href="/recipe/3">
                <img
                  src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6"
                  alt="Paneer Tikka"
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Paneer Tikka</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Chunks of cottage cheese marinated with spices and grilled to perfection.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-orange-600 font-semibold">₹249.00</div>
                    <Button variant="outline" size="sm">View Recipe</Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 md:py-24 bg-gradient-to-br from-amber-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Waitlist</h2>
            <p className="text-lg mb-8 text-amber-100">
              Be the first to know when we launch! Sign up for our waitlist and get early access.
            </p>
            
            {isSubmitted ? (
              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="mb-6">
                  You're on the list! We'll notify you when Spice Box launches.
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white text-orange-600 hover:bg-amber-50"
                  onClick={() => setIsSubmitted(false)}
                >
                  Join with another email
                </Button>
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-none">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} className="bg-white/20 text-white placeholder:text-amber-100 border-amber-300" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} className="bg-white/20 text-white placeholder:text-amber-100 border-amber-300" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} className="bg-white/20 text-white placeholder:text-amber-100 border-amber-300" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-white text-orange-600 hover:bg-amber-50"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Join Waitlist"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Spice Box</h2>
            <p className="mb-6">Premium Indian meal kits delivered to your door</p>
            <div className="flex justify-center space-x-4 mb-8">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p>© 2025 Spice Box. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}