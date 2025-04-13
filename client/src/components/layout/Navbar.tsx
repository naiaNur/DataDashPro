import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu,
  Search,
  ShoppingBag
} from "lucide-react";
import { Cart } from "@/components/cart/Cart";
import { Wishlist } from "@/components/wishlist/Wishlist";
import { Input } from "@/components/ui/input";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

const NavLink = ({ href, children, isMobile = false }: NavLinkProps) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  return isMobile ? (
    <Link href={href}>
      <a className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
      }`}>
        {children}
      </a>
    </Link>
  ) : (
    <Link href={href}>
      <a className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive 
          ? "text-primary" 
          : "text-gray-700 hover:text-primary"
      }`}>
        {children}
      </a>
    </Link>
  );
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [location, navigate] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('searchQuery')?.toString() || '';
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center flex-1">
            <Link href="/">
              <a className="flex-shrink-0 flex items-center">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-semibold text-gray-800">ShopMart</span>
              </a>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <NavLink href="/">Beranda</NavLink>
              <NavLink href="/products">Produk</NavLink>
              <NavLink href="/categories">Kategori</NavLink>
              <NavLink href="/new-arrivals">Baru</NavLink>
              <NavLink href="/sale">Diskon</NavLink>
            </div>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-2">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  name="searchQuery"
                  placeholder="Cari produk..."
                  className="w-60"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowSearch(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Wishlist />
            <Cart />
          </div>
          
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink href="/" isMobile>Beranda</NavLink>
            <NavLink href="/products" isMobile>Produk</NavLink>
            <NavLink href="/categories" isMobile>Kategori</NavLink>
            <NavLink href="/new-arrivals" isMobile>Baru</NavLink>
            <NavLink href="/sale" isMobile>Diskon</NavLink>
          </div>
          <div className="px-3 py-2 border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="mb-2">
              <Input
                type="text"
                name="searchQuery"
                placeholder="Cari produk..."
                className="w-full"
              />
            </form>
            <div className="flex space-x-2 pt-2">
              <Cart />
              <Wishlist />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
