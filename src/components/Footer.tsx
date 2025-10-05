import { Link } from "react-router-dom";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 border-t border-border mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>Contact Us: <a href="mailto:info@greenpulse.biz" className="hover:text-primary transition-colors">info@greenpulse.biz</a></p>
            <p>Phone: <a href="tel:+2347041203832" className="hover:text-primary transition-colors">+234 704 120 3832</a></p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <a 
              href="https://twitter.com/goodnesmbakara" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm">@goodnesmbakara</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
