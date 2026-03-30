export type ReportCategory =
    | "Buche e strada"
    | "Illuminazione"
    | "Rifiuti"
    | "Verde pubblico"
    | "Altro"

export type ReportCategoryItem = {
    value: ReportCategory
    label: string
    icon: React.ComponentType<{ className?: string }>
}