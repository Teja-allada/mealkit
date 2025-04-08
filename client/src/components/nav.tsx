import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";

export function Nav() {
  const [, setLocation] = useLocation();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setLocation("/")}>
            <div className="flex items-center gap-2">
              {/* Logo SVG */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                className="text-[#7CCDC4]"
                fill="currentColor"
              >
                <g>
                  <circle cx="10" cy="50" r="8" />
                  <circle cx="30" cy="50" r="8" />
                  <circle cx="50" cy="50" r="8" />
                  <rect x="60" y="20" width="40" height="40" transform="rotate(45 80 40)" className="text-[#A8D97C]" fill="currentColor" />
                </g>
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">tvarit</h1>
                <p className="text-sm text-[#7CCDC4] -mt-1">food kit</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setLocation("/menu")}
            >
              Menu
            </Button>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setLocation("/dashboard")}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              className="bg-gradient-to-r from-[#7CCDC4] to-[#A8D97C] text-white hover:from-[#6BBDB4] hover:to-[#97C86B]"
              onClick={() => setLocation("/checkout")}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
} 