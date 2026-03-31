"use client"

import dynamic from "next/dynamic"

const ReportLocationPreviewMap = dynamic(
    () => import("@/components/map/report-location-preview-map"),
    {
        ssr: false,
        loading: () => (
            <div className="h-55 w-full animate-pulse rounded-[24px] bg-muted" />
        ),
    }
)

interface ReportLocationPreviewMapShellProps {
    title: string
    address: string
    lat: number
    lng: number
}

export function ReportLocationPreviewMapShell(
    props: ReportLocationPreviewMapShellProps
) {
    return <ReportLocationPreviewMap {...props} />
}