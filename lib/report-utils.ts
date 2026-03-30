import type { ReportStatus } from "@/domain/report"

export function getStatusLabel(status: ReportStatus): string {
    switch (status) {
        case "in_verifica":
            return "In verifica"
        case "presa_in_carico":
            return "Presa in carico"
        case "risolta":
            return "Conclusa"
        default:
            return "Sconosciuto"
    }
}