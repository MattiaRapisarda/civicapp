export type MapReportStatus = "in_verifica" | "presa_in_carico" | "risolta"

export type MapReport = {
    id: string
    title: string
    category: string
    status: MapReportStatus
    address: string
    location: string
    lat: number
    lng: number
}