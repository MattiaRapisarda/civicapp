"use server"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function signup(formData: FormData): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const firstName = String(formData.get("firstName") ?? "").trim()
    const lastName = String(formData.get("lastName") ?? "").trim()
    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase()
    const password = String(formData.get("password") ?? "").trim()
    const acceptTerms = String(formData.get("acceptTerms") ?? "").trim()

    if (!firstName || !lastName || !email || !password) {
        redirect("/signup?error=Compila%20tutti%20i%20campi")
    }

    if (password.length < 8) {
        redirect("/signup?error=La%20password%20deve%20avere%20almeno%208%20caratteri")
    }

    if (!acceptTerms) {
        redirect(
            "/signup?error=" +
            encodeURIComponent("Devi accettare la Privacy Policy e i Termini e Condizioni")
        )
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            data: {
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`,
                accepted_terms: true,
            },
        },
    })

    if (error) {
        redirect(
            `/signup?error=${encodeURIComponent(
                error.message ?? "Errore nella registrazione"
            )}`
        )
    }

    redirect(
        "/login?message=" +
        encodeURIComponent(
            "Registrazione avvenuta con successo."
            //"Registrazione quasi completata. Controlla la tua email e conferma l’account."
        )
    )
}

export async function login(formData: FormData): Promise<void> {
    const supabase = await createSupabaseServerClient()

    const email = String(formData.get("email") ?? "")
        .trim()
        .toLowerCase()
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

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user?.email_confirmed_at) {
        await supabase.auth.signOut()

        redirect(
            "/login?error=" +
            encodeURIComponent("Devi prima confermare la tua email")
        )
    }

    redirect("/profile")
}

export async function logout(): Promise<void> {
    const supabase = await createSupabaseServerClient()

    await supabase.auth.signOut()

    redirect("/login")
}