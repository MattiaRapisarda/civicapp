import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function requireAdmin() {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        redirect("/login")
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, role, first_name, last_name")
        .eq("id", user.id)
        .single()

    if (profileError || !profile || profile.role !== "admin") {
        redirect("/")
    }

    return { supabase, user, profile }
}