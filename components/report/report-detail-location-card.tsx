"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReportLocationPreviewMapShell } from "@/components/map/report-location-preview-map-shell"

interface ReportDetailLocationCardProps {
    title: string
    address: string
    lat: number
    lng: number
}

export function ReportDetailLocationCard({
    title,
    address,
    lat,
    lng,
}: ReportDetailLocationCardProps) {
    const externalMapUrl = `https://www.google.com/maps?q=${lat},${lng}`

    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold">Posizione</h2>
                        <p className="text-sm text-muted-foreground">
                            Dove si trova il problema
                        </p>
                    </div>

                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer rounded-full"
                    >
                        <a href={externalMapUrl} target="_blank" rel="noreferrer">
                            Apri mappa
                        </a>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-[24px] border bg-muted/40">
                    <ReportLocationPreviewMapShell
                        title={title}
                        address={address}
                        lat={lat}
                        lng={lng}
                    />
                </div>

                <div className="mt-3 rounded-[22px] bg-muted/40 p-4">
                    <p className="font-medium">{address}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Lat {lat} · Lng {lng}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}