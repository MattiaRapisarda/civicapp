"use client"

import { useEffect } from "react"
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

const DEFAULT_MAP_CENTER: [number, number] = [37.821522, 15.2263429]
const DEFAULT_MAP_ZOOM = 15

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

function SyncView({
    value,
}: {
    value: { lat: number; lng: number } | null
}) {
    const map = useMap()

    useEffect(() => {
        if (!value) return
        map.flyTo([value.lat, value.lng], 16, { duration: 0.8 })
    }, [map, value])

    return null
}

export function LocationPickerMap({
    value,
    onChange,
}: LocationPickerMapProps) {
    const initialCenter: [number, number] = value
        ? [value.lat, value.lng]
        : DEFAULT_MAP_CENTER

    return (
        <MapContainer
            center={initialCenter}
            zoom={DEFAULT_MAP_ZOOM}
            scrollWheelZoom
            className="h-80 w-full"
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <ClickHandler onChange={onChange} />
            <SyncView value={value} />

            {value ? (
                <Marker position={[value.lat, value.lng]} icon={selectedIcon} />
            ) : null}
        </MapContainer>
    )
}