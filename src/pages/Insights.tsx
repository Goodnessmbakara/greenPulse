import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import springBloom from "@/assets/spring-bloom.png";
import summerBloom from "@/assets/summer-bloom.png";
import autumnBloom from "@/assets/autumn-bloom.png";

const Insights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-12">Predictive Models for Blooming Periods</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-secondary/50 p-8 border-none">
                <h3 className="text-lg font-semibold mb-4">MODIS Data</h3>
                <div className="h-32 flex items-end">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <polyline
                      points="0,60 30,50 60,55 90,45 120,50 150,40 180,45 200,50"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </Card>

              <Card className="bg-secondary/50 p-8 border-none">
                <h3 className="text-lg font-semibold mb-4">Landsat Data</h3>
                <div className="h-32 flex items-end gap-2">
                  {[60, 70, 65, 50, 75, 80].map((height, i) => (
                    <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </Card>

              <Card className="bg-primary/90 text-white p-8 border-none">
                <h3 className="text-lg font-semibold mb-4">VIIRS Data</h3>
                <div className="h-32 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    {[...Array(30)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          opacity: Math.random()
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-white" />
                      <div className="absolute w-0.5 h-8 bg-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-8">Blooming Timelines</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Spring Bloom</h3>
                <div className="bg-white rounded-lg p-6 h-64 flex items-center justify-center">
                  <img src={springBloom} alt="Spring Bloom" className="max-h-full object-contain" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Summer Bloom</h3>
                <div className="bg-white rounded-lg p-6 h-64 flex items-center justify-center">
                  <img src={summerBloom} alt="Summer Bloom" className="max-h-full object-contain" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Autumn Bloom</h3>
                <div className="bg-white rounded-lg p-6 h-64 flex items-center justify-center">
                  <img src={autumnBloom} alt="Autumn Bloom" className="max-h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Customizable Options</h2>
                <p className="text-muted-foreground mb-6">Select specific data points to focus on:</p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="temp" />
                    <Label htmlFor="temp" className="cursor-pointer">Temperature Alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rain" />
                    <Label htmlFor="rain" className="cursor-pointer">Rainfall</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bloom" />
                    <Label htmlFor="bloom" className="cursor-pointer">Blooming Updates</Label>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Quick Insights</h2>
                <p className="text-muted-foreground mb-6">Get the latest updates at a glance:</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Current Temperature: 18°C</p>
                      <p className="text-sm text-muted-foreground">Updated 5 mins ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Rainfall Today: 12mm</p>
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

export default Insights;
