# NASA Integration Guide for GreenPulse

## NASA Space Apps Challenge 2025 Context

**Event Dates:** October 4-5, 2025  
**Theme:** Learn, Launch, Lead  
**Challenge URL:** [NASA Space Apps 2025](https://www.spaceappschallenge.org/2025/)  
**Local Event:** [Tigbo Ilu Event](https://www.spaceappschallenge.org/2025/local-events/tigbo-ilu/)

## Project Alignment

GreenPulse aligns with the NASA Space Apps Challenge by:
- Leveraging NASA Earth observation data (MODIS, Landsat, VIIRS)
- Addressing climate change impacts on agriculture and ecosystems
- Using open data to create actionable insights for farmers and researchers
- Supporting Earth science and agricultural applications

---

## NASA Tools & APIs Required

### 1. **NASA Open APIs**
**Purpose:** Access to various NASA datasets including Earth observation data

**Key Endpoints:**
- **Base URL:** `https://api.nasa.gov/`
- **Registration:** [Get API Key](https://api.nasa.gov/)

**Relevant APIs for GreenPulse:**
- Earth API - Access to Landsat imagery
- EONET (Earth Observatory Natural Event Tracker) - Natural events tracking
- Satellite Situation Center API

**Authentication:**
```javascript
// Example request with API key
const NASA_API_KEY = 'YOUR_API_KEY_HERE';
const url = `https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2024-01-01&api_key=${NASA_API_KEY}`;
```

---

### 2. **NASA EOSDIS (Earth Observing System Data and Information System)**
**Purpose:** Access to comprehensive Earth science data from NASA satellites

**Components:**
- **LAADS DAAC** - Level-1 and Atmosphere Archive & Distribution System
- **LP DAAC** - Land Processes Distributed Active Archive Center
- **ORNL DAAC** - Oak Ridge National Laboratory

**Key Data Products for GreenPulse:**
- MODIS Vegetation Indices (NDVI, EVI)
- Landsat Surface Reflectance
- VIIRS Vegetation Index

**Access Methods:**
1. **Earthdata Search Portal:** [https://search.earthdata.nasa.gov/](https://search.earthdata.nasa.gov/)
2. **Direct Data Access:** Requires Earthdata Login
3. **API Access:** CMR (Common Metadata Repository) API

**Registration Required:**
- Create free Earthdata Login account at [https://urs.earthdata.nasa.gov/](https://urs.earthdata.nasa.gov/)

---

### 3. **NASA GIBS (Global Imagery Browse Services)**
**Purpose:** Fast access to over 600+ satellite imagery products via web services

**Key Features:**
- Near real-time imagery
- WMTS (Web Map Tile Service) standard
- Perfect for Leaflet integration
- No authentication required for basic access

**GIBS Endpoints:**
```
Base WMTS URL: https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi
Base WMS URL: https://gibs.earthdata.nasa.gov/wms/epsg4326/best/
```

**Critical Layers for GreenPulse:**

1. **MODIS Terra NDVI (Vegetation Index)**
   - Layer Name: `MODIS_Terra_NDVI_8Day`
   - Update Frequency: 8-day composite
   - Resolution: 250m
   - Use Case: Track vegetation health and flowering patterns

2. **MODIS Terra Land Surface Temperature**
   - Layer Name: `MODIS_Terra_Land_Surface_Temp_Day`
   - Update Frequency: Daily
   - Use Case: Temperature correlation with bloom events

3. **VIIRS NDVI**
   - Layer Name: `VIIRS_NOAA20_Vegetation_Index_NDVI`
   - Resolution: 375m
   - Use Case: More recent high-resolution vegetation data

4. **Landsat 8/9 True Color**
   - Layer Name: `Landsat_WELD_CorrectedReflectance_TrueColor_Global_Annual`
   - Resolution: 30m
   - Use Case: High-resolution imagery for detailed analysis

**Example GIBS Integration with Leaflet:**
```javascript
// Add MODIS NDVI layer
const ndviLayer = L.tileLayer.wms(
  'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/',
  {
    layers: 'MODIS_Terra_NDVI_8Day',
    format: 'image/png',
    transparent: true,
    attribution: 'NASA EOSDIS GIBS'
  }
);

// Add to map
ndviLayer.addTo(map);
```

**GIBS Documentation:**
- [GIBS Available Products](https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+Available+Imagery+Products)
- [GIBS API for Developers](https://wiki.earthdata.nasa.gov/display/GIBS/GIBS+API+for+Developers)

---

### 4. **NASA Worldview**
**Purpose:** Interactive interface for visualizing satellite imagery

**URL:** [https://worldview.earthdata.nasa.gov/](https://worldview.earthdata.nasa.gov/)

**Use Cases:**
- Visual exploration of available layers
- Testing layer combinations
- Identifying optimal visualization parameters
- Generating shareable links with specific views

**Integration Approach:**
- Use Worldview to identify useful layers
- Extract layer IDs and parameters
- Implement same layers in GreenPulse using GIBS

---

### 5. **NASA Earthdata Search**
**Purpose:** Search and download Earth science data

**URL:** [https://search.earthdata.nasa.gov/](https://search.earthdata.nasa.gov/)

**Key Datasets for GreenPulse:**

1. **MODIS/Terra Vegetation Indices (MOD13Q1)**
   - Product ID: MOD13Q1
   - Resolution: 250m
   - Frequency: 16-day composite
   - Parameters: NDVI, EVI, Quality flags

2. **Landsat 8/9 Surface Reflectance**
   - Product ID: LC08_L2SP, LC09_L2SP
   - Resolution: 30m
   - Frequency: 16-day revisit
   - Bands: Multiple spectral bands for vegetation analysis

3. **VIIRS Vegetation Indices**
   - Product ID: VNP13A1
   - Resolution: 500m
   - Frequency: 16-day composite

**Data Download Methods:**
- Manual download via Search interface
- Bulk download using NASA's Data Download Tool
- Programmatic access via CMR API

---

### 6. **CMR (Common Metadata Repository) API**
**Purpose:** Programmatic search and access to NASA Earth science data

**Base URL:** `https://cmr.earthdata.nasa.gov/search/`

**Example Search Query:**
```javascript
// Search for MODIS vegetation data
const searchUrl = 'https://cmr.earthdata.nasa.gov/search/granules.json';
const params = {
  short_name: 'MOD13Q1',
  temporal: '2024-01-01T00:00:00Z,2024-12-31T23:59:59Z',
  bounding_box: '-180,-90,180,90', // Global coverage
  page_size: 10
};

const response = await fetch(`${searchUrl}?${new URLSearchParams(params)}`);
const data = await response.json();
```

**Documentation:** [CMR API Documentation](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html)

---

### 7. **Additional Weather Data Sources**
**Purpose:** Supplement NASA data with weather information for better predictions

**OpenWeatherMap API (Recommended)**
- **URL:** [https://openweathermap.org/api](https://openweathermap.org/api)
- **Free Tier:** 1,000 calls/day
- **Data:** Temperature, precipitation, humidity
- **Use Case:** Correlate weather patterns with bloom predictions

---

## Code Examples

### 1. Leaflet Map with NASA GIBS Layers

```javascript
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Initialize map
const map = L.map('map').setView([0, 0], 3);

// Base layer - OpenStreetMap
const baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// NASA GIBS - MODIS NDVI
const ndviLayer = L.tileLayer.wms(
  'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/',
  {
    layers: 'MODIS_Terra_NDVI_8Day',
    format: 'image/png',
    transparent: true,
    attribution: 'NASA EOSDIS GIBS'
  }
);

// NASA GIBS - Land Surface Temperature
const tempLayer = L.tileLayer.wms(
  'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/',
  {
    layers: 'MODIS_Terra_Land_Surface_Temp_Day',
    format: 'image/png',
    transparent: true,
    attribution: 'NASA EOSDIS GIBS'
  }
);

// Layer control
const overlays = {
  'Vegetation (NDVI)': ndviLayer,
  'Temperature': tempLayer
};

L.control.layers({}, overlays, { collapsed: false }).addTo(map);

// Add NDVI by default
ndviLayer.addTo(map);
```

### 2. Fetch NASA Data via CMR API

```javascript
async function fetchMODISData(bbox, dateRange) {
  const baseUrl = 'https://cmr.earthdata.nasa.gov/search/granules.json';
  
  const params = new URLSearchParams({
    short_name: 'MOD13Q1', // MODIS Vegetation Indices
    bounding_box: bbox.join(','), // [west, south, east, north]
    temporal: `${dateRange.start}T00:00:00Z,${dateRange.end}T23:59:59Z`,
    page_size: 100
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    const data = await response.json();
    
    return data.feed.entry.map(entry => ({
      id: entry.id,
      title: entry.title,
      date: entry.time_start,
      downloadUrl: entry.links.find(l => l.rel === 'http://esipfed.org/ns/fedsearch/1.1/data#')?.href
    }));
  } catch (error) {
    console.error('Error fetching MODIS data:', error);
    return [];
  }
}

// Usage
const nigeriaBox = [2.7, 4.3, 14.7, 13.9]; // [west, south, east, north]
const dateRange = { start: '2024-01-01', end: '2024-12-31' };

const modisData = await fetchMODISData(nigeriaBox, dateRange);
console.log('Found', modisData.length, 'MODIS granules');
```

---

## Resources & Documentation

### Official NASA Resources
- [NASA Space Apps Challenge](https://www.spaceappschallenge.org/2025/)
- [NASA Open APIs](https://api.nasa.gov/)
- [NASA Earthdata](https://www.earthdata.nasa.gov/)
- [GIBS Documentation](https://wiki.earthdata.nasa.gov/display/GIBS)
- [CMR API Docs](https://cmr.earthdata.nasa.gov/search/site/docs/search/api.html)
- [NASA Worldview](https://worldview.earthdata.nasa.gov/)

### Technical Documentation
- [Leaflet Documentation](https://leafletjs.com/)
- [Leaflet WMS Tutorial](https://leafletjs.com/examples/wms/wms.html)
- [MODIS Vegetation Index User Guide](https://lpdaac.usgs.gov/products/mod13q1v006/)
- [Landsat Surface Reflectance Guide](https://www.usgs.gov/landsat-missions/landsat-surface-reflectance)

---

*Last Updated: October 5, 2025*  
*For GreenPulse - NASA Space Apps Challenge 2025*