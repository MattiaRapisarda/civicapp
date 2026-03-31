import { createSupabaseServerClient } from "@/lib/supabase/server"

export type ReportListItem = {
    id: string
    title: string
    description: string
    category: string
    status: "in_verifica" | "presa_in_carico" | "risolta"
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
    supports: number
    isSupportedByCurrentUser: boolean
}

export async function getReports(): Promise<ReportListItem[]> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    console.log("GET REPORTS - USER ID:", user?.id ?? null)

    if (userError) {
        console.error("Errore recupero utente:", userError)
    }

    const { data, error } = await supabase
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
            created_at,
            updated_at,
            reporter_id,
            report_images (
                image_url,
                is_cover
            ),
            report_supports (
                user_id
            )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Errore recupero reports:", error)
        return []
    }

    const mapped = (data ?? []).map((report) => {
        const reportImages = report.report_images ?? []
        const reportSupports = report.report_supports ?? []
        const isSupportedByCurrentUser = reportSupports.some(
            (support) => support.user_id === user?.id
        )

        console.log("REPORT DEBUG:", {
            reportId: report.id,
            supportUserIds: reportSupports.map((support) => support.user_id),
            currentUserId: user?.id ?? null,
            isSupportedByCurrentUser,
        })

        return {
            ...report,
            report_images: reportImages,
            report_supports: reportSupports,
            supports: reportSupports.length,
            isSupportedByCurrentUser,
        }
    })

    return mapped as ReportListItem[]
}