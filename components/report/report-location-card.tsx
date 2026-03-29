import { ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReportLocationCardProps {
    address: string
    onAddressChange: (value: string) => void
    onUseCurrentLocation: () => void
}

export function ReportLocationCard({
    address,
    onAddressChange,
    onUseCurrentLocation,
}: ReportLocationCardProps) {
    return (
        <Card className="rounded-[28px] border shadow-sm">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <MapPin className="h-5 w-5 text-foreground/80" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold">Posizione</h2>
                        <p className="text-sm text-muted-foreground">
                            Indica dove si trova il problema
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="overflow-hidden rounded-[24px] bg-muted/40">
                        <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
                            Mappa / picker posizione
                        </div>
                    </div>

                    <input
                        type="text"
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onAddressChange(e.target.value)
                        }
                        placeholder="Via, piazza o riferimento"
                        className="h-12 w-full rounded-2xl border bg-background px-4 text-sm shadow-none outline-none"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onUseCurrentLocation}
                        className="h-11 w-full justify-between rounded-2xl border px-4 cursor-pointer"
                    >
                        Usa la mia posizione
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}