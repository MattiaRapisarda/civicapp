"use server"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/auth/is-admin"

const ALLOWED_STATUSES = [
    "in_verifica",
    "presa_in_carico",
    "risolta",
] as const

type ReportStatus = (typeof ALLOWED_STATUSES)[number]

function isValidStatus(value: string): value is ReportStatus {
    return ALLOWED_STATUSES.includes(value as ReportStatus)
}

type UpdateReportStatusInput = {
    reportId: string
    status: string
    note?: string
    isPublic?: boolean
}

type AddTimelineUpdateInput = {
    reportId: string
    title: string
    description: string
    type?: string
    isPublic?: boolean
}

export async function updateReportStatus(input: UpdateReportStatusInput) {
    const { supabase } = await requireAdmin()

    if (!input.reportId) {
        return { success: false, message: "ID segnalazione mancante" }
    }

    if (!isValidStatus(input.status)) {
        return { success: false, message: "Stato non valido" }
    }

    const now = new Date().toISOString()

    const { error: updateError } = await supabase
        .from("reports")
        .update({
            status: input.status,
            updated_at: now,
            resolved_at: input.status === "risolta" ? now : null,
        })
        .eq("id", input.reportId)

    if (updateError) {
        console.error("Errore update reports:", updateError)
        return {
            success: false,
            message: `Errore aggiornamento report: ${updateError.message}`,
        }
    }

    const readableStatusMap: Record<ReportStatus, string> = {
        in_verifica: "In verifica",
        presa_in_carico: "Presa in carico",
        risolta: "Risolta",
    }

    const timelineDescription = input.note?.trim()
        ? input.note.trim()
        : `Lo stato della segnalazione è stato aggiornato in "${readableStatusMap[input.status]}".`

    const { error: timelineError } = await supabase
        .from("report_updates")
        .insert({
            report_id: input.reportId,
            title: "Stato aggiornato",
            description: timelineDescription,
            type: "status_change",
            is_public: input.isPublic ?? true,
            created_at: now,
        })

    if (timelineError) {
        console.error("Errore insert report_updates:", timelineError)
        return {
            success: false,
            message: `Stato aggiornato, ma timeline non salvata: ${timelineError.message}`,
        }
    }

    revalidatePath("/backoffice")
    revalidatePath(`/report/${input.reportId}`)

    return { success: true }
}

export async function addTimelineUpdate(input: AddTimelineUpdateInput) {
    const { supabase } = await requireAdmin()

    const title = input.title.trim()
    const description = input.description.trim()

    if (!input.reportId) {
        return { success: false, message: "ID segnalazione mancante" }
    }

    if (!title || !description) {
        return {
            success: false,
            message: "Titolo e descrizione sono obbligatori",
        }
    }

    const { error: insertError } = await supabase
        .from("report_updates")
        .insert({
            report_id: input.reportId,
            title,
            description,
            type: input.type?.trim() || "update",
            is_public: input.isPublic ?? true,
        })

    if (insertError) {
        console.error("Errore insert timeline:", insertError)
        return {
            success: false,
            message: `Errore inserimento aggiornamento: ${insertError.message}`,
        }
    }

    const { error: reportTouchError } = await supabase
        .from("reports")
        .update({
            updated_at: new Date().toISOString(),
        })
        .eq("id", input.reportId)

    if (reportTouchError) {
        console.error("Errore touch report:", reportTouchError)
        return {
            success: false,
            message: `Aggiornamento salvato, ma report non aggiornato: ${reportTouchError.message}`,
        }
    }

    revalidatePath("/backoffice")
    revalidatePath(`/report/${input.reportId}`)

    return { success: true }
}