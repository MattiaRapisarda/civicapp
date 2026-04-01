"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    Clock3,
    Heart,
    MapPin,
    MessageCircle,
    ShieldAlert,
    Sparkles,
    Wrench,
} from "lucide-react"

import { StatusBadge } from "@/components/home/status-badge"
import { ReportLocationPreviewMapShell } from "@/components/map/report-location-preview-map-shell"
import type {
    ReportDetail,
    ReportUpdate,
} from "@/components/report/report-detail-types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { createAbuseReport } from "@/lib/reports/create-abuse-report"
import { createComment } from "@/lib/reports/create-comment"
import { toggleSupport } from "@/lib/reports/toggle-support"
import { cn } from "@/lib/utils"

interface ReportDetailPageProps {
    report: ReportDetail
}

function getUpdateIcon(type: ReportUpdate["type"]) {
    switch (type) {
        case "created":
            return AlertTriangle
        case "review":
            return Clock3
        case "progress":
            return Wrench
        case "resolved":
            return CheckCircle2
        default:
            return Sparkles
    }
}

function getUpdateIconClasses(type: ReportUpdate["type"]) {
    switch (type) {
        case "created":
            return "bg-amber-100 text-amber-700"
        case "review":
            return "bg-sky-100 text-sky-700"
        case "progress":
            return "bg-violet-100 text-violet-700"
        case "resolved":
            return "bg-emerald-100 text-emerald-700"
        default:
            return "bg-muted text-foreground"
    }
}

