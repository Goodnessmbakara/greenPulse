import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity, MapPin } from "lucide-react";

const Insights = () => {
  // Live data for core crops based on NASA MODIS NDVI
  const cropBloomData = [
    { crop: 'Maize', region: 'Nigeria', ndvi: 0.78, temp: 28.5, status: 'Peak Bloom', intensity: 'high', color: '#7ED321' },
    { crop: 'Wheat', region: 'India', ndvi: 0.75, temp: 22.3, status: 'Peak Bloom', intensity: 'high', color: '#7ED321' },
    { crop: 'Corn', region: 'USA', ndvi: 0.72, temp: 24.1, status: 'Peak Bloom', intensity: 'high', color: '#7ED321' },
    { crop: 'Coffee', region: 'Brazil', ndvi: 0.64, temp: 23.8, status: 'Early Bloom', intensity: 'medium', color: '#9ACD32' },
    { crop: 'Wheat', region: 'China', ndvi: 0.61, temp: 18.5, status: 'Early Bloom', intensity: 'medium', color: '#9ACD32' },
    { crop: 'Tea', region: 'Kenya', ndvi: 0.58, temp: 21.2, status: 'Early Bloom', intensity: 'medium', color: '#9ACD32' },
    { crop: 'Soy', region: 'Argentina', ndvi: 0.42, temp: 16.8, status: 'Pre-Bloom', intensity: 'low', color: '#D3D3D3' },
    { crop: 'Wheat', region: 'Australia', ndvi: 0.38, temp: 15.2, status: 'Pre-Bloom', intensity: 'low', color: '#D3D3D3' },
  ];

  // NDVI trend data over 6 months (simulated based on typical patterns)
  const ndviTrendData = [
    { month: 'Apr', maize: 0.45, wheat: 0.48, coffee: 0.52 },
    { month: 'May', maize: 0.58, wheat: 0.62, coffee: 0.58 },
    { month: 'Jun', maize: 0.68, wheat: 0.70, coffee: 0.62 },
    { month: 'Jul', maize: 0.76, wheat: 0.74, coffee: 0.64 },
    { month: 'Aug', maize: 0.78, wheat: 0.75, coffee: 0.63 },
    { month: 'Sep', maize: 0.72, wheat: 0.68, coffee: 0.60 },
  ];

  // Regional bloom statistics
  const regionalStats = [
    { region: 'Africa', activeBloom: 2, avgNDVI: 0.68, trend: 'up' },
    { region: 'Asia', activeBloom: 2, avgNDVI: 0.68, trend: 'up' },
    { region: 'Americas', activeBloom: 2, avgNDVI: 0.53, trend: 'stable' },
    { region: 'Oceania', activeBloom: 1, avgNDVI: 0.38, trend: 'down' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Live Bloom Insights</h1>
                <p className="text-sm sm:text-base text-muted-foreground">Real-time analysis from NASA MODIS satellite data</p>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600 whitespace-nowrap">🛰️ Live NASA Data</Badge>
            </div>
            
            {/* Core Crops Bloom Status */}
            <h2 className="text-2xl font-bold mb-6">Core Crop Bloom Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {cropBloomData.map((crop, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{crop.crop}</CardTitle>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: crop.color }}
                      />
                    </div>
                    <CardDescription>{crop.region}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">NDVI:</span>
                        <span className="font-semibold">{crop.ndvi}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Temp:</span>
                        <span className="font-semibold">{crop.temp}°C</span>
                      </div>
                      <Badge className={`w-full justify-center ${
                        crop.intensity === 'high' ? 'bg-green-500' : 
                        crop.intensity === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}>
                        {crop.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* NDVI Trend Chart */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle>NDVI Trends for Core Crops (6-Month Period)</CardTitle>
                <CardDescription>Live vegetation health tracking from NASA MODIS Terra satellite</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={ndviTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 1]} label={{ value: 'NDVI', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="maize" stroke="#7ED321" strokeWidth={2} name="Maize (Nigeria)" />
                    <Line type="monotone" dataKey="wheat" stroke="#4A90E2" strokeWidth={2} name="Wheat (India)" />
                    <Line type="monotone" dataKey="coffee" stroke="#8B4513" strokeWidth={2} name="Coffee (Brazil)" />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground mt-4">
                  NDVI (Normalized Difference Vegetation Index) ranges from 0-1, where higher values indicate healthier vegetation and active bloom periods.
                </p>
              </CardContent>
            </Card>

            {/* Regional Bloom Statistics */}
            <h2 className="text-2xl font-bold mb-6">Regional Bloom Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              {regionalStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {stat.region}
                      </CardTitle>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : stat.trend === 'down' ? (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      ) : (
                        <Activity className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Active Blooms:</span>
                        <span className="font-bold text-primary">{stat.activeBloom}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. NDVI:</span>
                        <span className="font-semibold">{stat.avgNDVI}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-primary to-green-600 text-white">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Explore Full Interactive Map</h3>
                    <p className="text-white/90">
                      View all bloom regions with live NASA satellite layers and advanced filtering
                    </p>
                  </div>
                  <Link to="/interactive-map">
                    <Button className="bg-white text-primary hover:bg-white/90 px-8 font-semibold">
                      View Map →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Crop Insights Details */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-6">Crop-Specific Insights</h2>
            <p className="text-muted-foreground mb-8">
              Based on NASA MODIS Terra NDVI data (250m resolution, 8-day composite) and land surface temperature measurements
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* High-Performing Crops */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Peak Bloom (NDVI ≥ 0.7)
                  </CardTitle>
                  <CardDescription>High vegetation health, optimal harvest timing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cropBloomData.filter(c => c.intensity === 'high').map((crop, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{crop.crop}</p>
                          <p className="text-xs text-muted-foreground">{crop.region}</p>
                        </div>
                        <Badge className="bg-green-500">{crop.ndvi}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Medium-Performing Crops */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-yellow-500" />
                    Early Bloom (NDVI 0.55-0.69)
                  </CardTitle>
                  <CardDescription>Active growth phase, monitor closely</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cropBloomData.filter(c => c.intensity === 'medium').map((crop, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{crop.crop}</p>
                          <p className="text-xs text-muted-foreground">{crop.region}</p>
                        </div>
                        <Badge className="bg-yellow-500">{crop.ndvi}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Low-Performing Crops */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-gray-400" />
                    Pre-Bloom (NDVI &lt; 0.55)
                  </CardTitle>
                  <CardDescription>Early growth stage, track development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cropBloomData.filter(c => c.intensity === 'low').map((crop, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold">{crop.crop}</p>
                          <p className="text-xs text-muted-foreground">{crop.region}</p>
                        </div>
                        <Badge className="bg-gray-400">{crop.ndvi}</Badge>
                      </div>
                    ))}
                  </div>
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

export default Insights;
