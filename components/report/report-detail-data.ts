import type { ReportDetail } from "@/components/report/report-detail-types"

export const mockReportDetails: ReportDetail[] = [
    {
        id: "1",
        title: "Buca profonda in Via Roma",
        description:
            "Sono presenti diverse buche profonde lungo la carreggiata, in particolare vicino all'incrocio. Il passaggio in scooter e bici è rischioso, soprattutto di sera.",
        category: "Strade",
        status: "presa_in_carico",
        location: "Centro",
        address: "Via Roma 24, Catania",
        coordinates: {
            lat: 37.5079,
            lng: 15.083,
        },
        updatedAtLabel: "Aggiornata 2 giorni fa",
        createdAtLabel: "Segnalata il 24 marzo 2026",
        supports: 18,
        commentsCount: 6,
        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        reporter: "Mattia R.",

        // 🔥 NUOVI CAMPI
        isCreatedByCurrentUser: true,
        isSupportedByCurrentUser: false,

        updates: [
            {
                id: "u1",
                title: "Segnalazione inviata",
                description:
                    "La segnalazione è stata pubblicata dalla cittadinanza.",
                createdAtLabel: "24 marzo 2026 · 09:12",
                type: "created",
            },
            {
                id: "u2",
                title: "Presa in verifica",
                description:
                    "La situazione è stata inoltrata agli uffici competenti.",
                createdAtLabel: "25 marzo 2026 · 11:30",
                type: "review",
            },
            {
                id: "u3",
                title: "Intervento programmato",
                description:
                    "È stato pianificato un sopralluogo tecnico sul posto.",
                createdAtLabel: "28 marzo 2026 · 08:45",
                type: "progress",
            },
        ],
        comments: [
            {
                id: "c1",
                author: "Giulia",
                text: "Confermo, passando in bici è davvero pericoloso.",
                createdAtLabel: "2 ore fa",
                likes: 4,
            },
            {
                id: "c2",
                author: "Andrea",
                text: "La sera la visibilità è bassa e si evitano con difficoltà.",
                createdAtLabel: "5 ore fa",
                likes: 2,
            },
        ],
    },
    {
        id: "3",
        title: "Segnaletica assente",
        description:
            "Sono presenti diverse buche profonde lungo la carreggiata, in particolare vicino all'incrocio. Il passaggio in scooter e bici è rischioso, soprattutto di sera.",
        category: "Strade",
        status: "presa_in_carico",
        location: "Centro",
        address: "Via Roma 24, Catania",
        coordinates: {
            lat: 37.5079,
            lng: 15.083,
        },
        updatedAtLabel: "Aggiornata 2 giorni fa",
        createdAtLabel: "Segnalata il 24 marzo 2026",
        supports: 18,
        commentsCount: 6,
        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
        reporter: "Mattia R.",

        // 🔥 NUOVI CAMPI
        isCreatedByCurrentUser: true,
        isSupportedByCurrentUser: false,

        updates: [
            {
                id: "u1",
                title: "Segnalazione inviata",
                description:
                    "La segnalazione è stata pubblicata dalla cittadinanza.",
                createdAtLabel: "24 marzo 2026 · 09:12",
                type: "created",
            },
            {
                id: "u2",
                title: "Presa in verifica",
                description:
                    "La situazione è stata inoltrata agli uffici competenti.",
                createdAtLabel: "25 marzo 2026 · 11:30",
                type: "review",
            },
            {
                id: "u3",
                title: "Intervento programmato",
                description:
                    "È stato pianificato un sopralluogo tecnico sul posto.",
                createdAtLabel: "28 marzo 2026 · 08:45",
                type: "progress",
            },
        ],
        comments: [
            {
                id: "c1",
                author: "Giulia",
                text: "Confermo, passando in bici è davvero pericoloso.",
                createdAtLabel: "2 ore fa",
                likes: 4,
            },
            {
                id: "c2",
                author: "Andrea",
                text: "La sera la visibilità è bassa e si evitano con difficoltà.",
                createdAtLabel: "5 ore fa",
                likes: 2,
            },
        ],
    },

    {
        id: "2",
        title: "Cassonetti pieni da giorni",
        description:
            "I cassonetti risultano pieni e parte dei rifiuti è già sul marciapiede. L'area è molto frequentata e la situazione peggiora nelle ore serali.",
        category: "Rifiuti",
        status: "in_verifica",
        location: "Borgo",
        address: "Via Etnea 312, Catania",
        coordinates: {
            lat: 37.5172,
            lng: 15.0904,
        },
        updatedAtLabel: "Aggiornata ieri",
        createdAtLabel: "Segnalata il 22 marzo 2026",
        supports: 21,
        commentsCount: 4,
        image:
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
        reporter: "Utente verificato",

        // 🔥 NUOVI CAMPI
        isCreatedByCurrentUser: false,
        isSupportedByCurrentUser: true,

        updates: [
            {
                id: "u1",
                title: "Segnalazione inviata",
                description: "Segnalazione ricevuta con foto e posizione.",
                createdAtLabel: "22 marzo 2026 · 18:05",
                type: "created",
            },
            {
                id: "u2",
                title: "In verifica",
                description:
                    "Il caso è stato preso in carico per un controllo.",
                createdAtLabel: "23 marzo 2026 · 10:10",
                type: "review",
            },
        ],
        comments: [
            {
                id: "c1",
                author: "Luisa",
                text: "Situazione invariata anche stamattina.",
                createdAtLabel: "Ieri",
                likes: 3,
            },
        ],
    },

    {
        id: "3",
        title: "Lampione non funzionante",
        description:
            "Il lampione davanti al civico 18 non si accende da diversi giorni, rendendo la zona poco illuminata durante la notte.",
        category: "Illuminazione",
        status: "conclusa",
        location: "Centro",
        address: "Via Garibaldi 18, Catania",
        coordinates: {
            lat: 37.5085,
            lng: 15.0821,
        },
        updatedAtLabel: "Chiusa 1 settimana fa",
        createdAtLabel: "Segnalata il 15 marzo 2026",
        supports: 9,
        commentsCount: 2,
        image:
            "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
        reporter: "Mattia R.",

        isCreatedByCurrentUser: true,
        isSupportedByCurrentUser: false,

        updates: [
            {
                id: "u1",
                title: "Segnalazione inviata",
                description: "Segnalazione ricevuta.",
                createdAtLabel: "15 marzo 2026 · 20:10",
                type: "created",
            },
            {
                id: "u2",
                title: "Risolto",
                description: "Il lampione è stato riparato.",
                createdAtLabel: "22 marzo 2026 · 09:00",
                type: "resolved",
            },
        ],
        comments: [],
    },
]

export function getMockReportDetailById(
    id: string
): ReportDetail | null {
    return (
        mockReportDetails.find((report) => report.id === id) ?? null
    )
}