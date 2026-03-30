"use client"

import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface EditableAccountItemProps {
    title: string
    subtitle: string
    field: string
    label: string
    defaultValue: string
    inputType?: "text" | "email" | "password"
    onSave: (field: string, value: string) => Promise<void>
    isSaving?: boolean
}

export function EditableAccountItem({
    title,
    subtitle,
    field,
    label,
    defaultValue,
    inputType = "text",
    onSave,
    isSaving = false,
}: EditableAccountItemProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [value, setValue] = useState(defaultValue)

    const isDirty = value.trim() !== defaultValue.trim()

    useEffect(() => {
        if (!isOpen) {
            setValue(defaultValue)
        }
    }, [isOpen, defaultValue])

    const handleSave = async () => {
        if (!isDirty || isSaving) return
        await onSave(field, value)
        setIsOpen(false)
    }

    return (
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between cursor-pointer px-5 py-4 text-left transition hover:bg-muted/40"
            >
                <div className="min-w-0">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="truncate text-sm text-muted-foreground">
                        {subtitle}
                    </p>
                </div>

                <div className="ml-4 shrink-0">
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="border-t px-5 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                {label}
                            </label>
                            <input
                                type={inputType}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder={label}
                                className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!isDirty || isSaving}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${!isDirty || isSaving
                                        ? "cursor-not-allowed bg-muted text-muted-foreground"
                                        : "bg-foreground text-background hover:opacity-90"
                                    }`}
                            >
                                {isSaving ? "Salvataggio..." : "Salva"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}