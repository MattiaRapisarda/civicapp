"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Map, PlusCircle, Activity, User, Bell } from "lucide-react"

const tabs = [
    { label: "Esplora", icon: Home, path: "/app" },
    { label: "Mappa", icon: Map, path: "/map" },
    { label: "Segnala", icon: PlusCircle, path: "/report/new" },
    { label: "Attività", icon: Bell, path: "/activity" },
    { label: "Profilo", icon: User, path: "/profile" },
]

export function BottomNav() {
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
            <div className="mx-auto flex max-w-5xl justify-between px-4 py-2">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = pathname === tab.path

                    return (
                        <button
                            key={tab.path}
                            onClick={() => router.push(tab.path)}
                            className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs ${isActive
                                ? "text-success"
                                : "text-muted-foreground "
                                }`}
                        >
                            <Icon className="h-5 w-5 cursor-pointer" />
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}