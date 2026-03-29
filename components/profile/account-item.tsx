import { ChevronRight } from "lucide-react"
import type { AccountItemData } from "@/components/profile/profile-types"

interface AccountItemProps {
    item: AccountItemData
    onClick?: (id: string) => void
}

export function AccountItem({ item, onClick }: AccountItemProps) {
    const Icon = item.icon

    return (
        <button
            type="button"
            onClick={() => onClick?.(item.id)}
            className={`flex w-full items-center justify-between cursor-pointer rounded-2xl px-4 py-4 text-left transition ${item.danger ? "hover:bg-red-50" : "hover:bg-muted/50"
                }`}
        >
            <div className="flex items-center gap-4">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full ${item.danger ? "bg-red-50 text-red-600" : "bg-muted"
                        }`}
                >
                    <Icon className="h-5 w-5" />
                </div>

                <div>
                    <p className={`font-medium ${item.danger ? "text-red-600" : ""}`}>
                        {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
            </div>

            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </button>
    )
}