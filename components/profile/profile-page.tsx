"use client"

import { useMemo, useState } from "react"
import { AccountSection } from "@/components/profile/account-section"
import { ActivityCard } from "@/components/profile/activity-card"
import { ActivityTabs } from "@/components/profile/activity-tabs"
import { ProfileHeader } from "@/components/profile/profile-header"
import {
    accountItems,
    createdReports,
    supportedReports,
    userProfile,
} from "@/components/profile/profile-mock-data"
import type { ActivityTab } from "@/components/profile/profile-types"

export function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ActivityTab>("created")

    const reports = useMemo(() => {
        return activeTab === "created" ? createdReports : supportedReports
    }, [activeTab])

    const handleAccountClick = (id: string) => {
        console.log("Account action:", id)
    }

    const handleOpenReport = (id: number) => {
        console.log("Open report:", id)
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader user={userProfile} />

                <AccountSection
                    items={accountItems}
                    onItemClick={handleAccountClick}
                />

                <section className="space-y-3">
                    <div className="px-1">
                        <h2 className="text-lg font-semibold tracking-tight">Attività</h2>
                        <p className="text-sm text-muted-foreground">
                            Consulta lo storico delle tue segnalazioni e di quelle che supporti.
                        </p>
                    </div>

                    <ActivityTabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    <div className="space-y-3">
                        {reports.map((report) => (
                            <ActivityCard
                                key={report.id}
                                report={report}
                                onOpen={handleOpenReport}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}