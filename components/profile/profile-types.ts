import type { LucideIcon } from "lucide-react"

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

export interface AccountItemData {
    id: string
    title: string
    subtitle: string
    icon: LucideIcon
    danger?: boolean
}