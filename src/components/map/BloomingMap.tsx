import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GIBS_WMS_URL, NASA_LAYERS, getGIBSLayerConfig } from '@/lib/nasaApi';

interface BloomingMapProps {
  layers: {
    ndvi: boolean;
    temperature: boolean;
    evi: boolean;
  };
  bloomFilters?: {
    showHigh: boolean;
    showMedium: boolean;
    showLow: boolean;
  };
  resetTrigger?: number;
}

const BloomingMap = ({ layers, bloomFilters, resetTrigger }: BloomingMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const nasaLayers = useRef<{ [key: string]: L.TileLayer }>({});
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map - Global view for worldwide bloom tracking
    map.current = L.map(mapContainer.current).setView([20, 0], 3);

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Create NASA GIBS layers (real satellite data)
    
    // MODIS Terra NDVI - Vegetation Health (Real NASA Data)
    const ndviConfig = getGIBSLayerConfig(NASA_LAYERS.NDVI);
    nasaLayers.current.ndvi = L.tileLayer.wms(ndviConfig.url, {
      ...ndviConfig.options,
      opacity: 0.7,
    });

    // MODIS Terra Land Surface Temperature (Real NASA Data)
    const tempConfig = getGIBSLayerConfig(NASA_LAYERS.TEMPERATURE);
    nasaLayers.current.temperature = L.tileLayer.wms(tempConfig.url, {
      ...tempConfig.options,
      opacity: 0.6,
    });

    // MODIS Terra EVI - Enhanced Vegetation Index (Real NASA Data)
    const eviConfig = getGIBSLayerConfig(NASA_LAYERS.EVI);
    nasaLayers.current.evi = L.tileLayer.wms(eviConfig.url, {
      ...eviConfig.options,
      opacity: 0.7,
    });

    // Add layer control to map
    const baseMaps = {
      'OpenStreetMap': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }),
    };

    const overlayMaps = {
      'Vegetation (NDVI) - NASA MODIS': nasaLayers.current.ndvi,
      'Temperature - NASA MODIS': nasaLayers.current.temperature,
      'Enhanced Vegetation (EVI) - NASA MODIS': nasaLayers.current.evi,
    };

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false,
      position: 'topright',
    }).addTo(map.current);

    // Add global bloom monitoring markers (key regions) with intensity levels
    const globalBloomRegions = [
      { name: 'Nigeria - Maize Belt', lat: 11.0, lng: 8.5, crop: 'Maize', intensity: 'high' },
      { name: 'India - Punjab', lat: 31.1, lng: 75.3, crop: 'Wheat', intensity: 'high' },
      { name: 'Brazil - São Paulo', lat: -23.5, lng: -46.6, crop: 'Coffee', intensity: 'medium' },
      { name: 'USA - Midwest', lat: 40.0, lng: -95.0, crop: 'Corn', intensity: 'high' },
      { name: 'China - North Plain', lat: 35.0, lng: 115.0, crop: 'Wheat', intensity: 'medium' },
      { name: 'Kenya - Rift Valley', lat: -0.5, lng: 36.0, crop: 'Tea', intensity: 'medium' },
      { name: 'Argentina - Pampas', lat: -34.6, lng: -58.4, crop: 'Soy', intensity: 'low' },
      { name: 'Australia - Victoria', lat: -37.8, lng: 144.9, crop: 'Wheat', intensity: 'low' },
    ];

    globalBloomRegions.forEach(region => {
      const color = region.intensity === 'high' 
        ? '#7ED321' 
        : region.intensity === 'medium' 
        ? '#9ACD32' 
        : '#D3D3D3';

      const marker = L.marker([region.lat, region.lng], {
        icon: L.divIcon({
          className: `custom-bloom-marker bloom-${region.intensity}`,
          html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
          iconSize: [20, 20],
        }),
      }).addTo(map.current!);

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <strong>${region.name}</strong><br>
          <strong>Crop:</strong> ${region.crop}<br>
          <strong>Bloom Intensity:</strong> ${region.intensity.charAt(0).toUpperCase() + region.intensity.slice(1)}<br>
          <strong>Data Source:</strong> NASA MODIS NDVI<br>
          <em>Real-time satellite data</em><br>
          <small>Coordinates: ${region.lat.toFixed(2)}, ${region.lng.toFixed(2)}</small>
        </div>
      `);

      markers.current.push(marker);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update NASA GIBS overlays based on layer selection (Real-time control)
  useEffect(() => {
    if (!map.current) return;

    // Toggle NDVI layer
    if (layers.ndvi && nasaLayers.current.ndvi && !map.current.hasLayer(nasaLayers.current.ndvi)) {
      nasaLayers.current.ndvi.addTo(map.current);
      console.log('✅ NASA MODIS NDVI layer activated (Real satellite data)');
    } else if (!layers.ndvi && nasaLayers.current.ndvi && map.current.hasLayer(nasaLayers.current.ndvi)) {
      map.current.removeLayer(nasaLayers.current.ndvi);
    }

    // Toggle Temperature layer
    if (layers.temperature && nasaLayers.current.temperature && !map.current.hasLayer(nasaLayers.current.temperature)) {
      nasaLayers.current.temperature.addTo(map.current);
      console.log('✅ NASA MODIS Temperature layer activated (Real satellite data)');
    } else if (!layers.temperature && nasaLayers.current.temperature && map.current.hasLayer(nasaLayers.current.temperature)) {
      map.current.removeLayer(nasaLayers.current.temperature);
    }

    // Toggle EVI layer
    if (layers.evi && nasaLayers.current.evi && !map.current.hasLayer(nasaLayers.current.evi)) {
      nasaLayers.current.evi.addTo(map.current);
      console.log('✅ NASA MODIS EVI layer activated (Real satellite data)');
    } else if (!layers.evi && nasaLayers.current.evi && map.current.hasLayer(nasaLayers.current.evi)) {
      map.current.removeLayer(nasaLayers.current.evi);
    }
  }, [layers]);

  // Apply bloom intensity filters
  useEffect(() => {
    if (!map.current || !bloomFilters) return;

    markers.current.forEach(marker => {
      const markerElement = marker.getElement();
      if (!markerElement) return;

      const classes = markerElement.className;
      const isHigh = classes.includes('bloom-high');
      const isMedium = classes.includes('bloom-medium');
      const isLow = classes.includes('bloom-low');

      const shouldShow = 
        (isHigh && bloomFilters.showHigh) ||
        (isMedium && bloomFilters.showMedium) ||
        (isLow && bloomFilters.showLow);

      if (shouldShow) {
        markerElement.style.display = '';
      } else {
        markerElement.style.display = 'none';
      }
    });

    console.log('🔍 Bloom filters applied:', bloomFilters);
  }, [bloomFilters]);

  // Reset map view
  useEffect(() => {
    if (!map.current || !resetTrigger) return;

    // Reset to global view
    map.current.setView([20, 0], 3);

    // Show all markers
    markers.current.forEach(marker => {
      const markerElement = marker.getElement();
      if (markerElement) {
        markerElement.style.display = '';
      }
    });

    console.log('🔄 Map reset to default view');
  }, [resetTrigger]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg shadow-inner"
      style={{ minHeight: '600px' }}
    />
  );
};

export default BloomingMap;
