"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function toggleSupport(reportId: string): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Utente non autenticato")
    }

    const { data: existingSupport, error: existingSupportError } = await supabase
        .from("report_supports")
        .select("id")
        .eq("report_id", reportId)
        .eq("user_id", user.id)
        .maybeSingle()

    if (existingSupportError) {
        throw new Error(existingSupportError.message)
    }

    if (existingSupport) {
        const { error: deleteError } = await supabase
            .from("report_supports")
            .delete()
            .eq("id", existingSupport.id)

        if (deleteError) {
            throw new Error(deleteError.message)
        }
    } else {
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

    revalidatePath("/")
    revalidatePath(`/report/${reportId}`)
    revalidatePath(`/reports/${reportId}`)
}