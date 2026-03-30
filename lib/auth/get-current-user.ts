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
        .select("id, full_name, email, city")
        .eq("id", user.id)
        .single()

    if (profileError || !profile) {
        console.error("Errore fetch profilo:", profileError)
        return null
    }

    return {
        id: profile.id,
        initials: profile.full_name
            ?.split(" ")
            .map((part: string) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() ?? "",
        fullName: profile.full_name ?? "",
        email: profile.email ?? "",
        city: profile.city ?? "",
        stats: {
            createdCount: 0,
            supportedCount: 0,
            resolvedCount: 0,
        },
    }
}