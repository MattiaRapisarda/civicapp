export type ActivityTab = "created" | "supported"

export type ActivityReportStatus =
    | "in_verifica"
    | "presa_in_carico"
    | "risolta"

export interface ActivityReport {
    id: string
    title: string
    location: string
    status: ActivityReportStatus
    updatedAtLabel: string
    supports: number
    image: string | null
}