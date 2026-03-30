"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

type CreateCommentResult =
    | { success: true; commentId: string }
    | { success: false; error: string }

export async function createComment(
    reportId: string,
    formData: FormData
): Promise<CreateCommentResult> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return {
            success: false,
            error: "Devi essere autenticato per commentare.",
        }
    }

    const text = formData.get("comment")?.toString().trim() ?? ""

    if (!reportId) {
        return {
            success: false,
            error: "Segnalazione non valida.",
        }
    }

    if (!text) {
        return {
            success: false,
            error: "Il commento non può essere vuoto.",
        }
    }

    if (text.length > 500) {
        return {
            success: false,
            error: "Il commento non può superare 500 caratteri.",
        }
    }

    const { data: reportExists, error: reportError } = await supabase
        .from("reports")
        .select("id")
        .eq("id", reportId)
        .single()

    if (reportError || !reportExists) {
        return {
            success: false,
            error: "Segnalazione non trovata.",
        }
    }

    const { data: createdComment, error: insertError } = await supabase
        .from("report_comments")
        .insert({
            report_id: reportId,
            author_id: user.id,
            text,
        })
        .select("id")
        .single()

    if (insertError || !createdComment) {
        console.error("CREATE COMMENT ERROR:", insertError)

        return {
            success: false,
            error: insertError?.message ?? "Impossibile pubblicare il commento.",
        }
    }

    revalidatePath(`/report/${reportId}`)
    revalidatePath("/")
    revalidatePath("/activity")

    return {
        success: true,
        commentId: createdComment.id,
    }
}