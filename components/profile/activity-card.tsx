import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/home/status-badge"
import type { ProfileReport } from "@/components/profile/profile-types"

interface ActivityCardProps {
    report: ProfileReport
    onOpen?: (id: number) => void
}

export function ActivityCard({ report, onOpen }: ActivityCardProps) {
    return (
        <Card className="rounded-[24px] border-0 shadow-sm">
            <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <h3 className="text-base font-semibold leading-snug">
                            {report.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {report.location}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {report.updatedAtLabel}
                        </p>
                    </div>

                    <StatusBadge status={report.status} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {report.supports} supporti
                    </p>

                    <Button
                        type="button"
                        variant="ghost"
                        className="rounded-full"
                        onClick={() => onOpen?.(report.id)}
                    >
                        Vedi dettaglio
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}