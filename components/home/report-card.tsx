"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { Clock3, Heart } from "lucide-react"

import { toggleSupport } from "@/lib/reports/toggle-support"
import { cn } from "@/lib/utils"
import { StatusBadge, type ReportStatus } from "@/components/home/status-badge"

export interface Report {
    id: string
    title: string
    location: string
    status: ReportStatus
    updatedAtLabel: string
    supports: number
    image: string
    isSupportedByCurrentUser: boolean
}

interface ReportCardProps {
    report: Report
}

export function ReportCard({ report }: ReportCardProps) {
    const router = useRouter()
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

                setOptimisticSupported(result.supported)
                setOptimisticSupports((currentSupports) => {
                    if (result.supported === previousSupported) {
                        return previousSupports
                    }

                    return result.supported
                        ? previousSupports + 1
                        : Math.max(0, previousSupports - 1)
                })

                router.refresh()
            } catch (error) {
                setOptimisticSupported(previousSupported)
                setOptimisticSupports(previousSupports)
                setSupportError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile aggiornare il supporto."
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
            <article className="h-full">
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
                        onClick={handleToggleSupport}
                        disabled={isPending}
                        className={cn(
                            "absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200",
                            optimisticSupported
                                ? "bg-white/90 scale-110"
                                : "bg-black/20 hover:scale-105"
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
                                optimisticSupported
                                    ? "fill-red-500 text-red-500 scale-110"
                                    : "text-white"
                            )}
                        />
                    </button>
                </div>

                <div className="flex min-h-24 flex-col px-1 pb-1 pt-3">
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
                        {optimisticSupports} supporti · stato pubblico
                    </p>

                    {supportError ? (
                        <p className="mt-1 text-xs text-destructive">
                            {supportError}
                        </p>
                    ) : null}
                </div>
            </article>
        </Link>
    )
}