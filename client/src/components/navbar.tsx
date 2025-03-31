import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Spice Box
            </a>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/menu">
              <a className="text-gray-600 hover:text-orange-600 font-medium">Menu</a>
            </Link>
            <Link href="/#waitlist">
              <a className="text-gray-600 hover:text-orange-600 font-medium">Join Waitlist</a>
            </Link>
            <Link href="/">
              <a className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-medium hover:shadow-lg transition-all">
                Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
