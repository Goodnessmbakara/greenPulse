import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import weatherIcon from "@/assets/icon-weather.png";
import networkIcon from "@/assets/icon-network.png";
import mapIcon from "@/assets/icon-map.png";

const FeaturesSection = () => {
  const features = [
    {
      title: "Farmers' Hub",
      subtitle: "Nigeria",
      description: "Empowering farmers daily",
      image: weatherIcon,
      bgColor: "bg-orange-50"
    },
    {
      title: "Weather Insights",
      subtitle: "Real-Time Data",
      description: "Stay informed",
      image: weatherIcon,
      bgColor: "bg-green-50"
    },
    {
      title: "Blooming Alerts",
      subtitle: "Critical Updates",
      description: "Stay ahead of blooms",
      image: mapIcon,
      bgColor: "bg-gray-900 text-white"
    },
    {
      title: "Join our network",
      subtitle: "",
      description: "Connect with others",
      image: networkIcon,
      bgColor: "bg-gray-800 text-white"
    },
    {
      title: "Get Exclusive Offers",
      subtitle: "Special Discounts",
      description: "For farmers only",
      image: networkIcon,
      bgColor: "bg-green-100"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`${feature.bgColor} p-6 border-none hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden`}
            >
              {index < 3 && (
                <div className="mb-4 h-32 flex items-center justify-center">
                  <img src={feature.image} alt={feature.title} className="w-24 h-24 object-contain" />
                </div>
              )}
              
              <div className={index >= 3 ? "pt-8" : ""}>
                <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                {feature.subtitle && (
                  <p className="text-sm opacity-70 mb-2">{feature.subtitle}</p>
                )}
                <p className="text-sm font-medium mb-4">{feature.description}</p>
                
                <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
