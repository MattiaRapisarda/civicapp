"use client"

import { useRouter } from "next/navigation"

import { ProfileHeader } from "@/components/profile/profile-header"
import { AccountSection } from "@/components/profile/account-section"

import {
    accountItems,
    userProfile,
} from "@/components/profile/profile-mock-data"

export function ProfilePage() {
    const router = useRouter()

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

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader user={userProfile} />

                <AccountSection
                    items={accountItems}
                    onItemClick={handleAccountClick}
                />
            </div>
        </div>
    )
}