import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface BloomingMapProps {
  layers: {
    temperature: boolean;
    precipitation: boolean;
    soilMoisture: boolean;
  };
}

const BloomingMap = ({ layers }: BloomingMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Nigeria
    map.current = L.map(mapContainer.current).setView([9.0820, 8.6753], 6);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Simulated blooming data hotspots (representing NASA MODIS/Landsat data)
    const bloomingHotspots = [
      // High blooming areas (Northern regions)
      { lat: 12.5, lng: 7.5, intensity: 'high', radius: 80000 },
      { lat: 11.8, lng: 8.8, intensity: 'high', radius: 60000 },
      { lat: 10.5, lng: 9.5, intensity: 'high', radius: 70000 },
      
      // Medium blooming areas (Central regions)
      { lat: 9.5, lng: 7.5, intensity: 'medium', radius: 50000 },
      { lat: 8.5, lng: 9.0, intensity: 'medium', radius: 55000 },
      { lat: 7.5, lng: 8.5, intensity: 'medium', radius: 45000 },
      
      // Low/emerging blooming areas (Southern regions)
      { lat: 6.5, lng: 3.5, intensity: 'low', radius: 40000 },
      { lat: 5.5, lng: 7.0, intensity: 'low', radius: 35000 },
      { lat: 4.8, lng: 6.5, intensity: 'low', radius: 30000 },
    ];

    // Add blooming hotspot circles
    bloomingHotspots.forEach(spot => {
      const color = spot.intensity === 'high' 
        ? '#7ED321' 
        : spot.intensity === 'medium' 
        ? 'rgba(126, 211, 33, 0.5)' 
        : '#d3d3d3';
      
      const circle = L.circle([spot.lat, spot.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.6,
        radius: spot.radius,
      }).addTo(map.current!);

      circle.bindPopup(`
        <strong>Blooming Intensity: ${spot.intensity.toUpperCase()}</strong><br>
        Coordinates: ${spot.lat.toFixed(2)}, ${spot.lng.toFixed(2)}<br>
        Data Source: NASA MODIS/Landsat
      `);
    });

    // Add Nigeria boundary marker
    const nigeriaCoords: [number, number][] = [
      [13.892, 3.478], [13.892, 14.680],
      [4.277, 14.680], [4.277, 3.478], [13.892, 3.478]
    ];
    
    L.polygon(nigeriaCoords, {
      color: '#333',
      weight: 2,
      fillOpacity: 0,
    }).addTo(map.current!);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update overlays based on layer selection
  useEffect(() => {
    if (!map.current) return;

    // In a real implementation, you would add/remove actual data layers here
    console.log('Active layers:', layers);
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
