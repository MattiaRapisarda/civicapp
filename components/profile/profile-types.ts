import type { LucideIcon } from "lucide-react"
import type { ReportStatus } from "@/components/home/status-badge"

export type ActivityTab = "created" | "supported"

export interface ProfileStats {
    createdCount: number
    supportedCount: number
    resolvedCount: number
}

export interface UserProfile {
    initials: string
    fullName: string
    email: string
    city: string
    stats: ProfileStats
}

export interface ProfileReport {
    id: number
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
}

export interface AccountItemData {
    id: string
    title: string
    subtitle: string
    icon: LucideIcon
    danger?: boolean
}