export function ReportDetailPage({ report }: ReportDetailPageProps) {
    const router = useRouter()

    const [comment, setComment] = useState("")
    const [isSupportPending, startSupportTransition] = useTransition()
    const [isCommentPending, startCommentTransition] = useTransition()
    const [isAbusePending, startAbuseTransition] = useTransition()

    const [supportError, setSupportError] = useState<string | null>(null)
    const [commentError, setCommentError] = useState<string | null>(null)

    const [isAbuseDialogOpen, setIsAbuseDialogOpen] = useState(false)
    const [abuseReason, setAbuseReason] = useState("")
    const [abuseDetails, setAbuseDetails] = useState("")
    const [abuseError, setAbuseError] = useState<string | null>(null)
    const [abuseSuccess, setAbuseSuccess] = useState<string | null>(null)

    const handleToggleSupport = () => {
        setSupportError(null)

        startSupportTransition(async () => {
            try {
                await toggleSupport(report.id)
                router.refresh()
            } catch (error) {
                setSupportError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile aggiornare il supporto."
                )
            }
        })
    }

    const handleSubmitComment = () => {
        setCommentError(null)

        startCommentTransition(async () => {
            try {
                const trimmedComment = comment.trim()

                if (!trimmedComment) {
                    setCommentError("Il commento non può essere vuoto.")
                    return
                }

                const formData = new FormData()
                formData.append("comment", trimmedComment)

                const result = await createComment(report.id, formData)

                if (!result.success) {
                    setCommentError(result.error)
                    return
                }

                setComment("")
                router.refresh()
            } catch (error) {
                setCommentError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile pubblicare il commento."
                )
            }
        })
    }

    const handleSubmitAbuseReport = () => {
        setAbuseError(null)
        setAbuseSuccess(null)

        startAbuseTransition(async () => {
            try {
                if (!abuseReason) {
                    setAbuseError("Seleziona il tipo di abuso.")
                    return
                }

                const formData = new FormData()
                formData.append("reason", abuseReason)
                formData.append("details", abuseDetails.trim())

                const result = await createAbuseReport(report.id, formData)

                if (!result.success) {
                    setAbuseError(result.error)
                    return
                }

                setAbuseSuccess("Segnalazione inviata correttamente.")
                setAbuseReason("")
                setAbuseDetails("")
                router.refresh()

                setTimeout(() => {
                    setIsAbuseDialogOpen(false)
                    setAbuseSuccess(null)
                }, 1000)
            } catch (error) {
                setAbuseError(
                    error instanceof Error
                        ? error.message
                        : "Non è stato possibile inviare la segnalazione."
                )
            }
        })
    }

    const externalMapUrl = `https://www.google.com/maps?q=${report.coordinates.lat},${report.coordinates.lng}`

    return (
        <main className="min-h-screen bg-background pb-28">
            <section className="relative">
                <div className="relative h-70 w-full overflow-hidden sm:h-90">
                    <img
                        src={report.image}
                        alt={report.title}
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-background" />

                    <div className="absolute left-0 right-0 top-0 z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 pt-5 sm:px-6 lg:px-8">
                        <Button
                            asChild
                            variant="secondary"
                            size="icon"
                            className="rounded-full border-0 bg-white/90 shadow-sm backdrop-blur"
                        >
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>

                        <StatusBadge status={report.status} />
                    </div>
                </div>
            </section>

            <section className="-mt-10 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                    <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
                        <CardContent className="space-y-6 p-5 sm:p-6">
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="rounded-full px-3 py-1 text-xs font-medium"
                                    >
                                        {report.category}
                                    </Badge>

                                    <span className="text-sm text-muted-foreground">
                                        {report.updatedAtLabel}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                                        {report.title}
                                    </h1>

                                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>
                                            {report.address} · {report.location}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm leading-6 text-foreground/90 sm:text-[15px]">
                                    {report.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-[22px] bg-muted/60 p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Heart className="h-4 w-4" />
                                        <span className="text-xs">Supporti</span>
                                    </div>
                                    <p className="mt-2 text-xl font-semibold">{report.supports}</p>
                                </div>

                                <div className="rounded-[22px] bg-muted/60 p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="text-xs">Commenti</span>
                                    </div>
                                    <p className="mt-2 text-xl font-semibold">
                                        {report.commentsCount}
                                    </p>
                                </div>

                                <div className="rounded-[22px] bg-muted/60 p-4">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock3 className="h-4 w-4" />
                                        <span className="text-xs">Creata</span>
                                    </div>
                                    <p className="mt-2 text-sm font-medium leading-5">
                                        {report.createdAtLabel}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Button
                                        onClick={handleToggleSupport}
                                        disabled={isSupportPending}
                                        className={cn(
                                            "h-12 w-full cursor-pointer rounded-full text-sm font-medium",
                                            report.isSupportedByCurrentUser &&
                                            "bg-foreground text-background hover:bg-foreground/90"
                                        )}
                                    >
                                        <Heart
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                report.isSupportedByCurrentUser && "fill-current"
                                            )}
                                        />
                                        {isSupportPending
                                            ? "Aggiornamento..."
                                            : report.isSupportedByCurrentUser
                                                ? "Rimuovi supporto"
                                                : "Supporta segnalazione"}
                                    </Button>

                                    {supportError ? (
                                        <p className="text-sm text-destructive">{supportError}</p>
                                    ) : null}
                                </div>

                                <Button
                                    variant="outline"
                                    className="h-12 cursor-pointer rounded-full border-border text-sm font-medium"
                                    onClick={() =>
                                        document.getElementById("comment")?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                        })
                                    }
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Aggiungi commento
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

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
                                    title={report.title}
                                    address={report.address}
                                    lat={report.coordinates.lat}
                                    lng={report.coordinates.lng}
                                />
                            </div>

                            <div className="mt-3 rounded-[22px] bg-muted/40 p-4">
                                <p className="font-medium">{report.address}</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Lat {report.coordinates.lat} · Lng {report.coordinates.lng}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
                        <CardContent className="p-5 sm:p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold">Aggiornamenti</h2>
                                <p className="text-sm text-muted-foreground">
                                    Timeline della segnalazione
                                </p>
                            </div>

                            <div className="space-y-5">
                                {report.updates.map((update, index) => {
                                    const Icon = getUpdateIcon(update.type)

                                    return (
                                        <div key={update.id} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={cn(
                                                        "flex h-10 w-10 items-center justify-center rounded-full",
                                                        getUpdateIconClasses(update.type)
                                                    )}
                                                >
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                {index < report.updates.length - 1 ? (
                                                    <div className="mt-2 h-full w-px bg-border" />
                                                ) : null}
                                            </div>

                                            <div className="flex-1 pb-4">
                                                <div className="rounded-[22px] bg-muted/50 p-4">
                                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                                        <h3 className="font-medium">{update.title}</h3>
                                                        <span className="text-xs text-muted-foreground">
                                                            {update.createdAtLabel}
                                                        </span>
                                                    </div>

                                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                        {update.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
                        <CardContent className="space-y-5 p-5 sm:p-6">
                            <div>
                                <h2 className="text-lg font-semibold">Commenti</h2>
                                <p className="text-sm text-muted-foreground">
                                    Contributi della comunità
                                </p>
                            </div>

                            <div className="rounded-[24px] border bg-background p-4">
                                <label
                                    htmlFor="comment"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Aggiungi un commento
                                </label>

                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    placeholder="Scrivi un aggiornamento o condividi la tua esperienza..."
                                    className="min-h-27.5 w-full resize-none rounded-[18px] border bg-background px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground/20"
                                />

                                <div className="mt-3 flex items-center justify-between gap-3">
                                    {commentError ? (
                                        <p className="text-sm text-destructive">{commentError}</p>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            Condividi informazioni utili e verificabili.
                                        </span>
                                    )}

                                    <Button
                                        onClick={handleSubmitComment}
                                        disabled={isCommentPending || comment.trim().length === 0}
                                        className="cursor-pointer rounded-full"
                                    >
                                        {isCommentPending
                                            ? "Pubblicazione..."
                                            : "Pubblica commento"}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {report.comments.map((commentItem) => (
                                    <div
                                        key={commentItem.id}
                                        className="rounded-[24px] bg-muted/50 p-4"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div>
                                                <p className="font-medium">{commentItem.author}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {commentItem.createdAtLabel}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Heart className="h-4 w-4" />
                                                <span>{commentItem.likes}</span>
                                            </div>
                                        </div>

                                        <p className="mt-3 text-sm leading-6 text-foreground/90">
                                            {commentItem.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
                        <CardContent className="space-y-4 p-5 sm:p-6">
                            <div>
                                <h2 className="text-lg font-semibold">Dettagli aggiuntivi</h2>
                                <p className="text-sm text-muted-foreground">
                                    Informazioni utili sulla segnalazione
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-[22px] bg-muted/60 p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Segnalata da
                                    </p>
                                    <p className="mt-2 font-medium">{report.reporter}</p>
                                </div>

                                <div className="rounded-[22px] bg-muted/60 p-4">
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                        Categoria
                                    </p>
                                    <p className="mt-2 font-medium">{report.category}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Button
                                    onClick={handleToggleSupport}
                                    disabled={isSupportPending}
                                    className={cn(
                                        "h-12 w-full cursor-pointer rounded-full text-sm font-medium",
                                        report.isSupportedByCurrentUser &&
                                        "bg-foreground text-background hover:bg-foreground/90"
                                    )}
                                >
                                    <Heart
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            report.isSupportedByCurrentUser && "fill-current"
                                        )}
                                    />
                                    {isSupportPending
                                        ? "Aggiornamento..."
                                        : report.isSupportedByCurrentUser
                                            ? "Rimuovi supporto"
                                            : "Supporta segnalazione"}
                                </Button>

                                {supportError ? (
                                    <p className="text-sm text-destructive">{supportError}</p>
                                ) : null}
                            </div>

                            <div>
                                <Dialog
                                    open={isAbuseDialogOpen}
                                    onOpenChange={(open) => {
                                        setIsAbuseDialogOpen(open)

                                        if (!open) {
                                            setAbuseReason("")
                                            setAbuseDetails("")
                                            setAbuseError(null)
                                            setAbuseSuccess(null)
                                        }
                                    }}
                                >
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
                                                Indica il motivo per cui ritieni questa segnalazione
                                                non appropriata.
                                            </DialogDescription>
                                        </DialogHeader>

                                        <div className="space-y-5">
                                            <div className="space-y-3">
                                                <Label>Tipo di abuso</Label>

                                                <RadioGroup
                                                    value={abuseReason}
                                                    onValueChange={setAbuseReason}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                                        <RadioGroupItem
                                                            value="non_veritiero"
                                                            id="abuse-non-veritiero"
                                                        />
                                                        <Label
                                                            htmlFor="abuse-non-veritiero"
                                                            className="cursor-pointer"
                                                        >
                                                            Non veritiero
                                                        </Label>
                                                    </div>

                                                    <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                                        <RadioGroupItem
                                                            value="non_inerente"
                                                            id="abuse-non-inerente"
                                                        />
                                                        <Label
                                                            htmlFor="abuse-non-inerente"
                                                            className="cursor-pointer"
                                                        >
                                                            Non inerente
                                                        </Label>
                                                    </div>

                                                    <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                                        <RadioGroupItem
                                                            value="offensivo"
                                                            id="abuse-offensivo"
                                                        />
                                                        <Label
                                                            htmlFor="abuse-offensivo"
                                                            className="cursor-pointer"
                                                        >
                                                            Offensivo
                                                        </Label>
                                                    </div>

                                                    <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                                        <RadioGroupItem
                                                            value="spam"
                                                            id="abuse-spam"
                                                        />
                                                        <Label
                                                            htmlFor="abuse-spam"
                                                            className="cursor-pointer"
                                                        >
                                                            Spam
                                                        </Label>
                                                    </div>

                                                    <div className="flex items-center space-x-3 rounded-[16px] border p-3">
                                                        <RadioGroupItem
                                                            value="altro"
                                                            id="abuse-altro"
                                                        />
                                                        <Label
                                                            htmlFor="abuse-altro"
                                                            className="cursor-pointer"
                                                        >
                                                            Altro
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="abuse-details">
                                                    Dettagli aggiuntivi
                                                    <span className="ml-1 text-muted-foreground">
                                                        (opzionale)
                                                    </span>
                                                </Label>

                                                <textarea
                                                    id="abuse-details"
                                                    value={abuseDetails}
                                                    onChange={(event) =>
                                                        setAbuseDetails(event.target.value)
                                                    }
                                                    placeholder="Aggiungi informazioni utili per la verifica..."
                                                    className="min-h-28 w-full resize-none rounded-[18px] border bg-background px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground/20"
                                                />
                                            </div>

                                            {abuseError ? (
                                                <p className="text-sm text-destructive">
                                                    {abuseError}
                                                </p>
                                            ) : abuseSuccess ? (
                                                <p className="text-sm text-emerald-600">
                                                    {abuseSuccess}
                                                </p>
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
                                                onClick={() => setIsAbuseDialogOpen(false)}
                                            >
                                                Annulla
                                            </Button>

                                            <Button
                                                type="button"
                                                className="rounded-full"
                                                onClick={handleSubmitAbuseReport}
                                                disabled={isAbusePending || !abuseReason}
                                            >
                                                {isAbusePending
                                                    ? "Invio..."
                                                    : "Invia segnalazione"}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </main>
    )
}