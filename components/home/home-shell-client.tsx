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
        <main className="min-h-screen bg-background pb-24 lg:pb-10">
            <div className="mx-auto w-full max-w-6xl">
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
            </div>
        </main>
    )
}