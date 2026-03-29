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
    ProfileReport,
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

export const createdReports: ProfileReport[] = [
    {
        id: 1,
        title: "Buca profonda in Via Roma",
        location: "Via Roma, Centro",
        status: "presa_in_carico",
        updatedAtLabel: "Aggiornata 2 giorni fa",
        supports: 18,
    },
    {
        id: 2,
        title: "Lampione non funzionante",
        location: "Piazza Garibaldi",
        status: "conclusa",
        updatedAtLabel: "Chiusa 1 settimana fa",
        supports: 9,
    },
    {
        id: 3,
        title: "Cestino stradale danneggiato",
        location: "Via Etnea",
        status: "in_verifica",
        updatedAtLabel: "In attesa da 3 giorni",
        supports: 6,
    },
]

export const supportedReports: ProfileReport[] = [
    {
        id: 4,
        title: "Marciapiede dissestato",
        location: "Via Verdi",
        status: "in_verifica",
        updatedAtLabel: "Aggiornata ieri",
        supports: 24,
    },
    {
        id: 5,
        title: "Rifiuti abbandonati",
        location: "Parco comunale",
        status: "presa_in_carico",
        updatedAtLabel: "Aggiornata 3 giorni fa",
        supports: 31,
    },
    {
        id: 6,
        title: "Segnaletica scolorita",
        location: "Corso Italia",
        status: "conclusa",
        updatedAtLabel: "Chiusa 5 giorni fa",
        supports: 14,
    },
]