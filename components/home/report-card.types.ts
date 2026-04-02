import type { ReportStatus } from "@/components/home/status-badge"

export type ReportCardItem = {
    id: string
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
    image: string | null
    isSupportedByCurrentUser: boolean
}