import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

import { formatIncidentDate, SEVERITY_COLORS } from "../utils/crimeUtils";

const INDIA_CENTER = [20.5937, 78.9629];
const INDIA_ZOOM = 5;

export default function CrimeMap({ incidents }) {
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

        {incidents.map((incident) => (
          <CircleMarker
            key={incident.id}
            center={[incident.latitude, incident.longitude]}
            radius={10}
            pathOptions={{
              color: SEVERITY_COLORS[incident.severity],
              fillColor: SEVERITY_COLORS[incident.severity],
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-1 text-sm text-zinc-900">
                <p className="font-semibold">{incident.title}</p>
                <p>
                  <span className="font-medium">Category:</span> {incident.category}
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
        ))}
      </MapContainer>
    </div>
  );
}
