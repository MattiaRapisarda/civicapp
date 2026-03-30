"use client"

import { useMemo, useState } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { AccountSection } from "@/components/profile/account-section"
import { supabase } from "@/lib/supabase/client"
import type { ActivityReport } from "@/components/activity/activity-types"

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

interface ProfilePageProps {
    userProfile: UserProfile
    createdReports: ActivityReport[]
    supportedReports: ActivityReport[]
}

export function ProfilePage({
    userProfile,
    createdReports,
    supportedReports,
}: ProfilePageProps) {
    const [profile, setProfile] = useState(userProfile)
    const [savingField, setSavingField] = useState<string | null>(null)

    const profileWithStats = useMemo(() => {
        return {
            ...profile,
            stats: {
                createdCount: createdReports.length,
                supportedCount: supportedReports.length,
                resolvedCount: createdReports.filter(
                    (report) => report.status === "risolta"
                ).length,
            },
        }
    }, [profile, createdReports, supportedReports])

    const handleSaveField = async (field: string, value: string) => {
        const normalizedValue = value.trim()
        setSavingField(field)

        const fieldMap: Record<string, string> = {
            fullName: "full_name",
            email: "email",
            city: "city",
        }

        const dbColumn = fieldMap[field]

        if (!dbColumn) {
            setSavingField(null)
            return
        }

        const { error } = await supabase
            .from("profiles")
            .update({ [dbColumn]: normalizedValue })
            .eq("id", profile.id)

        if (error) {
            alert(
                [
                    `message: ${error.message ?? "n/a"}`,
                    `details: ${error.details ?? "n/a"}`,
                    `hint: ${error.hint ?? "n/a"}`,
                    `code: ${error.code ?? "n/a"}`,
                    `field: ${field}`,
                    `dbColumn: ${dbColumn}`,
                    `profile.id: ${profile.id ?? "undefined"}`,
                ].join("\n")
            )

            console.error("Errore aggiornamento profilo raw:", error)
            console.error("message:", error?.message)
            console.error("details:", error?.details)
            console.error("hint:", error?.hint)
            console.error("code:", error?.code)

            setSavingField(null)
            return
        }

        setProfile((prev) => {
            switch (field) {
                case "fullName":
                    return {
                        ...prev,
                        fullName: normalizedValue,
                        initials: normalizedValue
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase(),
                    }
                case "email":
                    return { ...prev, email: normalizedValue }
                case "city":
                    return { ...prev, city: normalizedValue }
                default:
                    return prev
            }
        })

        setSavingField(null)
    }

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader user={profileWithStats} />

                <AccountSection
                    userProfile={profileWithStats}
                    onSaveField={handleSaveField}
                    savingField={savingField}
                />
            </div>
        </div>
    )
}