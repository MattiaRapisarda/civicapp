"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useTransition } from "react"
import { Clock3, Heart } from "lucide-react"

import { toggleSupport } from "@/lib/reports/toggle-support"
import { cn } from "@/lib/utils"
import { StatusBadge } from "@/components/home/status-badge"
import type { ReportCardItem } from "@/components/home/report-card.types"

interface ReportCardProps {
    report: ReportCardItem
}

export function ReportCard({ report }: ReportCardProps) {
    const [isPending, startTransition] = useTransition()
    const [supportError, setSupportError] = useState<string | null>(null)

    const [optimisticSupported, setOptimisticSupported] = useState(
        report.isSupportedByCurrentUser
    )
    const [optimisticSupports, setOptimisticSupports] = useState(report.supports)

    useEffect(() => {
        setOptimisticSupported(report.isSupportedByCurrentUser)
    }, [report.isSupportedByCurrentUser])

    useEffect(() => {
        setOptimisticSupports(report.supports)
    }, [report.supports])

    const handleToggleSupport = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setSupportError(null)

        const previousSupported = optimisticSupported
        const previousSupports = optimisticSupports

        const nextSupported = !previousSupported
        const nextSupports = nextSupported
            ? previousSupports + 1
            : Math.max(0, previousSupports - 1)

        setOptimisticSupported(nextSupported)
        setOptimisticSupports(nextSupports)

        startTransition(async () => {
            try {
                const result = await toggleSupport(report.id)

                if (!result.success) {
                    setOptimisticSupported(previousSupported)
                    setOptimisticSupports(previousSupports)
                    setSupportError(result.error)
                    return
                }

                setSupportError(null)
                setOptimisticSupported(result.supported)
                setOptimisticSupports(
                    result.supported
                        ? previousSupported
                            ? previousSupports
                            : previousSupports + 1
                        : previousSupported
                            ? Math.max(0, previousSupports - 1)
                            : previousSupports
                )
            } catch {
                setOptimisticSupported(previousSupported)
                setOptimisticSupports(previousSupports)
                setSupportError(
                    "Non è stato possibile aggiornare il supporto."
                )
            }
        })
    }

    return (
        <Link
            href={`/report/${report.id}`}
            className="group block h-full"
            aria-label={`Apri il dettaglio della segnalazione ${report.title}`}
        >
            <article className="surface-card h-full overflow-hidden">
                <div className="relative aspect-1.25/1 overflow-hidden">
                    <Image
                        src={report.image ?? "/placeholder.jpg"}
                        alt={report.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />

                    <div className="absolute left-3 top-3">
                        <StatusBadge status={report.status} />
                    </div>

                    <button
                        type="button"
                        onClick={handleToggleSupport}
                        disabled={isPending}
                        className={cn(
                            "absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 disabled:pointer-events-none disabled:opacity-70",
                            optimisticSupported
                                ? "scale-110 bg-secondary/90 text-success shadow-sm"
                                : "bg-secondary/20 text-secondary hover:scale-105"
                        )}
                        aria-label={
                            optimisticSupported
                                ? "Rimuovi supporto"
                                : "Aggiungi supporto"
                        }
                    >
                        <Heart
                            className={cn(
                                "h-5 w-5 transition-all duration-200",
                                optimisticSupported ? "scale-110 fill-current" : ""
                            )}
                        />
                    </button>
                </div>

                <div className="flex min-h-28 flex-col p-4 sm:p-5">
                    <h3 className="line-clamp-2 text-base font-semibold leading-tight tracking-tight sm:text-lg">
                        {report.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-sm text-foreground/85">
                        {report.location}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock3 className="h-3.5 w-3.5 shrink-0" />
                        <span>{report.updatedAtLabel}</span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {optimisticSupports} supporti · stato pubblico
                    </p>

                    {supportError ? (
                        <p className="mt-2 text-xs text-destructive">{supportError}</p>
                    ) : null}
                </div>
            </article>
        </Link>
    )
}