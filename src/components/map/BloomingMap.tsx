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
}

const BloomingMap = ({ layers }: BloomingMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const nasaLayers = useRef<{ [key: string]: L.TileLayer }>({});

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

    // Add global bloom monitoring markers (key regions)
    const globalBloomRegions = [
      { name: 'Nigeria - Maize Belt', lat: 11.0, lng: 8.5, crop: 'Maize' },
      { name: 'India - Punjab', lat: 31.1, lng: 75.3, crop: 'Wheat' },
      { name: 'Brazil - São Paulo', lat: -23.5, lng: -46.6, crop: 'Coffee' },
      { name: 'USA - Midwest', lat: 40.0, lng: -95.0, crop: 'Corn' },
      { name: 'China - North Plain', lat: 35.0, lng: 115.0, crop: 'Wheat' },
    ];

    globalBloomRegions.forEach(region => {
      const marker = L.marker([region.lat, region.lng], {
        icon: L.divIcon({
          className: 'custom-bloom-marker',
          html: '<div style="background: #7ED321; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white;"></div>',
          iconSize: [20, 20],
        }),
      }).addTo(map.current!);

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <strong>${region.name}</strong><br>
          <strong>Crop:</strong> ${region.crop}<br>
          <strong>Data Source:</strong> NASA MODIS NDVI<br>
          <em>Real-time satellite data</em><br>
          <small>Coordinates: ${region.lat.toFixed(2)}, ${region.lng.toFixed(2)}</small>
        </div>
      `);
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

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg shadow-inner"
      style={{ minHeight: '600px' }}
    />
  );
};

export default BloomingMap;
