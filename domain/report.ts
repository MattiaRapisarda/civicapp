export type ReportStatus =
    | "in_verifica"
    | "presa_in_carico"
    | "conclusa"

export type ReportCategory =
    | "illuminazione"
    | "strade"
    | "rifiuti"
    | "verde"
    | "segnaletica"

export interface Report {
    id: number
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
    image: string
    category: ReportCategory
}

export interface ReportSectionData {
    title: string
    reports: Report[]
}