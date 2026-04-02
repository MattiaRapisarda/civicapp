"use client"

import { useState, useTransition } from "react"
import type { ReportDetail } from "@/components/report/report-detail-types"
import { createAbuseReport } from "@/lib/reports/create-abuse-report"
import { createComment } from "@/lib/reports/create-comment"
import { toggleSupport } from "@/lib/reports/toggle-support"

export function useReportDetailState(report: ReportDetail) {
    const [comment, setComment] = useState("")
    const [isSupportPending, startSupportTransition] = useTransition()
    const [isCommentPending, startCommentTransition] = useTransition()
    const [isAbusePending, startAbuseTransition] = useTransition()

    const [supportError, setSupportError] = useState<string | null>(null)
    const [commentError, setCommentError] = useState<string | null>(null)

    const [isAbuseDialogOpen, setIsAbuseDialogOpen] = useState(false)
    const [abuseReason, setAbuseReason] = useState("")
    const [abuseDetails, setAbuseDetails] = useState("")
    const [abuseError, setAbuseError] = useState<string | null>(null)
    const [abuseSuccess, setAbuseSuccess] = useState<string | null>(null)

    const [optimisticSupported, setOptimisticSupported] = useState(
        report.isSupportedByCurrentUser
    )
    const [optimisticSupports, setOptimisticSupports] = useState(report.supports)
    const [localComments, setLocalComments] = useState(report.comments)
    const [localCommentsCount, setLocalCommentsCount] = useState(report.commentsCount)

    const handleToggleSupport = () => {
        setSupportError(null)

        const previousSupported = optimisticSupported
        const previousSupports = optimisticSupports

        const nextSupported = !previousSupported
        const nextSupports = nextSupported
            ? previousSupports + 1
            : Math.max(0, previousSupports - 1)

        setOptimisticSupported(nextSupported)
        setOptimisticSupports(nextSupports)

        startSupportTransition(async () => {
            try {
                const result = await toggleSupport(report.id)

                setOptimisticSupported(result.supported)
                setOptimisticSupports(
                    result.supported
                        ? previousSupported
                            ? previousSupports
                            : previousSupports + 1
                        : previousSupported
                            ? Math.max(0, previousSupports - 1)
                            : previousSupports
                )
            } catch (error) {
                setOptimisticSupported(previousSupported)
                setOptimisticSupports(previousSupports)
                setSupportError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile aggiornare il supporto."
                )
            }
        })
    }

    const handleSubmitComment = () => {
        setCommentError(null)

        startCommentTransition(async () => {
            try {
                const trimmedComment = comment.trim()

                if (!trimmedComment) {
                    setCommentError("Il commento non può essere vuoto.")
                    return
                }

                const previousComments = localComments
                const previousCommentsCount = localCommentsCount

                const tempComment = {
                    id: `temp-${Date.now()}`,
                    author: "Tu",
                    text: trimmedComment,
                    likes: 0,
                    createdAtLabel: "Adesso",
                }

                setLocalComments((current) => [tempComment, ...current])
                setLocalCommentsCount((current) => current + 1)
                setComment("")

                const formData = new FormData()
                formData.append("comment", trimmedComment)

                const result = await createComment(report.id, formData)

                if (!result.success) {
                    setLocalComments(previousComments)
                    setLocalCommentsCount(previousCommentsCount)
                    setComment(trimmedComment)
                    setCommentError(result.error)
                }
            } catch (error) {
                setCommentError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile pubblicare il commento."
                )
            }
        })
    }

    const handleSubmitAbuseReport = () => {
        setAbuseError(null)
        setAbuseSuccess(null)

        startAbuseTransition(async () => {
            try {
                if (!abuseReason) {
                    setAbuseError("Seleziona il tipo di abuso.")
                    return
                }

                const formData = new FormData()
                formData.append("reason", abuseReason)
                formData.append("details", abuseDetails.trim())

                const result = await createAbuseReport(report.id, formData)

                if (!result.success) {
                    setAbuseError(result.error)
                    return
                }

                setAbuseSuccess("Segnalazione inviata correttamente.")
                setAbuseReason("")
                setAbuseDetails("")

                window.setTimeout(() => {
                    setIsAbuseDialogOpen(false)
                    setAbuseSuccess(null)
                }, 1000)
            } catch (error) {
                setAbuseError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile inviare la segnalazione."
                )
            }
        })
    }

    const handleAbuseDialogOpenChange = (open: boolean) => {
        setIsAbuseDialogOpen(open)

        if (!open) {
            setAbuseReason("")
            setAbuseDetails("")
            setAbuseError(null)
            setAbuseSuccess(null)
        }
    }

    const scrollToComment = () => {
        document.getElementById("comment")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }

    return {
        comment,
        setComment,
        isSupportPending,
        isCommentPending,
        isAbusePending,
        supportError,
        commentError,
        isAbuseDialogOpen,
        abuseReason,
        abuseDetails,
        abuseError,
        abuseSuccess,
        optimisticSupported,
        optimisticSupports,
        localComments,
        localCommentsCount,
        handleToggleSupport,
        handleSubmitComment,
        handleSubmitAbuseReport,
        handleAbuseDialogOpenChange,
        setAbuseReason,
        setAbuseDetails,
        scrollToComment,
    }
}