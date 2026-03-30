"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function toggleSupport(reportId: string): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        throw new Error("Utente non autenticato")
    }

    if (!reportId) {
        throw new Error("Segnalazione non valida")
    }

    // 🔍 Controllo esistenza supporto
    const { data: existingSupport, error: existingSupportError } = await supabase
        .from("report_supports")
        .select("report_id")
        .eq("report_id", reportId)
        .eq("user_id", user.id)
        .maybeSingle()

    if (existingSupportError) {
        throw new Error(existingSupportError.message)
    }

    // ❌ Se esiste → rimuovi
    if (existingSupport) {
        const { error: deleteError } = await supabase
            .from("report_supports")
            .delete()
            .eq("report_id", reportId)
            .eq("user_id", user.id)

        if (deleteError) {
            throw new Error(deleteError.message)
        }
    }
    // ➕ Se NON esiste → aggiungi
    else {
        const { error: insertError } = await supabase
            .from("report_supports")
            .insert({
                report_id: reportId,
                user_id: user.id,
            })

        if (insertError) {
            throw new Error(insertError.message)
        }
    }

    // 🔄 Revalidate
    revalidatePath("/")
    revalidatePath("/activity")
    revalidatePath(`/report/${reportId}`)
}