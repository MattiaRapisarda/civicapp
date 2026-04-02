import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { ReportCardItem } from "@/components/home/report-card.types"

type Row = {
    id: string
    title: string
    status: "in_verifica" | "presa_in_carico" | "risolta"
    location: string
    updated_at: string
    cover_image: string | null
    supports_count: number
}

function formatUpdatedAtLabel(updatedAt: string): string {
    const date = new Date(updatedAt)
    const now = new Date()

    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return "Aggiornata da poco"
    if (diffHours < 24) return `Aggiornata ${diffHours}h fa`
    if (diffDays === 1) return "Aggiornata ieri"
    if (diffDays < 7) return `Aggiornata ${diffDays} giorni fa`

    return new Intl.DateTimeFormat("it-IT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date)
}

export async function getReportCards(): Promise<ReportCardItem[]> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
        .from("report_cards_view")
        .select("*")
        .order("updated_at", { ascending: false })

    if (error || !data) return []

    const rows = data as Row[]

    let supportedIds = new Set<string>()

    if (user?.id) {
        const { data: supports } = await supabase
            .from("report_supports")
            .select("report_id")
            .eq("user_id", user.id)

        supportedIds = new Set(
            (supports ?? []).map((s) => s.report_id)
        )
    }

    return rows.map((r) => ({
        id: r.id,
        title: r.title,
        location: r.location,
        status: r.status,
        updatedAtLabel: formatUpdatedAtLabel(r.updated_at),
        image: r.cover_image,
        supports: r.supports_count,
        isSupportedByCurrentUser: supportedIds.has(r.id),
    }))
}