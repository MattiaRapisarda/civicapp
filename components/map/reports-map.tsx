"use client"

import { useEffect } from "react"
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

function createCategoryIcon(category: string) {
    const { color } = getCategoryMeta(category)

    return L.divIcon({
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
}

function FitBounds({ reports }: { reports: MapReport[] }) {
    const map = useMap()

    useEffect(() => {
        if (reports.length === 0) return

        if (reports.length === 1) {
            map.setView([reports[0].lat, reports[0].lng], 16)
            return
        }

        const bounds = L.latLngBounds(
            reports.map((report) => [report.lat, report.lng] as [number, number])
        )

        map.fitBounds(bounds, { padding: [40, 40] })
    }, [map, reports])

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
                            icon={createCategoryIcon(report.category)}
                        >
                            <Popup>
                                <div className="min-w-[220px] space-y-2">
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