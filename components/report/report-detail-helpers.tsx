import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Sparkles,
    Wrench,
} from "lucide-react"
import type { ReportUpdate } from "@/components/report/report-detail-types"

export function getUpdateIcon(type: ReportUpdate["type"]) {
    switch (type) {
        case "created":
            return AlertTriangle
        case "review":
            return Clock3
        case "progress":
            return Wrench
        case "resolved":
            return CheckCircle2
        default:
            return Sparkles
    }
}

export function getUpdateIconClasses(type: ReportUpdate["type"]) {
    switch (type) {
        case "created":
            return "bg-amber-100 text-amber-700"
        case "review":
            return "bg-sky-100 text-sky-700"
        case "progress":
            return "bg-violet-100 text-violet-700"
        case "resolved":
            return "bg-emerald-100 text-emerald-700"
        default:
            return "bg-muted text-foreground"
    }
}