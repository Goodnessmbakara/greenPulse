# GreenPulse

A climate-resilient platform leveraging NASA Earth observation data to track and predict flowering events globally. GreenPulse addresses disruptions caused by climate change, such as irregular blooming leading to reduced agricultural yields, ecosystem imbalances, and challenges in pollination and pest management.

## Overview

GreenPulse empowers farmers and researchers with actionable insights while supporting broader climate studies. The platform provides an interactive global map showing bloom hotspots by region and crop/plant type, predictive alerts, and multi-language support including optional SMS for rural farmers.

## Features

- **Interactive Global Map**: View flowering hotspots across different regions and plant types
- **Predictive Alerts**: Get notified about upcoming bloom events and optimal timing for harvests
- **NASA Data Integration**: Leverages MODIS, Landsat, and VIIRS satellite data
- **Multi-language Support**: Accessible to users worldwide in their native languages
- **SMS Alerts**: Reach rural farmers without reliable internet access
- **Climate Research Tools**: Data exports and analytics for researchers studying ecosystem shifts

## Technology Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui with Tailwind CSS
- **Maps**: Leaflet and React Leaflet
- **Data Sources**: NASA Earth observation data (MODIS, Landsat, VIIRS)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd greenPulse
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
pnpm build
```

## Project Structure

```
greenPulse/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── assets/         # Images and static assets
├── public/             # Public static files
└── docs/               # Documentation including PRD
```

## Documentation

For detailed product requirements and technical specifications, see [PRD.md](./PRD.md).

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is built for the NASA Space Apps Challenge 2025.

## Acknowledgments

- NASA Earth Science Data for providing open satellite observation data
- All contributors and researchers supporting climate-resilient agriculture

## Contact

For questions or feedback, please open an issue in this repository.