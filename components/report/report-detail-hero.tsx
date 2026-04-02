"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { StatusBadge } from "@/components/home/status-badge"
import { Button } from "@/components/ui/button"
import type { ReportDetail } from "@/components/report/report-detail-types"

interface ReportDetailHeroProps {
    title: string
    image: string
    status: ReportDetail["status"]
}

export function ReportDetailHero({
    title,
    image,
    status,
}: ReportDetailHeroProps) {
    return (
        <section className="relative">
            <div className="relative h-70 w-full overflow-hidden sm:h-90">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-background" />

                <div className="absolute left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 pt-5 sm:px-6 lg:px-8">
                    <Button
                        asChild
                        variant="secondary"
                        size="icon"
                        className="rounded-full border-0 bg-white/90 shadow-sm backdrop-blur"
                    >
                        <Link href="/app">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>

                    <StatusBadge status={status} />
                </div>
            </div>
        </section>
    )
}