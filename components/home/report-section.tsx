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

            <div className="overflow-x-auto px-4 pt-5 [scrollbar-width:none] sm:px-6 lg:px-8">
                <div className="flex gap-4">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="
                                shrink-0
                                w-[78%]
                                min-w-[78%]
                                sm:w-[48%]
                                sm:min-w-[48%]
                                lg:w-[320px]
                                lg:min-w-[320px]
                            "
                        >
                            <ReportCard report={report} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}