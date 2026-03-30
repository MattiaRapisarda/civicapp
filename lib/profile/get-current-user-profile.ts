import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function getCurrentUserProfile() {
    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        return null
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, city")
        .eq("id", user.id)
        .maybeSingle()

    if (profileError) {
        console.error("Errore fetch profilo:", profileError)
        return null
    }

    const fullName = `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()

    return {
        id: profile?.id ?? user.id,
        initials: fullName
            .split(" ")
            .filter(Boolean)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        fullName: fullName || "Utente",
        email: user.email ?? "",
        city: profile?.city ?? "",
        stats: {
            createdCount: 0,
            supportedCount: 0,
            resolvedCount: 0,
        },
    }
}