import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { MapReport } from "@/lib/map/map-types"

type ReportMapRow = {
    id: string
    title: string
    category: string
    status: "in_verifica" | "presa_in_carico" | "risolta"
    address: string
    location: string
    lat: number | null
    lng: number | null
}

export async function getReportsForMap(): Promise<MapReport[]> {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
        .from("reports")
        .select("id, title, category, status, address, location, lat, lng")
        .not("lat", "is", null)
        .not("lng", "is", null)

    if (error) {
        throw new Error("Impossibile caricare le segnalazioni per la mappa")
    }

    return (data ?? [])
        .filter(
            (report): report is ReportMapRow & { lat: number; lng: number } =>
                typeof report.lat === "number" && typeof report.lng === "number"
        )
        .map((report) => ({
            id: report.id,
            title: report.title,
            category: report.category,
            status: report.status,
            address: report.address,
            location: report.location,
            lat: report.lat,
            lng: report.lng,
        }))
}