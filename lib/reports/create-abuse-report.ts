"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"

const ALLOWED_REASONS = [
    "non_veritiero",
    "non_inerente",
    "offensivo",
    "spam",
    "altro",
] as const

type AbuseReason = (typeof ALLOWED_REASONS)[number]

type CreateAbuseReportResult =
    | { success: true }
    | { success: false; error: string }

function isValidReason(value: string): value is AbuseReason {
    return ALLOWED_REASONS.includes(value as AbuseReason)
}

export async function createAbuseReport(
    reportId: string,
    formData: FormData
): Promise<CreateAbuseReportResult> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
            success: false,
            error: "Devi essere autenticato per segnalare un abuso.",
        }
    }

    const reason = String(formData.get("reason") ?? "").trim()
    const details = String(formData.get("details") ?? "").trim()

    if (!isValidReason(reason)) {
        return {
            success: false,
            error: "Seleziona un motivo valido.",
        }
    }

    const { error } = await supabase.from("report_abuse_reports").insert({
        report_id: reportId,
        user_id: user.id,
        reason,
        details: details || null,
    })

    if (error) {
        if (error.code === "23505") {
            return {
                success: false,
                error: "Hai già segnalato questa segnalazione.",
            }
        }

        return {
            success: false,
            error: "Non è stato possibile inviare la segnalazione.",
        }
    }

    return { success: true }
}