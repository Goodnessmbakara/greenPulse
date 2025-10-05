import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MapLayersProps {
  layers: {
    temperature: boolean;
    precipitation: boolean;
    soilMoisture: boolean;
  };
  onLayerToggle: (layer: keyof MapLayersProps['layers']) => void;
}

const MapLayers = ({ layers, onLayerToggle }: MapLayersProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4">Map Layers</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="temperature" 
            checked={layers.temperature}
            onCheckedChange={() => onLayerToggle('temperature')}
          />
          <Label htmlFor="temperature" className="cursor-pointer">
            Temperature
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="precipitation" 
            checked={layers.precipitation}
            onCheckedChange={() => onLayerToggle('precipitation')}
          />
          <Label htmlFor="precipitation" className="cursor-pointer">
            Precipitation
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="soilMoisture" 
            checked={layers.soilMoisture}
            onCheckedChange={() => onLayerToggle('soilMoisture')}
          />
          <Label htmlFor="soilMoisture" className="cursor-pointer">
            Soil Moisture
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MapLayers;
