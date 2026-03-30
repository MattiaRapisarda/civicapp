"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ReportDetailsCardProps {
    title: string
    onTitleChange: (value: string) => void
    description: string
    onDescriptionChange: (value: string) => void
    maxLength: number
}

export function ReportDetailsCard({
    title,
    onTitleChange,
    description,
    onDescriptionChange,
    maxLength,
}: ReportDetailsCardProps) {
    return (
        <Card className="rounded-[28px] border bg-card shadow-sm">
            <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                    <h2 className="text-base font-semibold">Dettagli</h2>
                    <p className="text-sm text-muted-foreground">
                        Inserisci un titolo breve e una descrizione chiara del problema.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Titolo</label>
                    <Input
                        value={title}
                        onChange={(event) => onTitleChange(event.target.value)}
                        placeholder="Es. Lampione spento in via Roma"
                        maxLength={80}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Descrizione</label>
                    <Textarea
                        value={description}
                        onChange={(event) =>
                            onDescriptionChange(event.target.value)
                        }
                        placeholder="Descrivi il problema..."
                        maxLength={maxLength}
                        className="min-h-[120px]"
                    />
                    <p className="text-right text-xs text-muted-foreground">
                        {description.length}/{maxLength}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}