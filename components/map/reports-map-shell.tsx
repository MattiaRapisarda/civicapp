"use client"

import dynamic from "next/dynamic"
import type { MapReport } from "@/lib/map/map-types"

const ReportsMap = dynamic(
    () => import("@/components/map/reports-map").then((mod) => mod.ReportsMap),
    {
        ssr: false,
        loading: () => (
            <div className="h-full w-full animate-pulse rounded-[28px] bg-muted" />
        ),
    }
)

type ReportsMapShellProps = {
    reports: MapReport[]
    center?: [number, number]
    zoom?: number
}

export function ReportsMapShell({
    reports,
    center,
    zoom,
}: ReportsMapShellProps) {
    return (
        <div className="h-full w-full">
            <ReportsMap reports={reports} center={center} zoom={zoom} />
        </div>
    )
}