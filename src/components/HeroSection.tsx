import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-plants.jpg";

const HeroSection = () => {
  return (
    <section className="relative mt-16 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-secondary/50 backdrop-blur-sm">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl mx-auto">
              Stay Ahead with GreenPulse
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Utilizing NASA data for plant forecasts!
            </p>

            <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Location</label>
                  <Input placeholder="Where are you farming?" className="bg-white" />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <Input type="date" placeholder="Select date" className="bg-white" />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <Input type="date" placeholder="Select date" className="bg-white" />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Farmers</label>
                  <Input placeholder="Number of farmers" className="bg-white" />
                </div>
              </div>
              
              <Button className="mt-6 w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8">
                Search
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
