"use client"

import Link from "next/link"
import { Clock3, Heart, MapPin } from "lucide-react"
import { StatusBadge } from "@/components/home/status-badge"
import type { ActivityReport } from "@/components/activity/activity-types"

interface ActivityCardProps {
    report: ActivityReport
}

export function ActivityCard({ report }: ActivityCardProps) {
    return (
        <article className="rounded-[28px] border bg-background p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-tight line-clamp-2">
                        {report.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                            {report.location || "Posizione non specificata"}
                        </span>
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
                    <span>
                        {report.supports ?? 0}{" "}
                        {report.supports === 1 ? "supporto" : "supporti"}
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <Link
                    href={`/report/${report.id}`}
                    className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
                >
                    Vedi dettaglio
                </Link>
            </div>
        </article>
    )
}