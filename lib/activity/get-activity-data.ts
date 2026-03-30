import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentUserProfile } from "@/lib/profile/get-current-user-profile"
import type { ActivityReport } from "@/components/activity/activity-types"

type UserProfile = {
    id: string
    initials: string
    fullName: string
    email: string
    city: string
    stats: {
        createdCount: number
        supportedCount: number
        resolvedCount: number
    }
}

function formatUpdatedAtLabel(dateString: string) {
    const updatedAt = new Date(dateString)
    const now = new Date()

    const diffMs = now.getTime() - updatedAt.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) return "Aggiornata adesso"
    if (diffMinutes < 60) return `Aggiornata ${diffMinutes} min fa`
    if (diffHours < 24) return `Aggiornata ${diffHours} ore fa`
    if (diffDays === 1) return "Aggiornata ieri"
    return `Aggiornata ${diffDays} giorni fa`
}

function mapStatus(status: string): ActivityReport["status"] {
    switch (status) {
        case "in_verifica":
        case "presa_in_carico":
        case "risolta":
            return status
        default:
            return "in_verifica"
    }
}

function mapReport(report: {
    id: string
    title: string
    location: string | null
    status: string
    created_at: string
    updated_at: string | null
    image_url?: string | null
    supports_count?: number | null
}): ActivityReport {
    return {
        id: report.id,
        title: report.title,
        location: report.location ?? "Posizione non specificata",
        status: mapStatus(report.status),
        updatedAtLabel: formatUpdatedAtLabel(
            report.updated_at ?? report.created_at
        ),
        supports: report.supports_count ?? 0,
        image: report.image_url ?? null,
    }
}

export async function getActivityPageData(): Promise<{
    userProfile: UserProfile
    createdReports: ActivityReport[]
    supportedReports: ActivityReport[]
}> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }

    const baseProfile = await getCurrentUserProfile()

    if (!baseProfile) {
        redirect("/login")
    }

    const createdQuery = await supabase
        .from("reports")
        .select("*")
        .eq("reporter_id", user.id)
        .order("updated_at", { ascending: false })

    if (createdQuery.error) {
        console.error("Errore fetch segnalazioni create:", createdQuery.error)
    }

    const createdReports = (createdQuery.data ?? []).map((report) =>
        mapReport({
            id: report.id,
            title: report.title,
            location: report.location,
            status: report.status,
            created_at: report.created_at,
            updated_at: report.updated_at,
            image_url: report.image_url,
            supports_count: report.supports_count,
        })
    )

    const supportsQuery = await supabase
        .from("report_supports")
        .select("report_id")
        .eq("user_id", user.id)

    if (supportsQuery.error) {
        console.error(
            "Errore fetch supporti utente:",
            supportsQuery.error
        )
    }

    const supportedReportIds = [
        ...new Set((supportsQuery.data ?? []).map((item) => item.report_id)),
    ]

    let supportedReports: ActivityReport[] = []

    if (supportedReportIds.length > 0) {
        const supportedReportsQuery = await supabase
            .from("reports")
            .select("*")
            .in("id", supportedReportIds)
            .order("updated_at", { ascending: false })

        if (supportedReportsQuery.error) {
            console.error(
                "Errore fetch segnalazioni supportate:",
                supportedReportsQuery.error
            )
        } else {
            supportedReports = (supportedReportsQuery.data ?? []).map((report) =>
                mapReport({
                    id: report.id,
                    title: report.title,
                    location: report.location,
                    status: report.status,
                    created_at: report.created_at,
                    updated_at: report.updated_at,
                    image_url: report.image_url,
                    supports_count: report.supports_count,
                })
            )
        }
    }

    const resolvedCount = createdReports.filter(
        (report) => report.status === "risolta"
    ).length

    return {
        userProfile: {
            ...baseProfile,
            stats: {
                createdCount: createdReports.length,
                supportedCount: supportedReports.length,
                resolvedCount,
            },
        },
        createdReports,
        supportedReports,
    }
}