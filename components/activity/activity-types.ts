export type ActivityTab = "created" | "supported"

export type ActivityReport = {
    id: string
    title: string
    location: string
    status: "in_verifica" | "presa_in_carico" | "conclusa"
    updatedAtLabel: string
    supports: number
}