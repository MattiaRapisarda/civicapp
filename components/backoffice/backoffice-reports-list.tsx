"use client"

import { useMemo, useState, useTransition } from "react"
import { addTimelineUpdate, updateReportStatus } from "@/app/backoffice/actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ReportUpdate = {
    id: string
    title: string
    description: string
    type: string | null
    is_public: boolean
    created_at: string
}

type Support = {
    report_id: string
    user_id: string
}

type ProfileRef =
    | {
        first_name: string | null
        last_name: string | null
    }
    | {
        first_name: string | null
        last_name: string | null
    }[]
    | null

type Report = {
    id: string
    title: string
    description: string | null
    category: string | null
    status: string
    location: string | null
    address: string | null
    lat: number | null
    lng: number | null
    reporter_id: string | null
    created_at: string
    updated_at: string | null
    resolved_at: string | null
    abuse_reports_count: number | null
    profiles: ProfileRef
    report_updates: ReportUpdate[] | null
    report_supports: Support[] | null
}

const STATUSES = [
    "in_verifica",
    "presa_in_carico",
    "risolta",
] as const

function getStatusLabel(status: string) {
    switch (status) {
        case "in_verifica":
            return "In verifica"
        case "presa_in_carico":
            return "Presa in carico"
        case "risolta":
            return "Risolta"
        default:
            return status
    }
}

function getReporterName(profile: ProfileRef) {
    const value = Array.isArray(profile) ? profile[0] : profile
    if (!value) return "Utente sconosciuto"

    const firstName = value.first_name?.trim() ?? ""
    const lastName = value.last_name?.trim() ?? ""

    return `${firstName} ${lastName}`.trim() || "Utente sconosciuto"
}

