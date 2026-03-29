import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SectionHeaderProps {
    title: string
    actionLabel?: string
}

export function SectionHeader({
    title,
    actionLabel = "Vedi tutto",
}: SectionHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
            </h2>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={actionLabel}
                className="h-11 w-11 rounded-full bg-muted"
            >
                <ArrowRight className="h-5 w-5" />
            </Button>
        </div>
    )
}