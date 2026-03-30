import type { Report } from "@/components/home/report-card"
import { formatRelativeDate } from "@/lib/utils/date"

type ReportListItem = {
    id: string
    title: string
    description: string
    category: string
    status: "in_verifica" | "presa_in_carico" | "conclusa"
    location: string
    address: string
    lat: number
    lng: number
    created_at: string
    updated_at: string
    reporter_id: string
    report_images: {
        image_url: string
        is_cover: boolean
    }[]
    report_supports: {
        user_id: string
    }[]
}

export function mapReportToCard(report: ReportListItem): Report {
    const coverImage =
        report.report_images.find((image) => image.is_cover)?.image_url ??
        "/placeholder.jpg"

    return {
        id: report.id,
        title: report.title,
        location: report.location,
        status: report.status,
        updatedAtLabel: formatRelativeDate(report.updated_at),
        supports: report.report_supports.length,
        image: coverImage,
    }
}