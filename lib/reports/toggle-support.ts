"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export type ToggleSupportResult =
    | { success: true; supported: boolean }
    | { success: false; error: string }

export async function toggleSupport(
    reportId: string
): Promise<ToggleSupportResult> {
    try {
        const supabase = await createSupabaseServerClient()

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        console.log("TOGGLE SUPPORT - reportId:", reportId)
        console.log("TOGGLE SUPPORT - userId:", user?.id ?? null)

        if (userError || !user) {
            console.error("TOGGLE SUPPORT - userError:", userError)
            return {
                success: false,
                error: "Devi effettuare l'accesso per continuare",
            }
        }

        if (!reportId) {
            return {
                success: false,
                error: "Segnalazione non valida",
            }
        }

        const { data: existingSupport, error: existingSupportError } =
            await supabase
                .from("report_supports")
                .select("report_id, user_id")
                .eq("report_id", reportId)
                .eq("user_id", user.id)
                .maybeSingle()

        console.log("TOGGLE SUPPORT - existingSupport:", existingSupport)
        console.log(
            "TOGGLE SUPPORT - existingSupportError:",
            existingSupportError
        )

        if (existingSupportError) {
            console.error(
                "TOGGLE SUPPORT - existingSupportError:",
                existingSupportError
            )
            return {
                success: false,
                error: "Errore durante la verifica del supporto",
            }
        }

        if (existingSupport) {
            const { error: deleteError } = await supabase
                .from("report_supports")
                .delete()
                .eq("report_id", reportId)
                .eq("user_id", user.id)

            console.log("TOGGLE SUPPORT - deleteError:", deleteError)

            if (deleteError) {
                console.error("TOGGLE SUPPORT - deleteError:", deleteError)
                return {
                    success: false,
                    error: "Impossibile rimuovere il supporto",
                }
            }

            revalidatePath("/")
            revalidatePath("/activity")
            revalidatePath(`/report/${reportId}`)

            return { success: true, supported: false }
        }

        const { error: insertError } = await supabase
            .from("report_supports")
            .insert({
                report_id: reportId,
                user_id: user.id,
            })

        console.log("TOGGLE SUPPORT - insertError:", insertError)

        if (insertError) {
            console.error("TOGGLE SUPPORT - insertError:", insertError)
            return {
                success: false,
                error: "Impossibile aggiungere il supporto",
            }
        }

        revalidatePath("/")
        revalidatePath("/activity")
        revalidatePath(`/report/${reportId}`)

        return { success: true, supported: true }
    } catch (error) {
        console.error("TOGGLE SUPPORT - unexpected error:", error)

        return {
            success: false,
            error: "Si è verificato un errore imprevisto",
        }
    }
}