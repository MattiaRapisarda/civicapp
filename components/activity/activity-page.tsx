"use client"

import { useMemo, useState } from "react"
import { ActivityTabs } from "@/components/activity/activity-tabs"
import { ActivityCard } from "@/components/activity/activity-card"
import type {
    ActivityReport,
    ActivityTab,
} from "@/components/activity/activity-types"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ProfileHeader } from "@/components/profile/profile-header"

type UserProfile = {
    id: string
    initials: string
    fullName: string
    email: string
    city: string
    stats: {
        createdCount: number
        supportedCount: number
        resolvedCount: number
    }
}

interface ActivityPageProps {
    userProfile: UserProfile
    createdReports: ActivityReport[]
    supportedReports: ActivityReport[]
}

export function ActivityPage({
    userProfile,
    createdReports,
    supportedReports,
}: ActivityPageProps) {
    const [activeTab, setActiveTab] = useState<ActivityTab>("created")

    const reports = useMemo(() => {
        return activeTab === "created" ? createdReports : supportedReports
    }, [activeTab, createdReports, supportedReports])

    return (
        <main className="min-h-screen bg-background pb-24">
            <div className="px-4 pt-6 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    <ProfileHeader user={userProfile} />
                </div>

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

            <BottomNav />
        </main>
    )
}