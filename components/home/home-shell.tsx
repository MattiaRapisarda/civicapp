import { getReports } from "@/lib/reports/get-reports"
import { mapReportToCard } from "@/lib/reports/map-report"
import { HomeShellClient } from "@/components/home/home-shell-client"

export async function HomeShell() {
    const reports = await getReports()
    const mapped = reports.map(mapReportToCard)

    const ongoing = mapped.filter((report) => report.status !== "risolta")
    const resolved = mapped.filter((report) => report.status === "risolta")

    return (
        <HomeShellClient
            ongoingReports={ongoing}
            resolvedReports={resolved}
        />
    )
}