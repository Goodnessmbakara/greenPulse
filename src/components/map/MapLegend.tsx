import { Button } from "@/components/ui/button";

const MapLegend = () => {
  return (
    <div className="bg-secondary/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4">Map Legend</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-sm font-medium">High Blooming Areas</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-primary/50" />
          <span className="text-sm font-medium">Medium Blooming Areas</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-muted" />
          <span className="text-sm font-medium">Low Blooming Areas</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
          Filter Data
        </Button>
        <Button variant="ghost" className="w-full">
          Reset Map
        </Button>
      </div>
    </div>
  );
};

export default MapLegend;
