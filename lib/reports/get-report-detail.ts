import { createSupabaseServerClient } from "@/lib/supabase/server"

export type ReportDetailData = {
    id: string
    title: string
    description: string
    category: string
    status: "in_verifica" | "presa_in_carico" | "conclusa"
    location: string
    address: string
    coordinates: {
        lat: number
        lng: number
    }
    updatedAtLabel: string
    createdAtLabel: string
    supports: number
    commentsCount: number
    image: string
    reporter: string
    isCreatedByCurrentUser: boolean
    isSupportedByCurrentUser: boolean
    updates: {
        id: string
        title: string
        description: string
        createdAtLabel: string
        type: "created" | "review" | "progress" | "resolved"
    }[]
    comments: {
        id: string
        author: string
        text: string
        createdAtLabel: string
        likes: number
    }[]
}

function formatFullDate(dateString: string) {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date)
}

function formatDateTime(dateString: string) {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date)
}

function formatRelativeDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Adesso"

    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} min fa`
    }

    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} ore fa`
    }

    if (diffInSeconds < 172800) return "Ieri"

    const days = Math.floor(diffInSeconds / 86400)
    return `${days} giorni fa`
}

export async function getReportDetailById(
    id: string
): Promise<ReportDetailData | null> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: report, error: reportError } = await supabase
        .from("reports")
        .select(`
            id,
            title,
            description,
            category,
            status,
            location,
            address,
            lat,
            lng,
            reporter_id,
            created_at,
            updated_at,
            profiles!reports_reporter_id_fkey (
                first_name,
                last_name
            ),
            report_images (
                image_url,
                is_cover
            ),
            report_updates (
                id,
                title,
                description,
                type,
                created_at
            ),
            report_comments (
                id,
                text,
                created_at,
                author_id,
                profiles!report_comments_author_id_fkey (
                    first_name,
                    last_name
                )
            ),
            report_supports (
                user_id
            )
        `)
        .eq("id", id)
        .single()

    if (reportError || !report) {
        console.error("Errore getReportDetailById:", reportError)
        return null
    }

    const coverImage =
        report.report_images?.find(
            (image: { image_url: string; is_cover: boolean }) => image.is_cover
        )?.image_url ?? "/placeholder.jpg"

    const reporterProfile = Array.isArray(report.profiles)
        ? report.profiles[0]
        : report.profiles

    const reporterName = reporterProfile
        ? `${reporterProfile.first_name ?? ""} ${reporterProfile.last_name ?? ""}`.trim()
        : "Utente"

    const currentUserId = user?.id ?? null

    const isCreatedByCurrentUser = currentUserId === report.reporter_id

    const isSupportedByCurrentUser =
        currentUserId != null
            ? report.report_supports?.some(
                (support: { user_id: string }) =>
                    support.user_id === currentUserId
            ) ?? false
            : false

    return {
        id: report.id,
        title: report.title,
        description: report.description,
        category: report.category,
        status: report.status,
        location: report.location,
        address: report.address,
        coordinates: {
            lat: report.lat,
            lng: report.lng,
        },
        updatedAtLabel: `Aggiornata ${formatRelativeDate(report.updated_at)}`,
        createdAtLabel: formatFullDate(report.created_at),
        supports: report.report_supports?.length ?? 0,
        commentsCount: report.report_comments?.length ?? 0,
        image: coverImage,
        reporter: reporterName || "Utente",
        isCreatedByCurrentUser,
        isSupportedByCurrentUser,
        updates: [...(report.report_updates ?? [])]
            .sort(
                (a: { created_at: string }, b: { created_at: string }) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
            )
            .map(
                (update: {
                    id: string
                    title: string
                    description: string
                    type: "created" | "review" | "progress" | "resolved"
                    created_at: string
                }) => ({
                    id: update.id,
                    title: update.title,
                    description: update.description,
                    createdAtLabel: formatDateTime(update.created_at),
                    type: update.type,
                })
            ),
        comments: [...(report.report_comments ?? [])]
            .sort(
                (a: { created_at: string }, b: { created_at: string }) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            )
            .map(
                (comment: {
                    id: string
                    text: string
                    created_at: string
                    profiles:
                    | { first_name?: string; last_name?: string }[]
                    | { first_name?: string; last_name?: string }
                    | null
                }) => {
                    const commentProfile = Array.isArray(comment.profiles)
                        ? comment.profiles[0]
                        : comment.profiles

                    return {
                        id: comment.id,
                        author: commentProfile
                            ? `${commentProfile.first_name ?? ""} ${commentProfile.last_name ?? ""}`.trim() ||
                            "Utente"
                            : "Utente",
                        text: comment.text,
                        createdAtLabel: formatRelativeDate(comment.created_at),
                        likes: 0,
                    }
                }
            ),
    }
}