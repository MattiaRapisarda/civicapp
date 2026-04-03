"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

type ToggleSupportResult = {
    supported: boolean
}

export async function toggleSupport(
    reportId: string
): Promise<ToggleSupportResult> {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    console.log("TOGGLE SUPPORT - reportId:", reportId)
    console.log("TOGGLE SUPPORT - userId:", user?.id ?? null)

    if (userError || !user) {
        console.error("TOGGLE SUPPORT - userError:", userError)
        throw new Error("Devi effettuare l'accesso per continuare")
    }

    if (!reportId) {
        throw new Error("Segnalazione non valida")
    }

    const { data: existingSupport, error: existingSupportError } = await supabase
        .from("report_supports")
        .select("report_id, user_id")
        .eq("report_id", reportId)
        .eq("user_id", user.id)
        .maybeSingle()

    console.log("TOGGLE SUPPORT - existingSupport:", existingSupport)
    console.log("TOGGLE SUPPORT - existingSupportError:", existingSupportError)

    if (existingSupportError) {
        throw new Error(existingSupportError.message)
    }

    if (existingSupport) {
        const { error: deleteError } = await supabase
            .from("report_supports")
            .delete()
            .eq("report_id", reportId)
            .eq("user_id", user.id)

        console.log("TOGGLE SUPPORT - deleteError:", deleteError)

        if (deleteError) {
            throw new Error(deleteError.message)
        }

        revalidatePath("/")
        revalidatePath("/activity")
        revalidatePath(`/report/${reportId}`)

        return { supported: false }
    }

    const { data: insertedRow, error: insertError } = await supabase
        .from("report_supports")
        .insert({
            report_id: reportId,
            user_id: user.id,
        })
        .select()

    console.log("TOGGLE SUPPORT - insertedRow:", insertedRow)
    console.log("TOGGLE SUPPORT - insertError:", insertError)

    if (insertError) {
        throw new Error(insertError.message)
    }

    revalidatePath("/")
    revalidatePath("/activity")
    revalidatePath(`/report/${reportId}`)

    return { supported: true }
}