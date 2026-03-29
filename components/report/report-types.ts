export type ReportCategory =
    | "road"
    | "lighting"
    | "waste"
    | "green"
    | "other"

export type ReportCategoryItem = {
    value: ReportCategory
    label: string
    icon: React.ComponentType<{ className?: string }>
}