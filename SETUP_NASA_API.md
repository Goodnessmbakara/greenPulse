# NASA API Setup Guide

## Quick Start - Get Your NASA API Key

Your `.env` file is already created, but you need to add your actual NASA API key.

### Step 1: Get NASA API Key (2 minutes)

1. **Visit:** https://api.nasa.gov/
2. **Fill out the form:**
   - First Name
   - Last Name
   - Email address
3. **Click "Signup"**
4. **Check your email** - You'll receive your API key instantly

### Step 2: Update .env File

Open `/Users/abba/Desktop/greenPulse/.env` and replace `your_api_key_here` with your actual key:

```env
VITE_NASA_API_KEY=YOUR_ACTUAL_KEY_HERE
VITE_EARTHDATA_USERNAME=goodnessmbakara
VITE_EARTHDATA_PASSWORD=MISSERUN123a#
```

**Example:**
```env
VITE_NASA_API_KEY=abc123xyz789yourActualKey456def
VITE_EARTHDATA_USERNAME=goodnessmbakara
VITE_EARTHDATA_PASSWORD=MISSERUN123a#
```

### Step 3: Restart Dev Server

After updating the `.env` file:

```bash
# Stop the server if running (Ctrl+C)
# Then restart:
pnpm dev
```

---

## What's Already Working (No API Key Needed!)

✅ **NASA GIBS Layers** - These work WITHOUT an API key:
- MODIS NDVI (Vegetation)
- MODIS Temperature
- MODIS EVI (Enhanced Vegetation)

These are the **main layers** you'll use for the hackathon demo! They pull real-time satellite data from NASA EOSDIS GIBS.

---

## What Requires NASA API Key

The following features need the API key (optional for demo):
- NASA Earth Imagery API (high-res location-specific images)
- NASA EONET (Earth Observatory Natural Event Tracker)
- Additional NASA APIs

**For the hackathon demo, you can proceed without the API key** since GIBS layers (the most important ones) work without authentication!

---

## Testing Your Integration

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Navigate to:** http://localhost:8080/map

3. **You should see:**
   - ✅ Global map with NASA satellite layers
   - ✅ Layer control in top-right (toggle NDVI, Temperature, EVI)
   - ✅ Bloom markers for key regions (Nigeria, India, Brazil, USA, China)
   - ✅ Real-time NASA MODIS data overlay

4. **Test the layers:**
   - Check "Vegetation (NDVI)" in the layer control
   - You should see colorful satellite imagery overlay
   - Try toggling different layers

---

## Troubleshooting

### GIBS Layers Not Showing?

**Check browser console** (F12 → Console tab):
- Look for error messages about CORS or WMS
- NASA GIBS should work without errors

**Common fixes:**
- Clear browser cache
- Try a different zoom level (zoom in/out)
- Check internet connection
- Verify GIBS service status: https://status.earthdata.nasa.gov/

### Environment Variables Not Loading?

**Restart dev server** after changing `.env`:
```bash
# Kill the server (Ctrl+C)
pnpm dev
```

**Verify env vars in browser console:**
```javascript
// In browser console, type:
console.log(import.meta.env.VITE_NASA_API_KEY)
// Should show your key, not undefined
```

---

## Alternative: NASA Earthdata Login (Optional)

For downloading actual MODIS/Landsat datasets (not needed for demo):

1. **Visit:** https://urs.earthdata.nasa.gov/
2. **Create free account**
3. **Use for:**
   - Downloading raw satellite data
   - Accessing NASA archives
   - CMR API authenticated requests

**Note:** Your Earthdata credentials are already in `.env`, but you may need to create the account at the link above.

---

## What You Have Now

✅ **Live NASA GIBS Integration:**
- Real MODIS Terra NDVI layer (vegetation/bloom tracking)
- Real MODIS Terra Temperature layer
- Real MODIS Terra EVI layer
- Global coverage, updated every 8 days

✅ **Interactive Map:**
- Leaflet-based with layer controls
- Bloom markers for 5 key global regions
- Toggle layers on/off in real-time

✅ **No Mock Data:**
- All layers pull live satellite imagery from NASA
- Real-time Earth observation data
- Production-ready for demo

---

## Next Steps for Hackathon

Your live NASA integration is **ready to demo!** Here's what you can show:

1. **Open the map page** - http://localhost:8080/map
2. **Toggle NDVI layer** - Show real vegetation data
3. **Click bloom markers** - Show regional information
4. **Explain the data:**
   - "This is real MODIS satellite data from NASA"
   - "250m resolution, updated every 8 days"
   - "Tracks vegetation health globally for bloom prediction"

**Your demo will use 100% live NASA data - no mocks!** 🚀

---

## Quick Test Checklist

Run through this before your demo:

- [ ] Dev server running: `pnpm dev`
- [ ] Navigate to map page: http://localhost:8080/map
- [ ] NDVI layer toggles on/off
- [ ] Temperature layer toggles on/off
- [ ] EVI layer toggles on/off
- [ ] Markers clickable with popups
- [ ] No console errors (F12)
- [ ] Map loads within 2-3 seconds

If all checkboxes pass, you're **demo-ready!** ✅

---

**Created:** October 5, 2025  
**Status:** NASA GIBS Live Integration Complete  
**Demo Status:** READY 🚀
