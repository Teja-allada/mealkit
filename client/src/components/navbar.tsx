import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent cursor-pointer">
              Spice Box
            </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/menu">
              <div className="text-gray-600 hover:text-orange-600 font-medium cursor-pointer">Menu</div>
            </Link>
            <Link href="/#waitlist">
              <div className="text-gray-600 hover:text-orange-600 font-medium cursor-pointer">Join Waitlist</div>
            </Link>
            <Link href="/">
              <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-medium hover:shadow-lg transition-all cursor-pointer">
                Home
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
