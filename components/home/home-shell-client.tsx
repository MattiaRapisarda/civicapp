"use client"

import { useState } from "react"
import { SearchBar } from "@/components/home/search-bar"
import { TopTabs, type HomeTab } from "@/components/home/top-tabs"
import { ReportSection } from "@/components/home/report-section"
import type { Report } from "@/components/home/report-card"

interface HomeShellClientProps {
    ongoingReports: Report[]
    resolvedReports: Report[]
}

export function HomeShellClient({
    ongoingReports,
    resolvedReports,
}: HomeShellClientProps) {
    const [activeTab, setActiveTab] = useState<HomeTab>("nearby")

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">

            <SearchBar />
            <TopTabs activeTab={activeTab} onChange={setActiveTab} />

            <ReportSection
                title="Segnalazioni in corso"
                reports={ongoingReports}
            />

            <ReportSection
                title="Segnalazioni concluse"
                reports={resolvedReports}
            />
        </main>
    )
}