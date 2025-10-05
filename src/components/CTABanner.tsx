import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Explore?</h3>
              <p className="text-white/90">
                View live NASA satellite data and global bloom patterns on our interactive map
              </p>
            </div>
          </div>
          
          <Link to="/interactive-map">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 font-semibold">
              View Map →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
