import { Clock3, Heart } from "lucide-react"
import { StatusBadge, type ReportStatus } from "@/components/home/status-badge"

export interface Report {
    id: number
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
    image: string
}

interface ReportCardProps {
    report: Report
}

export function ReportCard({ report }: ReportCardProps) {
    return (
        <article className="group h-full">
            <div className="relative overflow-hidden rounded-[24px]">
                <img
                    src={report.image}
                    alt={report.title}
                    className="aspect-[1.15/1] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />

                <div className="absolute left-3 top-3">
                    <StatusBadge status={report.status} />
                </div>

                <button
                    type="button"
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 backdrop-blur-sm"
                >
                    <Heart className="h-5 w-5 text-white" />
                </button>
            </div>

            <div className="flex min-h-[96px] flex-col px-1 pb-1 pt-3">
                <h3 className="line-clamp-2 text-[1.15rem] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[1.25rem]">
                    {report.title}
                </h3>

                <p className="mt-1 line-clamp-1 text-sm text-foreground/90 sm:text-[15px]">
                    {report.location}
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="h-3.5 w-3.5 shrink-0" />
                    <span>{report.updatedAtLabel}</span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                    {report.supports} supporti · stato pubblico
                </p>
            </div>
        </article>
    )
}