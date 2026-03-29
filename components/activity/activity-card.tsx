import { Clock3, Heart, MapPin } from "lucide-react"
import { StatusBadge } from "@/components/home/status-badge"
import type { ActivityReport } from "@/components/activity/activity-types"

interface ActivityCardProps {
    report: ActivityReport
    onOpen?: (id: number) => void
}

export function ActivityCard({ report, onOpen }: ActivityCardProps) {
    return (
        <article className="rounded-[28px] border bg-background p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-tight">
                        {report.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{report.location}</span>
                    </div>
                </div>

                <StatusBadge status={report.status} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    <span>{report.updatedAtLabel}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>{report.supports} supporti</span>
                </div>
            </div>

            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => onOpen?.(report.id)}
                    className="text-sm font-medium text-foreground cursor-pointer underline-offset-4 hover:underline"
                >
                    Vedi dettaglio
                </button>
            </div>
        </article>
    )
}