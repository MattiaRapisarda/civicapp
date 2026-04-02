import { getReportCards } from "@/lib/reports/get-report-cards"
import { HomeShellClient } from "@/components/home/home-shell-client"

export async function HomeShell() {
    const reports = await getReportCards()

    const ongoing = reports.filter((report) => report.status !== "risolta")
    const resolved = reports.filter((report) => report.status === "risolta")

    return (
        <HomeShellClient
            ongoingReports={ongoing}
            resolvedReports={resolved}
        />
    )
}