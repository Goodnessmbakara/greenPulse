import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Sprout className="w-6 h-6 text-primary" />
            <span>GreenPulse</span>
          </Link>
          
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
