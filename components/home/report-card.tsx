import { Clock3, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
        <Card className="h-full overflow-hidden rounded-[28px] border-0 shadow-none">
            <CardContent className="flex h-full flex-col p-0">
                <div className="relative">
                    <img
                        src={report.image}
                        alt={report.title}
                        className="h-56 w-full object-cover sm:h-64 lg:h-72"
                    />

                    <div className="absolute left-4 top-4">
                        <StatusBadge status={report.status} />
                    </div>

                    <button
                        type="button"
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 sm:h-11 sm:w-11"
                    >
                        <Heart className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
                    <div className="min-h-[5.5rem]">
                        <h3 className="line-clamp-2 text-xl font-semibold leading-tight tracking-tight sm:text-2xl lg:text-[28px]">
                            {report.title}
                        </h3>
                    </div>

                    <div className="mt-2 min-h-[1.75rem]">
                        <p className="text-sm text-foreground sm:text-base">
                            {report.location}
                        </p>
                    </div>

                    <div className="mt-1 min-h-[1.5rem] flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4 shrink-0" />
                        <span>{report.updatedAtLabel}</span>
                    </div>

                    <div className="mt-auto pt-3 min-h-[1.75rem]">
                        <p className="text-sm text-muted-foreground sm:text-base">
                            {report.supports} supporti · stato pubblico
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}