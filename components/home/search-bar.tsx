"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import {
    useState,
    type FormEvent,
    type ChangeEvent,
} from "react"
import { Button } from "@/components/ui/button"

type FilterStatus = "in_corso" | "concluse" | null

interface SearchBarProps {
    placeholder?: string
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    onFilterChange?: (filter: FilterStatus) => void
}

export function SearchBar({
    placeholder = "Cerca via o problema",
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

    return (
        <div className="relative px-4 pt-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-5xl items-center gap-3 rounded-full border bg-background px-4 py-3 shadow-sm sm:px-5 sm:py-4"
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
                >
                    <SlidersHorizontal className="h-4 w-4" />
                </Button>
            </form>

            {/* Dropdown filtri */}
            {isOpen && (
                <div className="absolute right-6 mt-2 w-48 rounded-xl border bg-background shadow-md">
                    <button
                        onClick={() => handleFilterSelect("in_corso")}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-muted ${selectedFilter === "in_corso" ? "font-semibold" : ""
                            }`}
                    >
                        In corso
                    </button>

                    <button
                        onClick={() => handleFilterSelect("concluse")}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-muted ${selectedFilter === "concluse" ? "font-semibold" : ""
                            }`}
                    >
                        Concluse
                    </button>
                </div>
            )}
        </div>
    )
}