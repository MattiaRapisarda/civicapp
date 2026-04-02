"use client"

import type { ReportDetail } from "@/components/report/report-detail-types"
import { ReportDetailHero } from "@/components/report/report-detail-hero"
import { ReportDetailSummaryCard } from "@/components/report/report-detail-summary-card"
import { ReportDetailLocationCard } from "@/components/report/report-detail-location-card"
import { ReportDetailUpdatesCard } from "@/components/report/report-detail-updates-card"
import { ReportDetailCommentsCard } from "@/components/report/report-detail-comments-card"
import { ReportDetailExtraCard } from "@/components/report/report-detail-extra-card"
import { useReportDetailState } from "@/components/report/use-report-detail-state"

interface ReportDetailPageProps {
    report: ReportDetail
}

export function ReportDetailPage({ report }: ReportDetailPageProps) {
    const state = useReportDetailState(report)

    return (
        <main className="min-h-screen bg-background pb-28">
            <ReportDetailHero
                title={report.title}
                image={report.image}
                status={report.status}
            />

            <section className="-mt-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                    <ReportDetailSummaryCard
                        report={report}
                        supports={state.optimisticSupports}
                        commentsCount={state.localCommentsCount}
                        isSupported={state.optimisticSupported}
                        isSupportPending={state.isSupportPending}
                        supportError={state.supportError}
                        onToggleSupport={state.handleToggleSupport}
                        onScrollToComment={state.scrollToComment}
                    />

                    <ReportDetailLocationCard
                        title={report.title}
                        address={report.address}
                        lat={report.coordinates.lat}
                        lng={report.coordinates.lng}
                    />

                    <ReportDetailUpdatesCard updates={report.updates} />

                    <ReportDetailCommentsCard
                        comment={state.comment}
                        comments={state.localComments}
                        commentError={state.commentError}
                        isCommentPending={state.isCommentPending}
                        onCommentChange={state.setComment}
                        onSubmitComment={state.handleSubmitComment}
                    />

                    <ReportDetailExtraCard
                        report={report}
                        isSupported={state.optimisticSupported}
                        isSupportPending={state.isSupportPending}
                        supportError={state.supportError}
                        onToggleSupport={state.handleToggleSupport}
                        isAbuseDialogOpen={state.isAbuseDialogOpen}
                        onAbuseDialogOpenChange={state.handleAbuseDialogOpenChange}
                        abuseReason={state.abuseReason}
                        abuseDetails={state.abuseDetails}
                        abuseError={state.abuseError}
                        abuseSuccess={state.abuseSuccess}
                        isAbusePending={state.isAbusePending}
                        onAbuseReasonChange={state.setAbuseReason}
                        onAbuseDetailsChange={state.setAbuseDetails}
                        onSubmitAbuseReport={state.handleSubmitAbuseReport}
                    />
                </div>
            </section>
        </main>
    )
}