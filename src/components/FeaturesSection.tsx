import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import weatherIcon from "@/assets/icon-weather.png";
import networkIcon from "@/assets/icon-network.png";
import mapIcon from "@/assets/icon-map.png";

const FeaturesSection = () => {
  const features = [
    {
      title: "Real-Time Bloom Tracking",
      subtitle: "NASA MODIS Data",
      description: "Live vegetation health monitoring at 250m resolution, updated every 8 days",
      image: mapIcon,
      bgColor: "bg-green-50",
      link: "/interactive-map"
    },
    {
      title: "Weather Correlation",
      subtitle: "Temperature + NDVI",
      description: "Connect land surface temperature with bloom patterns for accurate predictions",
      image: weatherIcon,
      bgColor: "bg-blue-50",
      link: "/interactive-map"
    },
    {
      title: "Global Coverage",
      subtitle: "5 Continents",
      description: "Monitor bloom events across Africa, Asia, Americas, Europe, and Oceania",
      image: networkIcon,
      bgColor: "bg-purple-50",
      link: "/interactive-map"
    },
    {
      title: "Advanced Filtering",
      subtitle: "Crop + Intensity",
      description: "Filter by crop type and bloom intensity for targeted insights",
      image: mapIcon,
      bgColor: "bg-orange-50",
      link: "/interactive-map"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Platform Features</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Powered by NASA Earth Observing System Data and Information System (EOSDIS)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.link}>
              <Card 
                className={`${feature.bgColor} p-6 border-none hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden h-full`}
              >
                <div className="mb-4 h-24 flex items-center justify-center">
                  <img src={feature.image} alt={feature.title} className="w-20 h-20 object-contain" />
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-xs text-primary font-semibold mb-2">{feature.subtitle}</p>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
