"use client"

import { useMemo, useState } from "react"
import { ActivityTabs } from "@/components/activity/activity-tabs"
import { ActivityCard } from "@/components/activity/activity-card"
import {
    createdReports,
    supportedReports,
} from "@/components/activity/activity-mock-data"
import type { ActivityTab } from "@/components/activity/activity-types"
import { BottomNav } from "@/components/navigation/bottom-nav"

export function ActivityPage() {
    const [activeTab, setActiveTab] = useState<ActivityTab>("created")

    const reports = useMemo(() => {
        return activeTab === "created" ? createdReports : supportedReports
    }, [activeTab])

    return (
        <main className="min-h-screen bg-background pb-24">
            <div className="px-4 pt-6 sm:px-6 lg:px-8">
                <div className="mx-auto w-full max-w-5xl">
                    <h1 className="text-2xl font-semibold tracking-tight">Attività</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Aggiornamenti sulle tue segnalazioni e su quelle che supporti.
                    </p>

                    <div className="mt-6">
                        <ActivityTabs activeTab={activeTab} onChange={setActiveTab} />
                    </div>

                    <div className="mt-6 space-y-4">
                        {reports.length === 0 ? (
                            <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                                Nessuna segnalazione trovata
                            </div>
                        ) : (
                            reports.map((report) => (
                                <ActivityCard key={report.id} report={report} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <BottomNav />
        </main>
    )
}