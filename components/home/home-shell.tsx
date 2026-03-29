"use client"

import { useState } from "react"
import { SearchBar } from "@/components/home/search-bar"
import { TopTabs, type HomeTab } from "@/components/home/top-tabs"
import { ReportSection } from "@/components/home/report-section"
import { BottomNav } from "@/components/home/bottom-nav"
import { ongoingReports, resolvedReports } from "@/data/reports"

export function HomeShell() {
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

            <BottomNav activeItem="explore" />
        </main>
    )
}