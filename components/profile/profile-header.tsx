import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/components/profile/profile-types"

interface ProfileHeaderProps {
    user: UserProfile
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold">
                            {user.initials}
                        </div>

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {user.fullName}
                            </h1>

                            <p className="text-sm text-muted-foreground">{user.email}</p>

                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{user.city}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-muted/60 p-4 text-center">
                        <p className="text-2xl font-semibold">{user.stats.createdCount}</p>
                        <p className="text-xs text-muted-foreground">
                            Segnalazioni create
                        </p>
                    </div>

                    <div className="rounded-2xl bg-muted/60 p-4 text-center">
                        <p className="text-2xl font-semibold">{user.stats.supportedCount}</p>
                        <p className="text-xs text-muted-foreground">
                            Supporti dati
                        </p>
                    </div>

                    <div className="rounded-2xl bg-muted/60 p-4 text-center">
                        <p className="text-2xl font-semibold">{user.stats.resolvedCount}</p>
                        <p className="text-xs text-muted-foreground">
                            Risolte
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}