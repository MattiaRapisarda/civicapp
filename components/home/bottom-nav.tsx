"use client"

import { Bell, MapPin, Search, User, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type BottomNavItem = "explore" | "map" | "report" | "activity" | "profile"

interface BottomNavProps {
    activeItem?: BottomNavItem
}

const items = [
    { key: "explore" as const, label: "Esplora", icon: Search },
    { key: "map" as const, label: "Mappa", icon: MapPin },

    // 🔥 CTA centrale
    { key: "report" as const, label: "Segnala", icon: PlusCircle, isPrimary: true },

    { key: "activity" as const, label: "Attività", icon: Bell },
    { key: "profile" as const, label: "Profilo", icon: User },
]

export function BottomNav({ activeItem = "explore" }: BottomNavProps) {
    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-md grid-cols-5 px-4 py-2">
                {items.map((item) => {
                    const Icon = item.icon
                    const isActive = item.key === activeItem

                    if (item.isPrimary) {
                        return (
                            <button
                                key={item.key}
                                className="flex flex-col items-center justify-center gap-1"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-md">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <span className="text-xs font-medium">Segnala</span>
                            </button>
                        )
                    }

                    return (
                        <button
                            key={item.key}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}