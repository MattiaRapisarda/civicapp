"use client"

import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ReportAbuseDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    abuseReason: string
    abuseDetails: string
    abuseError: string | null
    abuseSuccess: string | null
    isPending: boolean
    onReasonChange: (value: string) => void
    onDetailsChange: (value: string) => void
    onSubmit: () => void
}

export function ReportAbuseDialog({
    open,
    onOpenChange,
    abuseReason,
    abuseDetails,
    abuseError,
    abuseSuccess,
    isPending,
    onReasonChange,
    onDetailsChange,
    onSubmit,
}: ReportAbuseDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="h-12 cursor-pointer rounded-full text-destructive hover:text-destructive"
                >
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Segnala abuso
                </Button>
            </DialogTrigger>

            <DialogContent className="rounded-[24px] sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Segnala abuso</DialogTitle>
                    <DialogDescription>
                        Indica il motivo per cui ritieni questa segnalazione non appropriata.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="space-y-3">
                        <Label>Tipo di abuso</Label>

                        <RadioGroup
                            value={abuseReason}
                            onValueChange={onReasonChange}
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                <RadioGroupItem value="non_veritiero" id="abuse-non-veritiero" />
                                <Label htmlFor="abuse-non-veritiero" className="cursor-pointer">
                                    Non veritiero
                                </Label>
                            </div>

                            <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                <RadioGroupItem value="non_inerente" id="abuse-non-inerente" />
                                <Label htmlFor="abuse-non-inerente" className="cursor-pointer">
                                    Non inerente
                                </Label>
                            </div>

                            <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                <RadioGroupItem value="offensivo" id="abuse-offensivo" />
                                <Label htmlFor="abuse-offensivo" className="cursor-pointer">
                                    Offensivo
                                </Label>
                            </div>

                            <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                <RadioGroupItem value="spam" id="abuse-spam" />
                                <Label htmlFor="abuse-spam" className="cursor-pointer">
                                    Spam
                                </Label>
                            </div>

                            <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                <RadioGroupItem value="altro" id="abuse-altro" />
                                <Label htmlFor="abuse-altro" className="cursor-pointer">
                                    Altro
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="abuse-details">
                            Dettagli aggiuntivi
                            <span className="ml-1 text-muted-foreground">(opzionale)</span>
                        </Label>

                        <textarea
                            id="abuse-details"
                            value={abuseDetails}
                            onChange={(event) => onDetailsChange(event.target.value)}
                            placeholder="Aggiungi informazioni utili per la verifica..."
                            className="min-h-28 w-full resize-none rounded-[18px] border bg-background px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground/20"
                        />
                    </div>

                    {abuseError ? (
                        <p className="text-sm text-destructive">{abuseError}</p>
                    ) : abuseSuccess ? (
                        <p className="text-sm text-emerald-600">{abuseSuccess}</p>
                    ) : (
                        <p className="text-xs text-muted-foreground">
                            La tua segnalazione verrà registrata e verificata.
                        </p>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => onOpenChange(false)}
                    >
                        Annulla
                    </Button>

                    <Button
                        type="button"
                        className="rounded-full"
                        onClick={onSubmit}
                        disabled={isPending || !abuseReason}
                    >
                        {isPending ? "Invio..." : "Invia segnalazione"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}