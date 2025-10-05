import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Thermometer, Droplets } from "lucide-react";

const Trending = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <section className="py-12">
          <div className="container mx-auto px-6">
            {/* Top Three Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {/* Temperature Trends Card */}
              <Card className="bg-muted p-8 border-none">
                <h3 className="text-xl font-bold mb-6">Temperature Trends</h3>
                
                <div className="h-40 mb-6 relative">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    {/* Grid lines */}
                    <line x1="0" y1="100" x2="200" y2="100" stroke="#666" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="#666" strokeWidth="1" />
                    
                    {/* Line chart */}
                    <polyline
                      points="10,60 30,45 50,55 70,35 90,50 110,30 130,45 150,40 170,55 190,50"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                
                <p className="text-sm text-foreground">
                  An overview of temperature variations over the past month.
                </p>
              </Card>

              {/* Rainfall Patterns Card */}
              <Card className="bg-secondary/50 p-8 border-none">
                <h3 className="text-xl font-bold mb-6">Rainfall Patterns</h3>
                
                <div className="h-40 mb-6 flex items-end gap-2 px-4">
                  {[75, 85, 70, 45, 80, 90, 55].map((height, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-primary rounded-t transition-all hover:opacity-80" 
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-foreground">
                  Detailed analysis of rainfall distribution across different periods.
                </p>
              </Card>

              {/* Blooming Data History Card */}
              <Card className="bg-primary text-white p-8 border-none">
                <h3 className="text-xl font-bold mb-6">Blooming Data History</h3>
                
                <div className="h-40 mb-6 relative">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    {/* Crosshair */}
                    <line x1="0" y1="50" x2="200" y2="50" stroke="white" strokeWidth="1" />
                    <line x1="100" y1="0" x2="100" y2="100" stroke="white" strokeWidth="1" />
                    
                    {/* Scatter points */}
                    {[...Array(40)].map((_, i) => {
                      const x = 40 + Math.random() * 120;
                      const y = 20 + Math.random() * 60;
                      const size = 2 + Math.random() * 3;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={size}
                          fill="white"
                          opacity={0.6 + Math.random() * 0.4}
                        />
                      );
                    })}
                  </svg>
                </div>
                
                <p className="text-sm">
                  Historical blooming data to help plan future cultivation.
                </p>
              </Card>
            </div>

            {/* Bottom Section - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Customizable Options */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Customizable Options</h2>
                <p className="text-muted-foreground mb-6">
                  Select specific data points to focus on:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox id="temp-alerts" />
                    <Label htmlFor="temp-alerts" className="cursor-pointer text-base">
                      Temperature Alerts
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox id="rainfall" />
                    <Label htmlFor="rainfall" className="cursor-pointer text-base">
                      Rainfall
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox id="blooming" />
                    <Label htmlFor="blooming" className="cursor-pointer text-base">
                      Blooming Updates
                    </Label>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Insights */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Quick Insights</h2>
                <p className="text-muted-foreground mb-6">
                  Get the latest updates at a glance:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Thermometer className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Current Temperature: 18°C</p>
                      <p className="text-sm text-muted-foreground">Updated 5 mins ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Rainfall Today: 12mm</p>
                      <p className="text-sm text-muted-foreground">Updated 10 mins ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Trending;
