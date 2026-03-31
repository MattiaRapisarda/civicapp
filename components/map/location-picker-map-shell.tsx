"use client"

import dynamic from "next/dynamic"

const LocationPickerMap = dynamic(
    () =>
        import("@/components/map/location-picker-map").then(
            (mod) => mod.LocationPickerMap
        ),
    {
        ssr: false,
        loading: () => (
            <div className="h-[320px] w-full animate-pulse rounded-[24px] bg-muted" />
        ),
    }
)

interface LocationPickerMapShellProps {
    value: { lat: number; lng: number } | null
    onChange: (coords: { lat: number; lng: number }) => void
}

export function LocationPickerMapShell(props: LocationPickerMapShellProps) {
    return <LocationPickerMap {...props} />
}