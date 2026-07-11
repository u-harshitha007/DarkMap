# DarkMap — Frontend

This is the React frontend for the **DarkMap** crime visualisation platform.

> For the full project documentation, see the [root README](../README.md).

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| React-Leaflet | 5.x | Interactive map components |
| Leaflet.js | 1.9.x | Core mapping engine |
| TailwindCSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── CrimeMap.jsx          # Leaflet map with severity markers
│   │   ├── CrimeFilters.jsx      # Category & severity dropdowns
│   │   ├── DashboardCards.jsx    # Stats summary cards
│   │   └── PageShell.jsx         # Navigation + layout wrapper
│   ├── pages/
│   │   ├── LandingPage.jsx       # Hero / welcome screen
│   │   └── IndiaMapPage.jsx      # Main map dashboard
│   ├── utils/
│   │   └── crimeUtils.js         # API URL, severity colours, helpers
│   ├── App.jsx                   # Router configuration
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── index.html                    # HTML shell
├── vite.config.js                # Vite configuration
└── package.json                  # Dependencies & scripts
```

---

## Getting Started

Make sure the **backend is running first** at `http://localhost:8000`.
See the [Installation Guide](../docs/INSTALLATION.md) for full setup steps.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Pages

| Route | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Hero screen with project tagline |
| `/map` | `IndiaMapPage` | Interactive crime map + dashboard |

---

## Environment

The API base URL is defined in `src/utils/crimeUtils.js`:

```js
export const API_BASE_URL = "http://localhost:8000";
```

Update this value if your backend runs on a different port or host.

---

*Part of the [DarkMap](../README.md) project — Visualizing Crime. Revealing Patterns.*
