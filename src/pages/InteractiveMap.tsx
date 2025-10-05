import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MapLegend from "@/components/map/MapLegend";
import MapLayers from "@/components/map/MapLayers";
import BloomingMap from "@/components/map/BloomingMap";

const InteractiveMap = () => {
  const [layers, setLayers] = useState({
    ndvi: true,  // Start with NDVI layer active (vegetation/bloom tracking)
    temperature: false,
    evi: false,
  });

  const handleLayerToggle = (layer: keyof typeof layers) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/20">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex gap-6 h-[calc(100vh-200px)]">
            {/* Left Sidebar - Legend */}
            <div className="w-64 flex-shrink-0">
              <MapLegend />
            </div>

            {/* Center - Map */}
            <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-lg">
              <BloomingMap layers={layers} />
            </div>

            {/* Right Sidebar - Layers */}
            <div className="w-64 flex-shrink-0">
              <MapLayers layers={layers} onLayerToggle={handleLayerToggle} />
            </div>
          </div>

          {/* Info Section Below Map */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🛰️ Live NASA Satellite Data</h2>
            <p className="text-muted-foreground mb-4">
              This interactive map displays <strong>real-time flowering predictions</strong> powered by NASA Earth observation data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>MODIS NDVI (250m):</strong> Normalized Difference Vegetation Index - tracks plant health, flowering intensity, and bloom patterns globally</li>
              <li><strong>MODIS Temperature (1km):</strong> Land surface temperature data - correlates temperature with bloom timing and events</li>
              <li><strong>MODIS EVI (250m):</strong> Enhanced Vegetation Index - advanced analysis for dense canopy areas and agricultural regions</li>
            </ul>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>✓ Real-Time Data:</strong> All layers use live satellite observations from NASA EOSDIS GIBS (Global Imagery Browse Services). Data is updated every 8 days for vegetation indices and daily for temperature.
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>How to use:</strong> Toggle layers in the right sidebar to explore different data views. Click on bloom markers to see regional details. The map shows key agricultural regions globally where flowering events are actively monitored.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InteractiveMap;
