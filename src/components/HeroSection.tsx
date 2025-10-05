import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-plants.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    farmers: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // Validate required fields
    if (!formData.location) {
      toast({
        title: "Location Required",
        description: "Please enter a farming location to search.",
        variant: "destructive",
      });
      return;
    }

    // Build query parameters
    const params = new URLSearchParams();
    if (formData.location) params.append('location', formData.location);
    if (formData.startDate) params.append('startDate', formData.startDate);
    if (formData.endDate) params.append('endDate', formData.endDate);
    if (formData.farmers) params.append('farmers', formData.farmers);

    // Show success message
    toast({
      title: "Searching Bloom Data",
      description: `Fetching NASA satellite data for ${formData.location}...`,
    });

    // Navigate to interactive map with search parameters
    navigate(`/interactive-map?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
                  <Input 
                    placeholder="Where are you farming?" 
                    className="bg-white"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Start Date</label>
                  <Input 
                    type="date" 
                    placeholder="Select date" 
                    className="bg-white"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <Input 
                    type="date" 
                    placeholder="Select date" 
                    className="bg-white"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
                
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Farmers</label>
                  <Input 
                    type="number"
                    placeholder="Number of farmers" 
                    className="bg-white"
                    value={formData.farmers}
                    onChange={(e) => handleInputChange('farmers', e.target.value)}
                    onKeyPress={handleKeyPress}
                    min="1"
                  />
                </div>
              </div>
              
              <Button 
                className="mt-6 w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8"
                onClick={handleSearch}
              >
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
