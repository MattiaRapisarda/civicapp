"use client"

import { useRouter } from "next/navigation"
import { Bell, MapPin, Search, User, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type BottomNavItem = "explore" | "map" | "report" | "activity" | "profile"

interface BottomNavProps {
    activeItem?: BottomNavItem
}

const items = [
    { key: "explore" as const, label: "Esplora", icon: Search, href: "/" },
    { key: "map" as const, label: "Mappa", icon: MapPin, href: "/map" },

    // 🔥 CTA
    { key: "report" as const, label: "Segnala", icon: PlusCircle, isPrimary: true, href: "/report/new" },

    { key: "activity" as const, label: "Attività", icon: Bell, href: "/activity" },
    { key: "profile" as const, label: "Profilo", icon: User, href: "/profile" },
]

export function BottomNav({ activeItem = "explore" }: BottomNavProps) {
    const router = useRouter()

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
                                onClick={() => router.push(item.href)}
                                className="flex flex-col items-center justify-center gap-1 cursor-pointer"
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
                            onClick={() => router.push(item.href)}
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