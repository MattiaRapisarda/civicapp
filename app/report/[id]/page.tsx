import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ReportDetailPage } from "@/components/report/report-detail-page"
import { getReportDetailById } from "@/lib/reports/get-report-detail"

export default async function ReportPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const report = await getReportDetailById(id)

    if (!report) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4">
                <div className="w-full max-w-md rounded-[28px] border bg-background p-6 text-center shadow-sm">
                    <h1 className="text-xl font-semibold">Segnalazione non trovata</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        ID richiesto: {id}
                    </p>

                    <Button asChild className="mt-5 rounded-full">
                        <Link href="/">Torna alla home</Link>
                    </Button>
                </div>
            </main>
        )
    }

    return <ReportDetailPage report={report} />
}