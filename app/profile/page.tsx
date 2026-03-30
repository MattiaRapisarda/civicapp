import { redirect } from "next/navigation"
import { ProfilePage } from "@/components/profile/profile-page"
import { getActivityPageData } from "@/lib/activity/get-activity-data"

export default async function ProfileRoute() {
    const { userProfile, createdReports, supportedReports } =
        await getActivityPageData()

    if (!userProfile) {
        redirect("/login")
    }

    return (
        <ProfilePage
            userProfile={userProfile}
            createdReports={createdReports}
            supportedReports={supportedReports}
        />
    )
}