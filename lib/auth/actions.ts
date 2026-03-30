"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function signup(formData: FormData): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const firstName = String(formData.get("firstName") ?? "").trim()
    const lastName = String(formData.get("lastName") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "").trim()

    if (!firstName || !lastName || !email || !password) {
        redirect("/signup?error=Compila%20tutti%20i%20campi")
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error || !data.user) {
        redirect(
            `/signup?error=${encodeURIComponent(
                error?.message ?? "Errore nella registrazione"
            )}`
        )
    }

    const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({
            first_name: firstName,
            last_name: lastName,
        })
        .eq("id", data.user.id)

    if (profileUpdateError) {
        redirect(
            `/signup?error=${encodeURIComponent(
                "Profilo creato ma nome e cognome non aggiornati: " +
                profileUpdateError.message
            )}`
        )
    }

    redirect("/login?message=Account%20creato%20correttamente")
}

export async function login(formData: FormData): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "").trim()

    if (!email || !password) {
        redirect("/login?error=Inserisci%20email%20e%20password")
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        redirect(
            `/login?error=${encodeURIComponent(
                error.message || "Credenziali non valide"
            )}`
        )
    }

    redirect("/profile")
}

export async function logout(): Promise<void> {
    const supabase = await createSupabaseServerClient()

    await supabase.auth.signOut()

    redirect("/login")
}