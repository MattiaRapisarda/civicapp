"use client"

import { Clock3, Heart, MapPin, MessageCircle } from "lucide-react"
import type { ReportDetail } from "@/components/report/report-detail-types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ReportDetailSummaryCardProps {
    report: ReportDetail
    supports: number
    commentsCount: number
    isSupported: boolean
    isSupportPending: boolean
    supportError: string | null
    onToggleSupport: () => void
    onScrollToComment: () => void
}

export function ReportDetailSummaryCard({
    report,
    supports,
    commentsCount,
    isSupported,
    isSupportPending,
    supportError,
    onToggleSupport,
    onScrollToComment,
}: ReportDetailSummaryCardProps) {
    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="space-y-6 p-5 sm:p-6">
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge
                            variant="secondary"
                            className="rounded-full px-3 py-1 text-xs font-medium"
                        >
                            {report.category}
                        </Badge>

                        <span className="text-sm text-muted-foreground">
                            {report.updatedAtLabel}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                            {report.title}
                        </h1>

                        <div className="flex items-start gap-2 text-sm text-muted-foreground">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                {report.address} · {report.location}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm leading-6 text-foreground/90 sm:text-[15px]">
                        {report.description}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-[22px] bg-muted/60 p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">Supporti</span>
                        </div>
                        <p className="mt-2 text-xl font-semibold">{supports}</p>
                    </div>

                    <div className="rounded-[22px] bg-muted/60 p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-xs">Commenti</span>
                        </div>
                        <p className="mt-2 text-xl font-semibold">{commentsCount}</p>
                    </div>

                    <div className="rounded-[22px] bg-muted/60 p-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            <span className="text-xs">Creata</span>
                        </div>
                        <p className="mt-2 text-sm font-medium leading-5">
                            {report.createdAtLabel}
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Button
                            onClick={onToggleSupport}
                            disabled={isSupportPending}
                            className={cn(
                                "h-12 w-full cursor-pointer hover:bg-success rounded-full text-sm font-medium",
                                isSupported && "bg-success text-background hover:bg-foreground/90"
                            )}
                        >
                            <Heart
                                className={cn("mr-2 h-4 w-4", isSupported && "fill-current")}
                            />
                            {isSupportPending
                                ? "Aggiornamento..."
                                : isSupported
                                    ? "Rimuovi supporto"
                                    : "Supporta segnalazione"}
                        </Button>

                        {supportError ? (
                            <p className="text-sm text-destructive">{supportError}</p>
                        ) : null}
                    </div>

                    <Button
                        variant="outline"
                        className="h-12 cursor-pointer rounded-full border-border text-sm font-medium"
                        onClick={onScrollToComment}
                    >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Aggiungi commento
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}