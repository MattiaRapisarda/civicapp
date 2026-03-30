"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import {
    useState,
    type FormEvent,
    type ChangeEvent,
} from "react"
import { Button } from "@/components/ui/button"

export type FilterStatus = "in_corso" | "concluse" | null

interface SearchBarProps {
    placeholder?: string
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    onFilterChange?: (filter: FilterStatus) => void
}

export function SearchBar({
    placeholder = "Cerca via o segnalazione",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    onFilterChange,
}: SearchBarProps) {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterStatus>(null)

    const inputValue = value !== undefined ? value : internalValue

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value

        if (value === undefined) {
            setInternalValue(newValue)
        }

        onChange?.(newValue)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSearch?.(inputValue.trim())
    }

    function toggleFilters() {
        setIsOpen((prev) => !prev)
    }

    function handleFilterSelect(filter: FilterStatus) {
        setSelectedFilter(filter)
        onFilterChange?.(filter)
        setIsOpen(false)
    }

    function getFilterLabel() {
        if (selectedFilter === "in_corso") return "In corso"
        if (selectedFilter === "concluse") return "Concluse"
        return "Tutte"
    }

    return (
        <div className="relative pt-4">
            <form
                onSubmit={handleSubmit}
                className="flex w-full items-center gap-3 rounded-full border bg-background px-4 py-3 shadow-sm sm:px-5 sm:py-4"
            >
                <Search className="h-5 w-5 shrink-0 text-muted-foreground" />

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
                />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 cursor-pointer rounded-full sm:h-10 sm:w-10"
                    onClick={toggleFilters}
                    aria-label="Apri filtri"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </form>

            {selectedFilter !== null ? (
                <div className="mt-2 flex justify-end">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                        Filtro: {getFilterLabel()}
                    </span>
                </div>
            ) : null}

            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border bg-background shadow-md">
                    <button
                        type="button"
                        onClick={() => handleFilterSelect(null)}
                        className={`block w-full cursor-pointer px-4 py-3 text-left text-sm hover:bg-muted ${selectedFilter === null ? "font-semibold" : ""
                            }`}
                    >
                        Tutte
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFilterSelect("in_corso")}
                        className={`block w-full cursor-pointer px-4 py-3 text-left text-sm hover:bg-muted ${selectedFilter === "in_corso" ? "font-semibold" : ""
                            }`}
                    >
                        In corso
                    </button>

                    <button
                        type="button"
                        onClick={() => handleFilterSelect("concluse")}
                        className={`block w-full cursor-pointer px-4 py-3 text-left text-sm hover:bg-muted ${selectedFilter === "concluse" ? "font-semibold" : ""
                            }`}
                    >
                        Concluse
                    </button>
                </div>
            )}
        </div>
    )
}