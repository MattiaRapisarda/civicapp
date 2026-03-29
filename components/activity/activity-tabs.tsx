import type { ActivityTab } from "@/components/activity/activity-types"

interface ActivityTabsProps {
    activeTab: ActivityTab
    onChange: (tab: ActivityTab) => void
}

export function ActivityTabs({
    activeTab,
    onChange,
}: ActivityTabsProps) {
    return (
        <div className="flex gap-2 rounded-full bg-muted p-1">
            <button
                type="button"
                onClick={() => onChange("created")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${activeTab === "created"
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground"
                    }`}
            >
                Le mie segnalazioni
            </button>

            <button
                type="button"
                onClick={() => onChange("supported")}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${activeTab === "supported"
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground"
                    }`}
            >
                Supportate da me
            </button>
        </div>
    )
}