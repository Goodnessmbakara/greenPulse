// NASA API Integration Utilities

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const EARTHDATA_USERNAME = import.meta.env.VITE_EARTHDATA_USERNAME;
const EARTHDATA_PASSWORD = import.meta.env.VITE_EARTHDATA_PASSWORD;

// NASA GIBS WMS endpoint for real-time satellite imagery
export const GIBS_WMS_URL = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi';

// NASA GIBS Layers - Real satellite data
export const NASA_LAYERS = {
  // MODIS Terra NDVI - Vegetation Health (250m resolution, 8-day composite)
  NDVI: 'MODIS_Terra_NDVI_8Day',
  
  // MODIS Terra Land Surface Temperature (1km resolution, daily)
  TEMPERATURE: 'MODIS_Terra_Land_Surface_Temp_Day',
  
  // MODIS Terra EVI - Enhanced Vegetation Index (250m resolution, 8-day)
  EVI: 'MODIS_Terra_EVI_8Day',
  
  // VIIRS NDVI - More recent high-resolution vegetation data (375m)
  VIIRS_NDVI: 'VIIRS_NOAA20_CorrectedReflectance_TrueColor',
  
  // Landsat True Color - High resolution (30m)
  LANDSAT: 'Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual',
} as const;

// CMR API for searching NASA Earth science data
export const CMR_API_URL = 'https://cmr.earthdata.nasa.gov/search';

/**
 * Fetch MODIS vegetation data from CMR API
 */
export async function fetchMODISData(bbox: number[], dateRange: { start: string; end: string }) {
  const params = new URLSearchParams({
    short_name: 'MOD13Q1', // MODIS Terra Vegetation Indices
    bounding_box: bbox.join(','), // [west, south, east, north]
    temporal: `${dateRange.start}T00:00:00Z,${dateRange.end}T23:59:59Z`,
    page_size: '100',
  });

  try {
    const response = await fetch(`${CMR_API_URL}/granules.json?${params}`);
    const data = await response.json();
    
    if (data.feed?.entry) {
      return data.feed.entry.map((entry: any) => ({
        id: entry.id,
        title: entry.title,
        date: entry.time_start,
        bbox: entry.boxes?.[0],
        downloadUrl: entry.links?.find((l: any) => 
          l.rel === 'http://esipfed.org/ns/fedsearch/1.1/data#'
        )?.href,
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching MODIS data:', error);
    return [];
  }
}

/**
 * Calculate NDVI from red and NIR bands
 * NDVI = (NIR - Red) / (NIR + Red)
 * Values range from -1 to 1, where higher values indicate healthier vegetation
 */
export function calculateNDVI(red: number, nir: number): number {
  if (nir + red === 0) return 0;
  return (nir - red) / (nir + red);
}

/**
 * Interpret NDVI values for bloom detection
 */
export function interpretNDVI(ndvi: number): {
  status: 'peak-bloom' | 'early-bloom' | 'pre-bloom' | 'dormant';
  description: string;
  color: string;
} {
  if (ndvi >= 0.7) {
    return {
      status: 'peak-bloom',
      description: 'Peak vegetation/bloom period',
      color: '#7ED321', // Bright green
    };
  } else if (ndvi >= 0.55) {
    return {
      status: 'early-bloom',
      description: 'Early bloom/active growth',
      color: '#9ACD32', // Yellow-green
    };
  } else if (ndvi >= 0.35) {
    return {
      status: 'pre-bloom',
      description: 'Pre-bloom vegetation',
      color: '#FFD700', // Gold
    };
  } else {
    return {
      status: 'dormant',
      description: 'Dormant/low vegetation',
      color: '#D3D3D3', // Light gray
    };
  }
}

/**
 * Get current date in YYYY-MM-DD format for NASA API
 */
export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get date N days ago in YYYY-MM-DD format
 */
export function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

/**
 * Fetch NASA Earth imagery for a specific location
 */
export async function fetchEarthImagery(lat: number, lon: number, date: string) {
  if (!NASA_API_KEY) {
    console.error('NASA API key not found');
    return null;
  }

  try {
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&api_key=${NASA_API_KEY}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.statusText}`);
    }
    
    return response.url; // Returns the image URL
  } catch (error) {
    console.error('Error fetching Earth imagery:', error);
    return null;
  }
}

/**
 * Regional bounding boxes for demo areas
 */
export const DEMO_REGIONS = {
  NIGERIA: [2.7, 4.3, 14.7, 13.9], // [west, south, east, north]
  INDIA_PUNJAB: [73.9, 29.5, 76.9, 32.5],
  BRAZIL_SAO_PAULO: [-48.5, -24.5, -45.5, -22.5],
  GLOBAL: [-180, -90, 180, 90],
} as const;

/**
 * Get GIBS layer URL for Leaflet TileLayer.WMS
 */
export function getGIBSLayerConfig(layerName: string) {
  return {
    url: GIBS_WMS_URL,
    options: {
      layers: layerName,
      format: 'image/png',
      transparent: true,
      version: '1.3.0',
      attribution: 'NASA EOSDIS GIBS',
    },
  };
}

export { NASA_API_KEY, EARTHDATA_USERNAME, EARTHDATA_PASSWORD };
