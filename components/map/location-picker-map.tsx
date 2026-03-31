"use client"

import { useMemo } from "react"
import L from "leaflet"
import {
    MapContainer,
    Marker,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet"

interface LocationPickerMapProps {
    value: { lat: number; lng: number } | null
    onChange: (coords: { lat: number; lng: number }) => void
}

const selectedIcon = L.divIcon({
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
})

function ClickHandler({
    onChange,
}: {
    onChange: (coords: { lat: number; lng: number }) => void
}) {
    useMapEvents({
        click(event) {
            onChange({
                lat: event.latlng.lat,
                lng: event.latlng.lng,
            })
        },
    })

    return null
}

function RecenterMap({
    value,
}: {
    value: { lat: number; lng: number } | null
}) {
    const map = useMap()

    useMemo(() => {
        if (!value) return
        map.setView([value.lat, value.lng], 16)
    }, [map, value])

    return null
}

export function LocationPickerMap({
    value,
    onChange,
}: LocationPickerMapProps) {
    const center: [number, number] = value
        ? [value.lat, value.lng]
        : [41.9028, 12.4964]

    return (
        <MapContainer
            center={center}
            zoom={15}
            scrollWheelZoom
            className="h-[320px] w-full rounded-[28px]"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler onChange={onChange} />
            <RecenterMap value={value} />

            {value ? (
                <Marker position={[value.lat, value.lng]} icon={selectedIcon} />
            ) : null}
        </MapContainer>
    )
}