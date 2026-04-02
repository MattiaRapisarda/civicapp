"use client"

import { Heart } from "lucide-react"
import type { ReportDetail } from "@/components/report/report-detail-types"
import { ReportAbuseDialog } from "@/components/report/report-abuse-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ReportDetailExtraCardProps {
    report: ReportDetail
    isSupported: boolean
    isSupportPending: boolean
    supportError: string | null
    onToggleSupport: () => void
    isAbuseDialogOpen: boolean
    onAbuseDialogOpenChange: (open: boolean) => void
    abuseReason: string
    abuseDetails: string
    abuseError: string | null
    abuseSuccess: string | null
    isAbusePending: boolean
    onAbuseReasonChange: (value: string) => void
    onAbuseDetailsChange: (value: string) => void
    onSubmitAbuseReport: () => void
}

export function ReportDetailExtraCard({
    report,
    isSupported,
    isSupportPending,
    supportError,
    onToggleSupport,
    isAbuseDialogOpen,
    onAbuseDialogOpenChange,
    abuseReason,
    abuseDetails,
    abuseError,
    abuseSuccess,
    isAbusePending,
    onAbuseReasonChange,
    onAbuseDetailsChange,
    onSubmitAbuseReport,
}: ReportDetailExtraCardProps) {
    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="space-y-4 p-5 sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold">Dettagli aggiuntivi</h2>
                    <p className="text-sm text-muted-foreground">
                        Informazioni utili sulla segnalazione
                    </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] bg-muted/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Segnalata da
                        </p>
                        <p className="mt-2 font-medium">{report.reporter}</p>
                    </div>

                    <div className="rounded-[22px] bg-muted/60 p-4">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Categoria
                        </p>
                        <p className="mt-2 font-medium">{report.category}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Button
                        onClick={onToggleSupport}
                        disabled={isSupportPending}
                        className={cn(
                            "h-12 w-full cursor-pointer rounded-full text-sm font-medium",
                            isSupported && "bg-foreground text-background hover:bg-foreground/90"
                        )}
                    >
                        <Heart className={cn("mr-2 h-4 w-4", isSupported && "fill-current")} />
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

                <ReportAbuseDialog
                    open={isAbuseDialogOpen}
                    onOpenChange={onAbuseDialogOpenChange}
                    abuseReason={abuseReason}
                    abuseDetails={abuseDetails}
                    abuseError={abuseError}
                    abuseSuccess={abuseSuccess}
                    isPending={isAbusePending}
                    onReasonChange={onAbuseReasonChange}
                    onDetailsChange={onAbuseDetailsChange}
                    onSubmit={onSubmitAbuseReport}
                />
            </CardContent>
        </Card>
    )
}