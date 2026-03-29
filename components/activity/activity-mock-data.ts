import type { ActivityReport } from "@/components/activity/activity-types"

export const createdReports: ActivityReport[] = [
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

export const supportedReports: ActivityReport[] = [
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