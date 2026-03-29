import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
    placeholder?: string
}

export function SearchBar({
    placeholder = "Cerca via, quartiere o problema",
}: SearchBarProps) {
    return (
        <div className="px-4 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-full border bg-background px-4 py-3 shadow-sm sm:px-5 sm:py-4">
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground sm:text-base">
                        {placeholder}
                    </p>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}