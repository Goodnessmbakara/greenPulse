import { Link } from "react-router-dom";
import { Sprout } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sprout className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">GreenPulse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your eco-friendly farming partner since 2025
            </p>
            <p className="text-xs text-muted-foreground mt-4">GreenPulse AG</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help</Link></li>
                <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQs</Link></li>
                <li><Link to="/support" className="hover:text-foreground transition-colors">Customer Support</Link></li>
                <li><Link to="/guide" className="hover:text-foreground transition-colors">User Guide</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
