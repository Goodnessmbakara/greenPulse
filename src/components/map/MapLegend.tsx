import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface MapLegendProps {
  onFilterApply?: (filters: BloomFilters) => void;
  onResetMap?: () => void;
}

export interface BloomFilters {
  showHigh: boolean;
  showMedium: boolean;
  showLow: boolean;
}

const MapLegend = ({ onFilterApply, onResetMap }: MapLegendProps) => {
  const { toast } = useToast();
  const [filters, setFilters] = useState<BloomFilters>({
    showHigh: true,
    showMedium: true,
    showLow: true,
  });

  const handleFilterToggle = (filterType: keyof BloomFilters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const handleApplyFilters = () => {
    const activeFilters = Object.entries(filters)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace('show', ''));

    if (activeFilters.length === 0) {
      toast({
        title: "No Filters Selected",
        description: "Please select at least one bloom intensity to display.",
        variant: "destructive",
      });
      return;
    }

    if (onFilterApply) {
      onFilterApply(filters);
    }

    toast({
      title: "Filters Applied",
      description: `Showing ${activeFilters.join(', ')} blooming areas`,
    });
  };

  const handleReset = () => {
    setFilters({
      showHigh: true,
      showMedium: true,
      showLow: true,
    });

    if (onResetMap) {
      onResetMap();
    }

    toast({
      title: "Map Reset",
      description: "All filters cleared and map view restored to default.",
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold mb-4">Map Legend</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Checkbox 
            id="high-bloom"
            checked={filters.showHigh}
            onCheckedChange={() => handleFilterToggle('showHigh')}
          />
          <div className="flex items-center gap-2 flex-1">
            <div className="w-4 h-4 rounded-full bg-[#7ED321]" />
            <Label htmlFor="high-bloom" className="text-sm font-medium cursor-pointer">
              High Blooming Areas
            </Label>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Checkbox 
            id="medium-bloom"
            checked={filters.showMedium}
            onCheckedChange={() => handleFilterToggle('showMedium')}
          />
          <div className="flex items-center gap-2 flex-1">
            <div className="w-4 h-4 rounded-full bg-[#9ACD32]" />
            <Label htmlFor="medium-bloom" className="text-sm font-medium cursor-pointer">
              Medium Blooming Areas
            </Label>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Checkbox 
            id="low-bloom"
            checked={filters.showLow}
            onCheckedChange={() => handleFilterToggle('showLow')}
          />
          <div className="flex items-center gap-2 flex-1">
            <div className="w-4 h-4 rounded-full bg-[#D3D3D3]" />
            <Label htmlFor="low-bloom" className="text-sm font-medium cursor-pointer">
              Low Blooming Areas
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white"
          onClick={handleApplyFilters}
        >
          Filter Data
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleReset}
        >
          Reset Map
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-800">
          <strong>💡 Tip:</strong> Toggle checkboxes to filter bloom intensity areas, then click "Filter Data" to apply.
        </p>
      </div>
    </div>
  );
};

export default MapLegend;
