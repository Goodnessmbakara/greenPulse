import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Map, TrendingUp, BarChart3, ArrowLeft, Sprout } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Home",
      description: "Start your bloom tracking journey",
      link: "/"
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Interactive Map",
      description: "View live NASA satellite data",
      link: "/interactive-map"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Insights",
      description: "Analyze bloom patterns and trends",
      link: "/insights"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trending",
      description: "See what's happening globally",
      link: "/trending"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-4xl w-full">
          {/* 404 Message */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <Sprout className="w-24 h-24 sm:w-32 sm:h-32 text-primary opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl sm:text-8xl font-bold text-primary">404</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-2">
              Oops! This bloom seems to have wilted away.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => navigate(-1)}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Link to="/">
                <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto gap-2">
                  <Home className="w-4 h-4" />
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h2 className="text-xl font-semibold mb-6 text-center">Explore GreenPulse</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((item, index) => (
                <Link key={index} to={item.link}>
                  <Card className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary h-full">
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <p className="text-sm text-blue-800">
                  <strong>🛰️ Need Help?</strong><br />
                  GreenPulse tracks flowering patterns globally using NASA MODIS satellite data. 
                  Use the navigation above or quick links to explore bloom predictions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;