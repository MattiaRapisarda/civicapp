import { ActivityPage } from "@/components/activity/activity-page"
import { getActivityPageData } from "@/lib/activity/get-activity-data"

export default async function ActivityRoutePage() {
    const { userProfile, createdReports, supportedReports } =
        await getActivityPageData()

    return (
        <ActivityPage
            userProfile={userProfile}
            createdReports={createdReports}
            supportedReports={supportedReports}
        />
    )
}