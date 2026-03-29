import { Badge } from "@/components/ui/badge"

export type ReportStatus = "in_verifica" | "presa_in_carico" | "conclusa"

interface StatusBadgeProps {
    status: ReportStatus
}

function getStatusLabel(status: ReportStatus): string {
    switch (status) {
        case "in_verifica":
            return "In verifica"
        case "presa_in_carico":
            return "Presa in carico"
        case "conclusa":
            return "Conclusa"
        default:
            return "Sconosciuto"
    }
}

export function StatusBadge({ status }: StatusBadgeProps) {
    if (status === "conclusa") {
        return (
            <Badge className="rounded-full bg-green-600 hover:bg-green-600">
                {getStatusLabel(status)}
            </Badge>
        )
    }

    if (status === "presa_in_carico") {
        return <Badge className="rounded-full">{getStatusLabel(status)}</Badge>
    }

    return (
        <Badge variant="secondary" className="rounded-full">
            {getStatusLabel(status)}
        </Badge>
    )
}