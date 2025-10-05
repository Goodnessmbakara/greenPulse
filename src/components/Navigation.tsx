import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X } from "lucide-react";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg sm:text-xl font-bold">
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span>GreenPulse</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/insights" className="text-sm font-medium hover:text-primary transition-colors">
              Insights
            </Link>
            <Link to="/interactive-map" className="text-sm font-medium hover:text-primary transition-colors">
              Interactive Map
            </Link>
            <Link to="/trending" className="text-sm font-medium hover:text-primary transition-colors">
              Trending
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/insights" 
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </Link>
            <Link 
              to="/interactive-map" 
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Interactive Map
            </Link>
            <Link 
              to="/trending" 
              className="block px-4 py-2 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trending
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
