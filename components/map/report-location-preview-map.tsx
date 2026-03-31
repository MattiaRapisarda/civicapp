"use client"

import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

interface ReportLocationPreviewMapProps {
    title: string
    address: string
    lat: number
    lng: number
}

const reportPinIcon = L.divIcon({
    className: "",
    html: `
        <div style="
            width: 20px;
            height: 20px;
            background: #2563eb;
            border: 3px solid white;
            border-radius: 9999px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.25);
        "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
})

export default function ReportLocationPreviewMap({
    title,
    address,
    lat,
    lng,
}: ReportLocationPreviewMapProps) {
    return (
        <MapContainer
            center={[lat, lng]}
            zoom={16}
            scrollWheelZoom={false}
            className="h-[220px] w-full"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[lat, lng]} icon={reportPinIcon}>
                <Popup>
                    <div className="min-w-[180px] space-y-1">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground">{address}</p>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    )
}