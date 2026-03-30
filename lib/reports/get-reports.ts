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
}

export async function getReports(): Promise<ReportListItem[]> {
    const supabase = await createSupabaseServerClient()

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

    return (data ?? []).map((report) => ({
        ...report,
        report_images: report.report_images ?? [],
        report_supports: report.report_supports ?? [],
    })) as ReportListItem[]
}