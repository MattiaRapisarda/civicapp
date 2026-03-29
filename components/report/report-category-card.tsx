import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReportCategory, ReportCategoryItem } from "@/components/report/report-types"

interface ReportCategoryCardProps {
    categories: ReportCategoryItem[]
    selectedCategory: ReportCategory | null
    onSelectCategory: (category: ReportCategory) => void
}

export function ReportCategoryCard({
    categories,
    selectedCategory,
    onSelectCategory,
}: ReportCategoryCardProps) {
    return (
        <Card className="rounded-[28px] border shadow-sm">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <AlertCircle className="h-5 w-5 text-foreground/80" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold">Categoria</h2>
                        <p className="text-sm text-muted-foreground">
                            Scegli il tipo di segnalazione
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {categories.map((item) => {
                        const Icon = item.icon
                        const isActive = selectedCategory === item.value

                        return (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => onSelectCategory(item.value)}
                                className={cn(
                                    "flex min-h-[92px] flex-col items-start justify-between rounded-[24px] border px-4 py-4 text-left transition cursor-pointer",
                                    isActive
                                        ? "border-foreground bg-foreground text-background"
                                        : "bg-background hover:bg-muted/40"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-full",
                                        isActive ? "bg-background/15" : "bg-muted"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <span className="text-sm font-medium leading-snug">
                                    {item.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}