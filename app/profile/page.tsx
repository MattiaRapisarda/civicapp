import { redirect } from "next/navigation"
import { ProfilePage } from "@/components/profile/profile-page"
import { getCurrentUserProfile } from "@/lib/profile/get-current-user-profile"

export default async function ProfileRoute() {
    const userProfile = await getCurrentUserProfile()

    console.log("PROFILE ROUTE userProfile:", userProfile)

    if (!userProfile) {
        redirect("/login")
    }

    return <ProfilePage userProfile={userProfile} />
}