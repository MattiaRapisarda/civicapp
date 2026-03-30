import { getReports } from "@/lib/reports/get-reports"

export default async function TestDbPage() {
    const reports = await getReports()

    return (
        <main className="p-6">
            <h1 className="mb-4 text-2xl font-semibold">Test DB</h1>

            {reports.length === 0 ? (
                <p>Nessuna segnalazione trovata.</p>
            ) : (
                <ul className="space-y-3">
                    {reports.map((report) => (
                        <li key={report.id} className="rounded-xl border p-4">
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-muted-foreground">
                                {report.location} · {report.status}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}