import { FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ReportDetailsCardProps {
    description: string
    onDescriptionChange: (value: string) => void
    maxLength?: number
}

export function ReportDetailsCard({
    description,
    onDescriptionChange,
    maxLength = 240,
}: ReportDetailsCardProps) {
    return (
        <Card className="rounded-[28px] border shadow-sm">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <FileText className="h-5 w-5 text-foreground/80" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold">Dettagli</h2>
                        <p className="text-sm text-muted-foreground">
                            Aggiungi una breve descrizione
                        </p>
                    </div>
                </div>

                <textarea
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        onDescriptionChange(e.target.value)
                    }
                    maxLength={maxLength}
                    placeholder="Descrivi brevemente il problema..."
                    className="min-h-30 w-full resize-none rounded-[24px] border bg-background px-4 py-3 text-sm shadow-none outline-none"
                />

                <div className="mt-2 text-right text-xs text-muted-foreground">
                    {description.length}/{maxLength}
                </div>
            </CardContent>
        </Card>
    )
}