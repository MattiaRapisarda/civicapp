"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import { ProfileHeader } from "@/components/profile/profile-header"
import { AccountSection } from "@/components/profile/account-section"
import { ActivityTabs } from "@/components/profile/activity-tabs"
import { ActivityCard } from "@/components/profile/activity-card"

import {
    accountItems,
    createdReports,
    supportedReports,
    userProfile,
} from "@/components/profile/profile-mock-data"

import type { ActivityTab } from "@/components/profile/profile-types"

export function ProfilePage() {
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<ActivityTab>("created")

    const reports = useMemo(() => {
        return activeTab === "created" ? createdReports : supportedReports
    }, [activeTab])

    // 👉 gestione click account
    const handleAccountClick = (id: string) => {
        switch (id) {
            case "personal-info":
                router.push("/profile/edit")
                break
            case "email":
                router.push("/profile/email")
                break
            case "password":
                router.push("/profile/password")
                break
            case "notifications":
                router.push("/profile/notifications")
                break
            case "privacy":
                router.push("/profile/privacy")
                break
            case "logout":
                console.log("logout")
                break
        }
    }

    // 👉 apertura dettaglio segnalazione
    const handleOpenReport = (id: number) => {
        router.push(`/reports/${id}`)
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <div className="space-y-6">

                {/* 👤 Header utente */}
                <ProfileHeader user={userProfile} />

                {/* ⚙️ Sezione account */}
                <AccountSection
                    items={accountItems}
                    onItemClick={handleAccountClick}
                />

                {/* 📊 Attività */}
                <section className="space-y-3">
                    <div className="px-1">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Attività
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Consulta lo storico delle tue segnalazioni e di quelle che supporti.
                        </p>
                    </div>

                    {/* Tabs */}
                    <ActivityTabs
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />

                    {/* Lista */}
                    <div className="space-y-3">
                        {reports.length === 0 ? (
                            <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                                Nessuna segnalazione trovata
                            </div>
                        ) : (
                            reports.map((report) => (
                                <ActivityCard
                                    key={report.id}
                                    report={report}
                                    onOpen={handleOpenReport}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}