import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface MapLayersProps {
  layers: {
    ndvi: boolean;
    temperature: boolean;
    evi: boolean;
  };
  onLayerToggle: (layer: keyof MapLayersProps['layers']) => void;
}

const MapLayers = ({ layers, onLayerToggle }: MapLayersProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">NASA Satellite Layers</h3>
        <Badge variant="secondary" className="text-xs">Live Data</Badge>
      </div>
      
      <p className="text-xs text-gray-500 mb-4">
        Real-time satellite data from NASA EOSDIS GIBS
      </p>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="ndvi" 
            checked={layers.ndvi}
            onCheckedChange={() => onLayerToggle('ndvi')}
          />
          <div className="flex-1">
            <Label htmlFor="ndvi" className="cursor-pointer font-semibold">
              Vegetation (NDVI)
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              MODIS Terra • 250m • 8-day composite
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Tracks vegetation health and flowering patterns
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="temperature" 
            checked={layers.temperature}
            onCheckedChange={() => onLayerToggle('temperature')}
          />
          <div className="flex-1">
            <Label htmlFor="temperature" className="cursor-pointer font-semibold">
              Land Surface Temperature
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              MODIS Terra • 1km • Daily
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Temperature correlation with bloom events
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-2">
          <Checkbox 
            id="evi" 
            checked={layers.evi}
            onCheckedChange={() => onLayerToggle('evi')}
          />
          <div className="flex-1">
            <Label htmlFor="evi" className="cursor-pointer font-semibold">
              Enhanced Vegetation (EVI)
            </Label>
            <p className="text-xs text-gray-500 mt-1">
              MODIS Terra • 250m • 8-day composite
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Advanced vegetation index for dense canopy
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800">
          <strong>✓ Live NASA Data</strong><br />
          All layers use real-time satellite observations from NASA's Earth Observing System
        </p>
      </div>
    </div>
  );
};

export default MapLayers;
