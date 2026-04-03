"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, Map, PlusCircle, Bell, User } from "lucide-react"

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
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
            <div className="mx-auto flex max-w-5xl items-center gap-1 px-3 py-2 sm:px-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive =
                        pathname === tab.path ||
                        (tab.path !== "/app" && pathname.startsWith(`${tab.path}/`))

                    return (
                        <button
                            key={tab.path}
                            type="button"
                            onClick={() => router.push(tab.path)}
                            aria-current={isActive ? "page" : undefined}
                            className={[
                                "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-all cursor-pointer",
                                "outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                                isActive
                                    ? "bg-card text-success shadow-sm"
                                    : "text-muted-foreground hover:text-success",
                            ].join(" ")}
                        >
                            <Icon
                                className={[
                                    "h-5 w-5 shrink-0 transition-transform",
                                    isActive ? "scale-105" : "",
                                ].join(" ")}
                            />
                            <span className="truncate">{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}