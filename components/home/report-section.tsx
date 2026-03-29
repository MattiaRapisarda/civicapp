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

            <div className="overflow-x-auto px-4 pt-5 sm:px-6 lg:px-8">
                <div className="flex items-stretch gap-4 sm:gap-6">
                    {reports.map((report) => (
                        <div
                            key={report.id}
                            className="
                                shrink-0
                                w-[calc(50%-0.5rem)]
                                min-w-[calc(50%-0.5rem)]
                                sm:w-[calc(50%-0.75rem)]
                                sm:min-w-[calc(50%-0.75rem)]
                                lg:w-[360px]
                                lg:min-w-[360px]
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