"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function createComment(
    reportId: string,
    formData: FormData
): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const content = String(formData.get("content") ?? "").trim()

    if (!content) {
        return
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("Utente non autenticato")
    }

    const { error } = await supabase.from("comments").insert({
        report_id: reportId,
        user_id: user.id,
        content,
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath(`/reports/${reportId}`)
}