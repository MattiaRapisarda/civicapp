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
        <main className="app-shell">
            <div className="section-stack">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={setSearchQuery}
                    onFilterChange={setSelectedFilter}
                />

                {hasNoResults ? (
                    <div className="surface-card p-6">
                        <h2 className="text-base font-semibold">Nessun risultato</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Prova a modificare la ricerca o il filtro per trovare altre
                            segnalazioni.
                        </p>
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
            </div>
        </main>
    )
}