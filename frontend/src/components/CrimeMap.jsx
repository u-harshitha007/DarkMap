import { useEffect, useRef } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";

import { formatIncidentDate, SEVERITY_COLORS } from "../utils/crimeUtils";

const INDIA_CENTER = [20.5937, 78.9629];
const INDIA_ZOOM = 5;
const FOCUS_ZOOM = 13;

// ---------------------------------------------------------------------------
// MapFlyController
// Must live inside MapContainer to access the Leaflet map instance via useMap.
// Flies to focusTarget when it changes; resets to India overview when null.
// ---------------------------------------------------------------------------
function MapFlyController({ focusTarget }) {
  const map = useMap();

  useEffect(() => {
    if (focusTarget) {
      map.flyTo([focusTarget.lat, focusTarget.lng], FOCUS_ZOOM, {
        animate: true,
        duration: 1.2,
      });
    } else {
      map.flyTo(INDIA_CENTER, INDIA_ZOOM, {
        animate: true,
        duration: 1.0,
      });
    }
  }, [focusTarget, map]);

  return null;
}

// ---------------------------------------------------------------------------
// CrimeMap
// Props:
//   incidents   — array of incident objects to render as markers
//   focusTarget — { id, lat, lng } of the incident to highlight, or null
// ---------------------------------------------------------------------------
export default function CrimeMap({ incidents, focusTarget }) {
  // Keep one ref per marker so we can open the focused marker's popup
  const markerRefs = useRef({});

  // Open the popup on the focused marker after fly animation settles
  useEffect(() => {
    if (!focusTarget) return;

    const timer = setTimeout(() => {
      markerRefs.current[focusTarget.id]?.openPopup();
    }, 1300); // slightly longer than flyTo duration (1200 ms)

    return () => clearTimeout(timer);
  }, [focusTarget]);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 shadow-lg shadow-black/20">
      <MapContainer
        center={INDIA_CENTER}
        zoom={INDIA_ZOOM}
        scrollWheelZoom
        className="h-[520px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Imperative fly/reset controller */}
        <MapFlyController focusTarget={focusTarget} />

        {incidents.map((incident) => {
          const isFocused = focusTarget?.id === incident.id;
          const baseColor = SEVERITY_COLORS[incident.severity];

          return (
            <CircleMarker
              key={incident.id}
              ref={(ref) => {
                if (ref) markerRefs.current[incident.id] = ref;
              }}
              center={[incident.latitude, incident.longitude]}
              radius={isFocused ? 14 : 10}
              pathOptions={{
                color: isFocused ? "#ffffff" : baseColor,
                fillColor: baseColor,
                fillOpacity: isFocused ? 1 : 0.85,
                weight: isFocused ? 3 : 2,
              }}
            >
              <Popup>
                <div className="space-y-1 text-sm text-zinc-900">
                  <p className="font-semibold">{incident.title}</p>
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {incident.category}
                  </p>
                  <p>
                    <span className="font-medium">Severity:</span>{" "}
                    <span className="capitalize">{incident.severity}</span>
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {formatIncidentDate(incident.incident_date)}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
