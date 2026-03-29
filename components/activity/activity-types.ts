import type { ReportStatus } from "@/components/home/status-badge"

export type ActivityTab = "created" | "supported"

export interface ActivityReport {
    id: number
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
}