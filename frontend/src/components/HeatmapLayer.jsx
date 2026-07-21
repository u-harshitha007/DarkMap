import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import "leaflet.heat";

/**
 * HeatmapLayer
 * Renders a Leaflet.heat layer inside the existing MapContainer.
 * Must be a child of MapContainer to access the map via useMap().
 *
 * Props:
 *   incidents — array of incident objects (latitude, longitude, severity)
 *   visible   — boolean; mounts/unmounts the layer without remounting the map
 *
 * Intensity is weighted by severity: high=1.0, medium=0.6, low=0.3
 */

const SEVERITY_INTENSITY = {
  high: 1.0,
  medium: 0.6,
  low: 0.3,
};

export default function HeatmapLayer({ incidents, visible }) {
  const map = useMap();
  const heatRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      if (heatRef.current) {
        map.removeLayer(heatRef.current);
        heatRef.current = null;
      }
      return;
    }

    // Build [lat, lng, intensity] points
    const points = incidents.map((incident) => [
      incident.latitude,
      incident.longitude,
      SEVERITY_INTENSITY[incident.severity] ?? 0.5,
    ]);

    if (heatRef.current) {
      // Layer already exists — update data in place
      heatRef.current.setLatLngs(points);
    } else {
      // Create the layer fresh
      heatRef.current = window.L.heatLayer(points, {
        radius: 35,
        blur: 25,
        maxZoom: 10,
        max: 1.0,
        gradient: {
          0.3: "#22c55e",  // green  — low intensity
          0.6: "#f97316",  // amber  — medium intensity
          1.0: "#ef4444",  // red    — high intensity
        },
      }).addTo(map);
    }

    return () => {
      if (heatRef.current) {
        map.removeLayer(heatRef.current);
        heatRef.current = null;
      }
    };
  }, [incidents, visible, map]);

  return null;
}
