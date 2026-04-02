"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { getCategoryMeta } from "@/lib/map/category-meta"
import type { MapReport } from "@/lib/map/map-types"

type ReportsMapProps = {
    reports: MapReport[]
    center?: [number, number]
    zoom?: number
}

const categoryIconCache = new Map<string, L.DivIcon>()

function getCategoryIcon(category: string) {
    const cachedIcon = categoryIconCache.get(category)

    if (cachedIcon) {
        return cachedIcon
    }

    const { color } = getCategoryMeta(category)

    const icon = L.divIcon({
        className: "",
        html: `
            <div style="
                width: 18px;
                height: 18px;
                background: ${color};
                border: 3px solid white;
                border-radius: 9999px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.25);
            "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        popupAnchor: [0, -10],
    })

    categoryIconCache.set(category, icon)

    return icon
}

function FitBounds({ reports }: { reports: MapReport[] }) {
    const map = useMap()

    const coordinatesKey = useMemo(() => {
        return reports
            .map((report) => `${report.id}:${report.lat}:${report.lng}`)
            .join("|")
    }, [reports])

    const positions = useMemo(() => {
        return reports.map(
            (report) => [report.lat, report.lng] as [number, number]
        )
    }, [coordinatesKey])

    useEffect(() => {
        if (positions.length === 0) return

        if (positions.length === 1) {
            map.setView(positions[0], 16)
            return
        }

        const bounds = L.latLngBounds(positions)
        map.fitBounds(bounds, { padding: [40, 40] })
    }, [map, positions])

    return null
}

function getStatusLabel(status: MapReport["status"]) {
    switch (status) {
        case "in_verifica":
            return "In verifica"
        case "presa_in_carico":
            return "Presa in carico"
        case "risolta":
            return "Risolta"
        default:
            return status
    }
}

export function ReportsMap({
    reports,
    center = [37.8108661, 15.1917709],
    zoom = 13,
}: ReportsMapProps) {
    return (
        <div className="h-full w-full">
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom
                className="h-full w-full rounded-[28px]"
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds reports={reports} />

                {reports.map((report) => {
                    const categoryMeta = getCategoryMeta(report.category)

                    return (
                        <Marker
                            key={report.id}
                            position={[report.lat, report.lng]}
                            icon={getCategoryIcon(report.category)}
                        >
                            <Popup>
                                <div className="min-w-55 space-y-2">
                                    <h3 className="text-sm font-semibold">
                                        {report.title}
                                    </h3>

                                    <p className="text-xs text-muted-foreground">
                                        {report.address}
                                    </p>

                                    <div className="text-xs">
                                        <span className="font-medium">
                                            Categoria:
                                        </span>{" "}
                                        {categoryMeta.label}
                                    </div>

                                    <div className="text-xs">
                                        <span className="font-medium">Stato:</span>{" "}
                                        {getStatusLabel(report.status)}
                                    </div>

                                    <Link
                                        href={`/report/${report.id}`}
                                        className="inline-block text-sm font-medium underline"
                                    >
                                        Apri segnalazione
                                    </Link>
                                </div>
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}