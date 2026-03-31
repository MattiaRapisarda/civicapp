import { ReportsMapShell } from "@/components/map/reports-map-shell"
import { getReportsForMap } from "@/lib/reports/get-reports-for-map"

export default async function MapPage() {
    const reports = await getReportsForMap()

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <div className="h-[calc(100vh-6rem)]">
                <ReportsMapShell reports={reports} />
            </div>
        </main>
    )
}