import type { Report } from "@/components/home/report-card"

export const ongoingReports: Report[] = [
    {
        id: 1,
        title: "Illuminazione non funzionante",
        location: "Via Roma · Centro",
        status: "in_verifica",
        updatedAtLabel: "Aggiornata 2 ore fa",
        supports: 18,
        image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Buca stradale pericolosa",
        location: "Piazza Duomo",
        status: "presa_in_carico",
        updatedAtLabel: "Aggiornata 35 min fa",
        supports: 31,
        image:
            "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Segnaletica danneggiata",
        location: "Via Kennedy",
        status: "Presa in carico",
        updatedAtLabel: "Aggiornato 3 giorni fa",
        supports: 9,
        image:
            "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
    },
]

export const resolvedReports: Report[] = [
    {
        id: 3,
        title: "Rifiuti rimossi dall’area verde",
        location: "Villa Comunale",
        status: "conclusa",
        updatedAtLabel: "Chiusa ieri",
        supports: 12,
        image:
            "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Segnaletica ripristinata",
        location: "Via Kennedy",
        status: "conclusa",
        updatedAtLabel: "Chiusa 3 giorni fa",
        supports: 9,
        image:
            "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
    },
]