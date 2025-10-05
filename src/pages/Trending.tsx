import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Trending = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">Trending Data</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Explore the latest blooming trends and climate patterns
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-primary">
                <h3 className="text-xl font-bold mb-2">Temperature Trends</h3>
                <p className="text-muted-foreground mb-4">
                  An overview of temperature variations over the past month.
                </p>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Chart visualization</span>
                </div>
              </Card>

              <Card className="p-6 bg-secondary/50">
                <h3 className="text-xl font-bold mb-2">Rainfall Patterns</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed analysis of rainfall distribution across different periods.
                </p>
                <div className="h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Chart visualization</span>
                </div>
              </Card>

              <Card className="p-6 bg-primary text-white">
                <h3 className="text-xl font-bold mb-2">Blooming Data History</h3>
                <p className="mb-4">
                  Historical blooming data to help plan future cultivation.
                </p>
                <div className="h-32 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm">Chart visualization</span>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Trending;
