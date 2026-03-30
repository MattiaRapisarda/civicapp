"use client"

import { useState } from "react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { AccountSection } from "@/components/profile/account-section"
import { supabase } from "@/lib/supabase/client"

type UserProfile = {
    id: string // 🔥 fondamentale per update
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
}

export function ProfilePage({ userProfile }: ProfilePageProps) {
    const [profile, setProfile] = useState(userProfile)
    const [savingField, setSavingField] = useState<string | null>(null)

    const handleSaveField = async (field: string, value: string) => {
        const normalizedValue = value.trim()
        setSavingField(field)

        // 🔁 mappa campo UI -> colonna DB
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

        // 🔥 UPDATE SU DATABASE
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
        // ✅ aggiorna UI locale SOLO dopo successo DB
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
                <ProfileHeader user={profile} />

                <AccountSection
                    userProfile={profile}
                    onSaveField={handleSaveField}
                    savingField={savingField} // 🔥 nuovo
                />
            </div>
        </div>
    )
}