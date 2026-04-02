"use client"

import { useMemo, useState } from "react"
import { SearchBar, type FilterStatus } from "@/components/home/search-bar"
import { ReportSection } from "@/components/home/report-section"
import type { ReportCardItem } from "@/components/home/report-card.types"

interface HomeShellClientProps {
    ongoingReports: ReportCardItem[]
    resolvedReports: ReportCardItem[]
}

export function HomeShellClient({
    ongoingReports,
    resolvedReports,
}: HomeShellClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(null)

    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filteredOngoingReports = useMemo(() => {
        return ongoingReports.filter((report) => {
            const matchesQuery =
                !normalizedQuery ||
                report.title.toLowerCase().includes(normalizedQuery) ||
                report.location.toLowerCase().includes(normalizedQuery)

            const matchesFilter =
                selectedFilter === null || selectedFilter === "in_corso"

            return matchesQuery && matchesFilter
        })
    }, [ongoingReports, normalizedQuery, selectedFilter])

    const filteredResolvedReports = useMemo(() => {
        return resolvedReports.filter((report) => {
            const matchesQuery =
                !normalizedQuery ||
                report.title.toLowerCase().includes(normalizedQuery) ||
                report.location.toLowerCase().includes(normalizedQuery)

            const matchesFilter =
                selectedFilter === null || selectedFilter === "concluse"

            return matchesQuery && matchesFilter
        })
    }, [resolvedReports, normalizedQuery, selectedFilter])

    const hasNoResults =
        filteredOngoingReports.length === 0 &&
        filteredResolvedReports.length === 0

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={setSearchQuery}
                onFilterChange={setSelectedFilter}
            />

            {hasNoResults ? (
                <div className="mt-6 rounded-[24px] border bg-card p-6 text-sm text-muted-foreground shadow-sm">
                    Nessuna segnalazione trovata.
                </div>
            ) : null}

            {(selectedFilter === null || selectedFilter === "in_corso") && (
                <ReportSection
                    title="Segnalazioni in corso"
                    reports={filteredOngoingReports}
                />
            )}

            {(selectedFilter === null || selectedFilter === "concluse") && (
                <ReportSection
                    title="Segnalazioni concluse"
                    reports={filteredResolvedReports}
                />
            )}
        </main>
    )
}