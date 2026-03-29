"use client"

import { Activity, CheckCircle2, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export type HomeTab = "nearby" | "ongoing" | "resolved"

interface TopTabsProps {
    activeTab: HomeTab
    onChange?: (tab: HomeTab) => void
}

const tabs = [
    { key: "nearby" as const, label: "Vicino a te", icon: MapPin },
    { key: "ongoing" as const, label: "In corso", icon: Activity },
    { key: "resolved" as const, label: "Concluse", icon: CheckCircle2 },
]

export function TopTabs({ activeTab, onChange }: TopTabsProps) {
    return (
        <div className="px-4 pt-5 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-2 sm:gap-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.key

                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => onChange?.(tab.key)}
                            className={cn(
                                "flex flex-col items-center gap-2 rounded-2xl px-2 py-3 transition-colors",
                                isActive ? "text-foreground" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer" />

                            <span className="text-xs font-medium sm:text-sm">
                                {tab.label}
                            </span>

                            <div
                                className={cn(
                                    "h-1 rounded-full transition-all",
                                    isActive
                                        ? "w-14 bg-foreground sm:w-16"
                                        : "w-0 bg-transparent"
                                )}
                            />
                        </button>
                    )
                })}
            </div>
        </div>
    )
}