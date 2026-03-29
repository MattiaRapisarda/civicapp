import {
    Bell,
    Lock,
    LogOut,
    Mail,
    Shield,
    User2,
} from "lucide-react"
import type {
    AccountItemData,
    UserProfile,
} from "@/components/profile/profile-types"

export const userProfile: UserProfile = {
    initials: "MR",
    fullName: "Mattia Rapisarda",
    email: "mattia@email.com",
    city: "Catania",
    stats: {
        createdCount: 12,
        supportedCount: 37,
        resolvedCount: 8,
    },
}

export const accountItems: AccountItemData[] = [
    {
        id: "personal-info",
        title: "Informazioni personali",
        subtitle: "Nome, cognome e dati profilo",
        icon: User2,
    },
    {
        id: "email",
        title: "Email",
        subtitle: "mattia@email.com",
        icon: Mail,
    },
    {
        id: "password",
        title: "Password",
        subtitle: "Aggiorna la password di accesso",
        icon: Lock,
    },
    {
        id: "notifications",
        title: "Notifiche",
        subtitle: "Preferenze push e aggiornamenti",
        icon: Bell,
    },
    {
        id: "privacy",
        title: "Privacy",
        subtitle: "Gestione dati e sicurezza",
        icon: Shield,
    },
    {
        id: "logout",
        title: "Esci",
        subtitle: "Disconnetti il tuo account",
        icon: LogOut,
        danger: true,
    },
]