import { Card, CardContent } from "@/components/ui/card"
import { AccountItem } from "@/components/profile/account-item"
import type { AccountItemData } from "@/components/profile/profile-types"

interface AccountSectionProps {
    items: AccountItemData[]
    onItemClick?: (id: string) => void
}

export function AccountSection({
    items,
    onItemClick,
}: AccountSectionProps) {
    return (
        <section className="space-y-3">
            <div className="px-1">
                <h2 className="text-lg font-semibold tracking-tight">Account</h2>
                <p className="text-sm text-muted-foreground">
                    Gestisci le informazioni del tuo profilo e la sicurezza.
                </p>
            </div>

            <Card className="rounded-[28px] border-0 shadow-sm">
                <CardContent className="p-2">
                    <div className="divide-y">
                        {items.map((item) => (
                            <AccountItem
                                key={item.id}
                                item={item}
                                onClick={onItemClick}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}