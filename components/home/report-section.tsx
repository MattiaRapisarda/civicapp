import { ReportCard, type Report } from "@/components/home/report-card"
import { SectionHeader } from "@/components/home/section-header"

interface ReportSectionProps {
    title: string
    reports: Report[]
}

export function ReportSection({ title, reports }: ReportSectionProps) {
    return (
        <section className="pt-8 sm:pt-10">
            <SectionHeader title={title} />

            <div className="grid gap-6 px-4 pt-5 sm:px-6 lg:grid-cols-2 lg:px-8">
                {reports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                ))}
            </div>
        </section>
    )
}