import type { Report } from "@/components/home/report-card"
import { mockReportDetails } from "@/components/report/report-detail-data"
import type { ReportDetail } from "@/components/report/report-detail-types"

function mapReportDetailToHomeReport(report: ReportDetail): Report {
    return {
        id: report.id,
        title: report.title,
        location: `${report.address} · ${report.location}`,
        status: report.status,
        updatedAtLabel: report.updatedAtLabel,
        supports: report.supports,
        image: report.image,
    }
}

export const ongoingReports: Report[] = mockReportDetails
    .filter((report) => report.status !== "risolta")
    .map(mapReportDetailToHomeReport)

export const resolvedReports: Report[] = mockReportDetails
    .filter((report) => report.status === "risolta")
    .map(mapReportDetailToHomeReport)