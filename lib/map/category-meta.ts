export const CATEGORY_META: Record<
    string,
    {
        label: string
        color: string
    }
> = {
    rifiuti: {
        label: "Rifiuti",
        color: "#16a34a",
    },
    strade: {
        label: "Strade",
        color: "#dc2626",
    },
    illuminazione: {
        label: "Illuminazione",
        color: "#f59e0b",
    },
    sicurezza: {
        label: "Sicurezza",
        color: "#7c3aed",
    },
    degrado: {
        label: "Degrado urbano",
        color: "#0891b2",
    },
    altro: {
        label: "Altro",
        color: "#6b7280",
    },
}

export function getCategoryMeta(category: string) {
    return (
        CATEGORY_META[category] ?? {
            label: category,
            color: "#2563eb",
        }
    )
}