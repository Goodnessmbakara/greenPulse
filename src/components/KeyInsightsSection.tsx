import { Card } from "@/components/ui/card";
import { BarChart3, MapPin, Bell, Globe2, BookOpen, Languages } from "lucide-react";

const KeyInsightsSection = () => {
  const insights = [
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      label: "Dashboard",
      bgColor: "bg-muted"
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary" />,
      label: "Map View",
      bgColor: "bg-secondary/50"
    },
    {
      icon: <Bell className="w-12 h-12 text-primary" />,
      label: "Alerts",
      bgColor: "bg-secondary/50"
    },
    {
      icon: <Globe2 className="w-12 h-12 text-primary" />,
      label: "Contact",
      bgColor: "bg-muted"
    },
    {
      icon: <Languages className="w-12 h-12 text-primary" />,
      label: "Languages",
      bgColor: "bg-muted"
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      label: "Resources",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Key Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Card 
              key={index}
              className={`${insight.bgColor} p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all cursor-pointer border-none aspect-video`}
            >
              <div className="mb-4">
                {insight.icon}
              </div>
              <h3 className="text-lg font-semibold">{insight.label}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyInsightsSection;
