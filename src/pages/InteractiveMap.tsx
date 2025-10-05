import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MapLegend from "@/components/map/MapLegend";
import MapLayers from "@/components/map/MapLayers";
import BloomingMap from "@/components/map/BloomingMap";

const InteractiveMap = () => {
  const [layers, setLayers] = useState({
    temperature: false,
    precipitation: false,
    soilMoisture: false,
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
            <h2 className="text-2xl font-bold mb-4">About This Map</h2>
            <p className="text-muted-foreground mb-4">
              This interactive map displays real-time blooming predictions powered by NASA Earth observation data including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>MODIS Data:</strong> Vegetation indices (NDVI) tracking plant health and blooming intensity</li>
              <li><strong>Landsat Data:</strong> High-resolution imagery for detailed regional analysis</li>
              <li><strong>VIIRS Data:</strong> Night-time detection for comprehensive coverage</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Click on any blooming hotspot to view detailed information about that region.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InteractiveMap;
