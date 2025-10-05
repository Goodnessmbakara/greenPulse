import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { MapPin, Satellite, Globe2 } from "lucide-react";

const KeyInsightsSection = () => {
  const insights = [
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      label: "Interactive Map",
      description: "Explore global bloom patterns with real NASA satellite data",
      bgColor: "bg-green-50",
      link: "/interactive-map"
    },
    {
      icon: <Satellite className="w-12 h-12 text-primary" />,
      label: "NASA MODIS Data",
      description: "Live vegetation health tracking at 250m resolution",
      bgColor: "bg-blue-50",
      link: "/interactive-map"
    },
    {
      icon: <Globe2 className="w-12 h-12 text-primary" />,
      label: "Global Coverage",
      description: "8 bloom regions monitored across 5 continents",
      bgColor: "bg-purple-50",
      link: "/interactive-map"
    }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Why GreenPulse?</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Real-time flowering predictions powered by NASA Earth observation data
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Link key={index} to={insight.link}>
              <Card 
                className={`${insight.bgColor} p-8 flex flex-col items-center text-center hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary h-full`}
              >
                <div className="mb-4">
                  {insight.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{insight.label}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInsightsSection;
