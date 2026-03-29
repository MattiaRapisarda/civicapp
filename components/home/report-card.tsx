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
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-none">
            <CardContent className="p-0">
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

                <div className="px-2 pb-1 pt-4">
                    <p className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl lg:text-[28px]">
                        {report.title}
                    </p>

                    <p className="mt-2 text-sm text-foreground sm:text-base">
                        {report.location}
                    </p>

                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        <span>{report.updatedAtLabel}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                        {report.supports} supporti · stato pubblico
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}