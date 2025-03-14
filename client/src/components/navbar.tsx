import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              FoodCraft
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="text-gray-600 hover:text-gray-900">Recipes</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
