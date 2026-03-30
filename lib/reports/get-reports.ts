import { createSupabaseServerClient } from "@/lib/supabase/server"

export type ReportListItem = {
    id: string
    title: string
    location: string
    status: string
    supports: number
    image_url: string | null
    created_at: string
}

export async function getReports() {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Errore recupero reports:", error)
        return []
    }

    return data satisfies ReportListItem[]
}