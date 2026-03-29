import type { ActivityReport } from "@/components/activity/activity-types"
import { mockReportDetails } from "@/components/report/report-detail-data"
import type { ReportDetail } from "@/components/report/report-detail-types"

function mapReportDetailToActivityReport(report: ReportDetail): ActivityReport {
    return {
        id: report.id,
        title: report.title,
        location: report.address,
        status: report.status,
        updatedAtLabel: report.updatedAtLabel,
        supports: report.supports,
    }
}

export const createdReports: ActivityReport[] = mockReportDetails
    .filter((report) => report.isCreatedByCurrentUser)
    .map(mapReportDetailToActivityReport)

export const supportedReports: ActivityReport[] = mockReportDetails
    .filter((report) => report.isSupportedByCurrentUser)
    .map(mapReportDetailToActivityReport)