import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  Bell, 
  ChevronDown
} from "lucide-react";

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a 
    href={href} 
    className="border-transparent text-gray-600 hover:text-gray-900 hover:border-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg className="h-8 w-auto text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M11 9a2 2 0 100 4 2 2 0 000-4zm-4-3a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm0 12a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1zm9-6a3 3 0 11-6 0 3 3 0 016 0z" fill="white"></path>
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-800">DataCanvas</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#solutions">Solutions</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon" className="mr-4">
              <Bell className="h-5 w-5 text-gray-400" />
            </Button>
            <div className="ml-3 relative">
              <div>
                <Button variant="ghost" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    JD
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#features" className="border-transparent text-gray-600 hover:text-gray-900 hover:border-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Features</a>
            <a href="#solutions" className="border-transparent text-gray-600 hover:text-gray-900 hover:border-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Solutions</a>
            <a href="#pricing" className="border-transparent text-gray-600 hover:text-gray-900 hover:border-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Pricing</a>
            <a href="#testimonials" className="border-transparent text-gray-600 hover:text-gray-900 hover:border-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Testimonials</a>
          </div>
        </div>
      )}
    </nav>
  );
}
