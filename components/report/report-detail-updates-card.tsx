"use client"

import type { ReportUpdate } from "@/components/report/report-detail-types"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
    getUpdateIcon,
    getUpdateIconClasses,
} from "@/components/report/report-detail-helpers"

interface ReportDetailUpdatesCardProps {
    updates: ReportUpdate[]
}

export function ReportDetailUpdatesCard({
    updates,
}: ReportDetailUpdatesCardProps) {
    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold">Aggiornamenti</h2>
                    <p className="text-sm text-muted-foreground">
                        Timeline della segnalazione
                    </p>
                </div>

                <div className="space-y-5">
                    {updates.map((update, index) => {
                        const Icon = getUpdateIcon(update.type)

                        return (
                            <div key={update.id} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={cn(
                                            "flex h-10 w-10 items-center justify-center rounded-full",
                                            getUpdateIconClasses(update.type)
                                        )}
                                    >
                                        <Icon className="h-5 w-5 text-info" />
                                    </div>

                                    {index < updates.length - 1 ? (
                                        <div className="mt-2 h-full w-px bg-border" />
                                    ) : null}
                                </div>

                                <div className="flex-1 pb-4">
                                    <div className="rounded-[22px] bg-muted/50 p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="font-medium">{update.title}</h3>
                                            <span className="text-xs text-muted-foreground">
                                                {update.createdAtLabel}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                            {update.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}