export function BackofficeReportsList({ reports }: { reports: Report[] }) {
    const [selectedStatus, setSelectedStatus] = useState<string>("tutti")
    const [search, setSearch] = useState("")
    const [pending, startTransition] = useTransition()
    const [statusNotes, setStatusNotes] = useState<Record<string, string>>({})
    const [statusVisibility, setStatusVisibility] = useState<Record<string, boolean>>({})
    const [timelineForms, setTimelineForms] = useState<
        Record<string, { title: string; description: string; isPublic: boolean }>
    >({})

    const filteredReports = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase()

        return reports.filter((report) => {
            const statusMatch =
                selectedStatus === "tutti" ? true : report.status === selectedStatus

            const searchMatch =
                !normalizedSearch ||
                report.title.toLowerCase().includes(normalizedSearch) ||
                (report.address ?? "").toLowerCase().includes(normalizedSearch) ||
                (report.category ?? "").toLowerCase().includes(normalizedSearch)

            return statusMatch && searchMatch
        })
    }, [reports, search, selectedStatus])

    return (
        <div className="space-y-6">
            <div className="rounded-2xl border p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <Input
                        placeholder="Cerca per titolo, indirizzo o categoria"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedStatus === "tutti" ? "default" : "outline"}
                            onClick={() => setSelectedStatus("tutti")}
                        >
                            Tutte
                        </Button>

                        {STATUSES.map((status) => (
                            <Button
                                className="cursor-pointer"
                                key={status}
                                variant={selectedStatus === status ? "default" : "outline"}
                                onClick={() => setSelectedStatus(status)}
                            >
                                {getStatusLabel(status)}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredReports.map((report) => {
                    const updates = (report.report_updates ?? [])
                        .slice()
                        .sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        )

                    const supportCount = report.report_supports?.length ?? 0
                    const abuseCount = report.abuse_reports_count ?? 0

                    const localTimelineForm = timelineForms[report.id] ?? {
                        title: "",
                        description: "",
                        isPublic: true,
                    }

                    const localStatusNote = statusNotes[report.id] ?? ""
                    const localStatusIsPublic = statusVisibility[report.id] ?? true

                    return (
                        <Card key={report.id} className="rounded-2xl">
                            <CardHeader className="gap-4">
                                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                    <div className="space-y-3">
                                        <CardTitle className="text-xl">{report.title}</CardTitle>

                                        <div className="flex flex-wrap gap-2">
                                            <Badge>{getStatusLabel(report.status)}</Badge>
                                            {report.category ? (
                                                <Badge variant="secondary">{report.category}</Badge>
                                            ) : null}
                                        </div>

                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <p><strong>Segnalata da:</strong> {getReporterName(report.profiles)}</p>
                                            <p><strong>Indirizzo:</strong> {report.address ?? "Non disponibile"}</p>
                                            <p><strong>Location:</strong> {report.location ?? "Non disponibile"}</p>
                                            <p><strong>Creata il:</strong> {new Date(report.created_at).toLocaleString("it-IT")}</p>
                                            <p><strong>Ultimo aggiornamento:</strong> {report.updated_at ? new Date(report.updated_at).toLocaleString("it-IT") : "—"}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">Supporti: {supportCount}</Badge>
                                        <Badge variant="outline">Abusi: {abuseCount}</Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-8">
                                {report.description ? (
                                    <div className="rounded-xl border p-4">
                                        <p className="text-sm leading-6 text-muted-foreground">
                                            {report.description}
                                        </p>
                                    </div>
                                ) : null}

                                <section className="space-y-4">
                                    <h3 className="text-sm font-semibold">Aggiorna stato</h3>

                                    <div className="grid gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            {STATUSES.map((status) => (
                                                <Button
                                                    key={status}
                                                    size="sm"
                                                    variant={report.status === status ? "default" : "outline"}
                                                    disabled={pending}
                                                    onClick={() =>
                                                        startTransition(async () => {
                                                            await updateReportStatus({
                                                                reportId: report.id,
                                                                status,
                                                                note: localStatusNote,
                                                                isPublic: localStatusIsPublic,
                                                            })
                                                            setStatusNotes((prev) => ({ ...prev, [report.id]: "" }))
                                                        })
                                                    }
                                                >
                                                    {getStatusLabel(status)}
                                                </Button>
                                            ))}
                                        </div>

                                        <Textarea
                                            placeholder="Nota opzionale da aggiungere alla timeline insieme al cambio stato"
                                            value={localStatusNote}
                                            onChange={(e) =>
                                                setStatusNotes((prev) => ({
                                                    ...prev,
                                                    [report.id]: e.target.value,
                                                }))
                                            }
                                        />

                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={localStatusIsPublic}
                                                onChange={(e) =>
                                                    setStatusVisibility((prev) => ({
                                                        ...prev,
                                                        [report.id]: e.target.checked,
                                                    }))
                                                }
                                            />
                                            Rendere pubblico questo aggiornamento di stato
                                        </label>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-sm font-semibold">Aggiungi aggiornamento alla timeline</h3>

                                    <div className="grid gap-3 rounded-2xl border p-4">
                                        <Input
                                            placeholder="Titolo aggiornamento"
                                            value={localTimelineForm.title}
                                            onChange={(e) =>
                                                setTimelineForms((prev) => ({
                                                    ...prev,
                                                    [report.id]: {
                                                        ...localTimelineForm,
                                                        title: e.target.value,
                                                    },
                                                }))
                                            }
                                        />

                                        <Textarea
                                            placeholder="Descrivi l'avanzamento della segnalazione"
                                            value={localTimelineForm.description}
                                            onChange={(e) =>
                                                setTimelineForms((prev) => ({
                                                    ...prev,
                                                    [report.id]: {
                                                        ...localTimelineForm,
                                                        description: e.target.value,
                                                    },
                                                }))
                                            }
                                        />

                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={localTimelineForm.isPublic}
                                                onChange={(e) =>
                                                    setTimelineForms((prev) => ({
                                                        ...prev,
                                                        [report.id]: {
                                                            ...localTimelineForm,
                                                            isPublic: e.target.checked,
                                                        },
                                                    }))
                                                }
                                            />
                                            Aggiornamento pubblico
                                        </label>

                                        <div className="flex justify-end">
                                            <Button
                                                disabled={pending}
                                                onClick={() =>
                                                    startTransition(async () => {
                                                        await addTimelineUpdate({
                                                            reportId: report.id,
                                                            title: localTimelineForm.title,
                                                            description: localTimelineForm.description,
                                                            type: "update",
                                                            isPublic: localTimelineForm.isPublic,
                                                        })

                                                        setTimelineForms((prev) => ({
                                                            ...prev,
                                                            [report.id]: {
                                                                title: "",
                                                                description: "",
                                                                isPublic: true,
                                                            },
                                                        }))
                                                    })
                                                }
                                            >
                                                Salva aggiornamento
                                            </Button>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-sm font-semibold">Timeline</h3>

                                    <div className="space-y-3">
                                        {updates.length === 0 ? (
                                            <div className="rounded-xl border p-4 text-sm text-muted-foreground">
                                                Nessun aggiornamento presente.
                                            </div>
                                        ) : (
                                            updates.map((update) => (
                                                <div key={update.id} className="rounded-xl border p-4">
                                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium">{update.title}</p>
                                                            <Badge variant={update.is_public ? "default" : "secondary"}>
                                                                {update.is_public ? "Pubblico" : "Interno"}
                                                            </Badge>
                                                        </div>

                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(update.created_at).toLocaleString("it-IT")}
                                                        </span>
                                                    </div>

                                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                        {update.description}
                                                    </p>

                                                    {update.type ? (
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            Tipo: {update.type}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}