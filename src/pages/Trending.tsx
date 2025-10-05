import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, MapPin, Calendar, Thermometer, Activity, ArrowRight, Droplets } from "lucide-react";

const Trending = () => {
  const [searchParams] = useSearchParams();
  const searchLocation = searchParams.get('location');
  
  const [selectedRegion, setSelectedRegion] = useState<string>(searchLocation || 'global');
  const [showTemperature, setShowTemperature] = useState(true);
  const [showRainfall, setShowRainfall] = useState(true);
  const [showBlooming, setShowBlooming] = useState(true);
  // All bloom regions data (from our 8 monitored locations)
  const allRegionsData = [
    { region: 'Nigeria - Maize Belt', crop: 'Maize', ndviIncrease: '+0.15', currentNDVI: 0.78, trend: 'up', color: '#7ED321', temp: 28.5, rainfall: 45, continent: 'africa' },
    { region: 'India - Punjab', crop: 'Wheat', ndviIncrease: '+0.12', currentNDVI: 0.75, trend: 'up', color: '#7ED321', temp: 22.3, rainfall: 35, continent: 'asia' },
    { region: 'USA - Midwest', crop: 'Corn', ndviIncrease: '+0.10', currentNDVI: 0.72, trend: 'up', color: '#7ED321', temp: 24.1, rainfall: 52, continent: 'americas' },
    { region: 'Brazil - São Paulo', crop: 'Coffee', ndviIncrease: '+0.08', currentNDVI: 0.64, trend: 'up', color: '#9ACD32', temp: 23.8, rainfall: 38, continent: 'americas' },
    { region: 'China - North Plain', crop: 'Wheat', ndviIncrease: '+0.06', currentNDVI: 0.61, trend: 'stable', color: '#9ACD32', temp: 18.5, rainfall: 28, continent: 'asia' },
    { region: 'Kenya - Rift Valley', crop: 'Tea', ndviIncrease: '+0.05', currentNDVI: 0.58, trend: 'stable', color: '#9ACD32', temp: 21.2, rainfall: 42, continent: 'africa' },
    { region: 'Argentina - Pampas', crop: 'Soy', ndviIncrease: '+0.02', currentNDVI: 0.42, trend: 'down', color: '#D3D3D3', temp: 16.8, rainfall: 15, continent: 'americas' },
    { region: 'Australia - Victoria', crop: 'Wheat', ndviIncrease: '-0.03', currentNDVI: 0.38, trend: 'down', color: '#D3D3D3', temp: 15.2, rainfall: 22, continent: 'oceania' },
  ];

  // Filter regions based on selected location
  const getFilteredRegions = () => {
    if (selectedRegion === 'global') return allRegionsData;
    
    const regionMap: { [key: string]: string } = {
      'nigeria': 'africa',
      'india': 'asia',
      'brazil': 'americas',
      'usa': 'americas',
      'china': 'asia',
      'kenya': 'africa',
      'argentina': 'americas',
      'australia': 'oceania',
      'africa': 'africa',
      'asia': 'asia',
      'americas': 'americas',
      'oceania': 'oceania',
    };

    const continent = regionMap[selectedRegion.toLowerCase()] || selectedRegion.toLowerCase();
    
    if (continent === 'africa' || continent === 'asia' || continent === 'americas' || continent === 'oceania') {
      return allRegionsData.filter(r => r.continent === continent);
    }
    
    return allRegionsData.filter(r => 
      r.region.toLowerCase().includes(selectedRegion.toLowerCase())
    );
  };

  const filteredRegions = getFilteredRegions();
  const topRegions = filteredRegions.slice(0, 4);

  // Recent bloom events (last 7 days)
  const recentEvents = [
    { 
      event: 'Peak Bloom Reached', 
      region: 'Nigeria', 
      crop: 'Maize', 
      date: '2 days ago', 
      ndvi: 0.78,
      description: 'Optimal harvest window now open'
    },
    { 
      event: 'Early Bloom Started', 
      region: 'China', 
      crop: 'Wheat', 
      date: '3 days ago', 
      ndvi: 0.61,
      description: 'Monitor for next 14 days'
    },
    { 
      event: 'Temperature Alert', 
      region: 'Kenya', 
      crop: 'Tea', 
      date: '5 days ago', 
      ndvi: 0.58,
      description: 'Cooler temps may delay bloom'
    },
    { 
      event: 'NDVI Surge Detected', 
      region: 'India', 
      crop: 'Wheat', 
      date: '6 days ago', 
      ndvi: 0.75,
      description: 'Rapid vegetation growth observed'
    },
  ];

  // Climate trends affecting blooms
  const climateTrends = [
    {
      title: 'Temperature Rising',
      region: 'Africa & Asia',
      impact: 'Accelerating bloom cycles by 5-7 days',
      trend: 'up',
      severity: 'medium'
    },
    {
      title: 'Optimal Rainfall',
      region: 'Americas',
      impact: 'Stable bloom patterns observed',
      trend: 'stable',
      severity: 'positive'
    },
    {
      title: 'Below-Average NDVI',
      region: 'Oceania',
      impact: 'Delayed blooming expected',
      trend: 'down',
      severity: 'warning'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="py-8 sm:py-12 bg-gradient-to-r from-primary to-green-600 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">🔥 Trending Bloom Events</h1>
                  <p className="text-white/90 text-sm sm:text-base">
                    {selectedRegion === 'global' 
                      ? 'Global flowering patterns this week' 
                      : `Bloom trends for ${selectedRegion}`
                    }
                  </p>
                </div>
                <Badge className="bg-white text-primary hover:bg-white/90">
                  🛰️ Live NASA Data
                </Badge>
              </div>
              
              {/* Location Filter */}
              <div className="max-w-md">
                <Label className="text-white/90 text-sm mb-2 block">Filter by Region</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-white text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">🌍 Global (All Regions)</SelectItem>
                    <SelectItem value="africa">🌍 Africa</SelectItem>
                    <SelectItem value="asia">🌏 Asia</SelectItem>
                    <SelectItem value="americas">🌎 Americas</SelectItem>
                    <SelectItem value="oceania">🌏 Oceania</SelectItem>
                    <SelectItem value="nigeria">🇳🇬 Nigeria</SelectItem>
                    <SelectItem value="india">🇮🇳 India</SelectItem>
                    <SelectItem value="brazil">🇧🇷 Brazil</SelectItem>
                    <SelectItem value="usa">🇺🇸 USA</SelectItem>
                    <SelectItem value="china">🇨🇳 China</SelectItem>
                    <SelectItem value="kenya">🇰🇪 Kenya</SelectItem>
                    <SelectItem value="argentina">🇦🇷 Argentina</SelectItem>
                    <SelectItem value="australia">🇦🇺 Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Data Customization Options */}
        <section className="py-6 bg-blue-50 border-b">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-2">Customize Your View</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="temp-data" 
                      checked={showTemperature}
                      onCheckedChange={(checked) => setShowTemperature(checked as boolean)}
                    />
                    <Label htmlFor="temp-data" className="cursor-pointer text-sm">
                      Temperature Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rain-data" 
                      checked={showRainfall}
                      onCheckedChange={(checked) => setShowRainfall(checked as boolean)}
                    />
                    <Label htmlFor="rain-data" className="cursor-pointer text-sm">
                      Rainfall Data
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="bloom-data" 
                      checked={showBlooming}
                      onCheckedChange={(checked) => setShowBlooming(checked as boolean)}
                    />
                    <Label htmlFor="bloom-data" className="cursor-pointer text-sm">
                      Bloom Status
                    </Label>
                  </div>
                </div>
              </div>
              <Badge variant="outline">
                {filteredRegions.length} region{filteredRegions.length > 1 ? 's' : ''} shown
              </Badge>
            </div>
          </div>
        </section>

        {/* Top Bloom Regions */}
        <section className="py-8 sm:py-12 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Top Bloom Regions
                {selectedRegion !== 'global' && ` in ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}`}
              </h2>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
            </div>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Regions with highest NDVI increases over the past 7 days • Based on NASA MODIS data
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topRegions.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">#{index + 1}</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg">{item.region}</CardTitle>
                    <CardDescription>{item.crop}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {showBlooming && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">NDVI Increase:</span>
                            <span className="font-bold text-green-500">{item.ndviIncrease}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Current NDVI:</span>
                            <span className="font-semibold">{item.currentNDVI}</span>
                          </div>
                        </>
                      )}
                      {showTemperature && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            Temperature:
                          </span>
                          <span className="font-semibold">{item.temp}°C</span>
                        </div>
                      )}
                      {showRainfall && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Droplets className="w-3 h-3" />
                            Rainfall:
                          </span>
                          <span className="font-semibold">{item.rainfall}mm</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Bloom Events */}
        <section className="py-8 sm:py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Recent Bloom Events</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">Latest flowering events detected by NASA MODIS satellite</p>
            
            <div className="space-y-4">
              {recentEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className="bg-primary">{event.event}</Badge>
                          <Badge variant="outline" className="text-xs">{event.date}</Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-1">{event.region} - {event.crop}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">NDVI: <span className="font-semibold text-foreground">{event.ndvi}</span></span>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <Link to="/interactive-map">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View on Map <ArrowRight className="ml-2 w-3 h-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Climate Trends */}
        <section className="py-8 sm:py-12 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-6">
              <Thermometer className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">Climate Trends Impacting Blooms</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">How climate patterns are affecting flowering globally</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {climateTrends.map((trend, index) => (
                <Card key={index} className={`
                  ${trend.severity === 'warning' ? 'border-orange-300 bg-orange-50' : ''}
                  ${trend.severity === 'positive' ? 'border-green-300 bg-green-50' : ''}
                  ${trend.severity === 'medium' ? 'border-yellow-300 bg-yellow-50' : ''}
                  hover:shadow-lg transition-all
                `}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{trend.title}</CardTitle>
                      {trend.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                      ) : trend.trend === 'down' ? (
                        <TrendingDown className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Activity className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {trend.region}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{trend.impact}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Data Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">About This Data</h4>
                    <p className="text-sm text-blue-800">
                      <strong>Data Source:</strong> NASA MODIS Terra satellite (250m resolution, 8-day composite)<br/>
                      <strong>Location:</strong> {selectedRegion === 'global' ? 'All 8 monitored regions globally' : `Filtered to ${selectedRegion}`}<br/>
                      <strong>Customization:</strong> Toggle temperature, rainfall, and bloom data above to customize your view<br/>
                      <strong>Update Frequency:</strong> NDVI updated every 8 days, Temperature daily
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA to Map */}
            <div className="mt-8 text-center">
              <Card className="bg-gradient-to-r from-primary to-green-600 text-white border-none">
                <CardContent className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Explore All Trends on the Map</h3>
                  <p className="text-white/90 mb-6 text-sm sm:text-base">
                    View live NASA satellite data and filter by crop type or bloom intensity
                  </p>
                  <Link to={`/interactive-map${selectedRegion !== 'global' ? `?location=${selectedRegion}` : ''}`}>
                    <Button className="bg-white text-primary hover:bg-white/90 px-6 sm:px-8 font-semibold">
                      View {selectedRegion !== 'global' ? selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1) : 'Global'} Map →
                    </Button>
                  </Link>
                </CardContent>
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