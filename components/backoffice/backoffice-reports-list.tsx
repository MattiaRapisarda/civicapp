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

type ActionResult = {
    success: boolean
    message?: string
}

type DraftState = {
    status: string
    statusNote: string
    statusIsPublic: boolean
    timelineTitle: string
    timelineDescription: string
    timelineIsPublic: boolean
}

const STATUSES = ["in_verifica", "presa_in_carico", "risolta"] as const

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

function buildInitialDraft(report: Report): DraftState {
    return {
        status: report.status,
        statusNote: "",
        statusIsPublic: true,
        timelineTitle: "",
        timelineDescription: "",
        timelineIsPublic: true,
    }
}

export function BackofficeReportsList({ reports }: { reports: Report[] }) {
    const [selectedStatus, setSelectedStatus] = useState<string>("tutti")
    const [search, setSearch] = useState("")
    const [pending, startTransition] = useTransition()
    const [expandedReports, setExpandedReports] = useState<Record<string, boolean>>({})
    const [drafts, setDrafts] = useState<Record<string, DraftState>>({})
    const [feedback, setFeedback] = useState<
        Record<string, { type: "success" | "error"; message: string }>
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

    function toggleExpanded(reportId: string) {
        setExpandedReports((prev) => ({
            ...prev,
            [reportId]: !prev[reportId],
        }))
    }

    function getDraft(report: Report) {
        return drafts[report.id] ?? buildInitialDraft(report)
    }

    function updateDraft(reportId: string, patch: Partial<DraftState>, report: Report) {
        setDrafts((prev) => ({
            ...prev,
            [reportId]: {
                ...(prev[reportId] ?? buildInitialDraft(report)),
                ...patch,
            },
        }))
    }

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
                            type="button"
                            variant={selectedStatus === "tutti" ? "default" : "outline"}
                            onClick={() => setSelectedStatus("tutti")}
                        >
                            Tutte
                        </Button>

                        {STATUSES.map((status) => (
                            <Button
                                className="cursor-pointer"
                                type="button"
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
                    const isExpanded = expandedReports[report.id] ?? false
                    const draft = getDraft(report)
                    const localFeedback = feedback[report.id]

                    const hasStatusChange = draft.status !== report.status
                    const hasStatusNote = draft.statusNote.trim().length > 0
                    const hasTimelineTitle = draft.timelineTitle.trim().length > 0
                    const hasTimelineDescription =
                        draft.timelineDescription.trim().length > 0
                    const hasTimelineUpdate = hasTimelineTitle || hasTimelineDescription

                    const hasAnyChanges =
                        hasStatusChange || hasStatusNote || hasTimelineUpdate

                    return (
                        <Card key={report.id} className="rounded-2xl">
                            <CardHeader className="gap-4">
                                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                                    <div className="space-y-3">
                                        <CardTitle className="text-xl">{report.title}</CardTitle>

                                        <div className="flex flex-wrap gap-2">
                                            <Badge>{getStatusLabel(report.status)}</Badge>

                                            {draft.status !== report.status ? (
                                                <Badge variant="secondary">
                                                    Nuovo: {getStatusLabel(draft.status)}
                                                </Badge>
                                            ) : null}

                                            {report.category ? (
                                                <Badge variant="secondary">
                                                    {report.category}
                                                </Badge>
                                            ) : null}
                                        </div>

                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <p>
                                                <strong>Segnalata da:</strong>{" "}
                                                {getReporterName(report.profiles)}
                                            </p>
                                            <p>
                                                <strong>Indirizzo:</strong>{" "}
                                                {report.address ?? "Non disponibile"}
                                            </p>
                                            <p>
                                                <strong>Location:</strong>{" "}
                                                {report.location ?? "Non disponibile"}
                                            </p>
                                            <p>
                                                <strong>Creata il:</strong>{" "}
                                                {new Date(report.created_at).toLocaleString("it-IT")}
                                            </p>
                                            <p>
                                                <strong>Ultimo aggiornamento:</strong>{" "}
                                                {report.updated_at
                                                    ? new Date(report.updated_at).toLocaleString("it-IT")
                                                    : "—"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline">Supporti: {supportCount}</Badge>
                                        <Badge variant="outline">Abusi: {abuseCount}</Badge>

                                        <Button
                                            className="cursor-pointer bg-black text-white"
                                            type="button"
                                            variant="outline"
                                            onClick={() => toggleExpanded(report.id)}
                                        >
                                            {isExpanded ? "Riduci" : "Apri"}
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            {isExpanded ? (
                                <CardContent className="space-y-8">
                                    {localFeedback ? (
                                        <div
                                            className={`rounded-xl border px-4 py-3 text-sm ${localFeedback.type === "error"
                                                ? "border-red-200 bg-red-50 text-red-700"
                                                : "border-green-200 bg-green-50 text-green-700"
                                                }`}
                                        >
                                            {localFeedback.message}
                                        </div>
                                    ) : null}

                                    {report.description ? (
                                        <div className="rounded-xl border p-4">
                                            <p className="text-sm leading-6 text-muted-foreground">
                                                {report.description}
                                            </p>
                                        </div>
                                    ) : null}

                                    <section className="space-y-4">
                                        <h3 className="text-sm font-semibold">
                                            Stato e nota timeline
                                        </h3>

                                        <div className="grid gap-3 rounded-2xl border p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {STATUSES.map((status) => (
                                                    <Button
                                                        className="cursor-pointer"
                                                        type="button"
                                                        key={status}
                                                        size="sm"
                                                        variant={
                                                            draft.status === status
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        disabled={pending}
                                                        onClick={() =>
                                                            updateDraft(
                                                                report.id,
                                                                { status },
                                                                report
                                                            )
                                                        }
                                                    >
                                                        {getStatusLabel(status)}
                                                    </Button>
                                                ))}
                                            </div>

                                            <Textarea
                                                placeholder="Nota opzionale collegata al cambio stato"
                                                value={draft.statusNote}
                                                onChange={(e) =>
                                                    updateDraft(
                                                        report.id,
                                                        { statusNote: e.target.value },
                                                        report
                                                    )
                                                }
                                            />

                                            <label className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={draft.statusIsPublic}
                                                    onChange={(e) =>
                                                        updateDraft(
                                                            report.id,
                                                            { statusIsPublic: e.target.checked },
                                                            report
                                                        )
                                                    }
                                                />
                                                Rendere pubblico questo aggiornamento di stato
                                            </label>
                                        </div>
                                    </section>

                                    <section className="space-y-4">
                                        <h3 className="text-sm font-semibold">
                                            Aggiornamento separato della timeline
                                        </h3>

                                        <div className="grid gap-3 rounded-2xl border p-4">
                                            <Input
                                                placeholder="Titolo aggiornamento"
                                                value={draft.timelineTitle}
                                                onChange={(e) =>
                                                    updateDraft(
                                                        report.id,
                                                        { timelineTitle: e.target.value },
                                                        report
                                                    )
                                                }
                                            />

                                            <Textarea
                                                placeholder="Descrivi l'avanzamento della segnalazione"
                                                value={draft.timelineDescription}
                                                onChange={(e) =>
                                                    updateDraft(
                                                        report.id,
                                                        {
                                                            timelineDescription: e.target.value,
                                                        },
                                                        report
                                                    )
                                                }
                                            />

                                            <label className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={draft.timelineIsPublic}
                                                    onChange={(e) =>
                                                        updateDraft(
                                                            report.id,
                                                            { timelineIsPublic: e.target.checked },
                                                            report
                                                        )
                                                    }
                                                />
                                                Aggiornamento pubblico
                                            </label>
                                        </div>
                                    </section>

                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            className="cursor-pointer"
                                            type="button"
                                            variant="outline"
                                            disabled={pending}
                                            onClick={() => {
                                                setDrafts((prev) => ({
                                                    ...prev,
                                                    [report.id]: buildInitialDraft(report),
                                                }))
                                                setFeedback((prev) => ({
                                                    ...prev,
                                                    [report.id]: {
                                                        type: "success",
                                                        message: "Modifiche annullate.",
                                                    },
                                                }))
                                            }}
                                        >
                                            Annulla
                                        </Button>

                                        <Button
                                            className="cursor-pointer"
                                            type="button"
                                            disabled={pending || !hasAnyChanges}
                                            onClick={() =>
                                                startTransition(async () => {
                                                    setFeedback((prev) => {
                                                        const next = { ...prev }
                                                        delete next[report.id]
                                                        return next
                                                    })

                                                    if (
                                                        (hasTimelineTitle && !hasTimelineDescription) ||
                                                        (!hasTimelineTitle && hasTimelineDescription)
                                                    ) {
                                                        setFeedback((prev) => ({
                                                            ...prev,
                                                            [report.id]: {
                                                                type: "error",
                                                                message:
                                                                    "Per salvare un aggiornamento timeline separato, compila sia titolo che descrizione.",
                                                            },
                                                        }))
                                                        return
                                                    }

                                                    if (!hasAnyChanges) {
                                                        setFeedback((prev) => ({
                                                            ...prev,
                                                            [report.id]: {
                                                                type: "error",
                                                                message:
                                                                    "Non ci sono modifiche da salvare.",
                                                            },
                                                        }))
                                                        return
                                                    }

                                                    if (hasStatusChange || hasStatusNote) {
                                                        const statusResult =
                                                            (await updateReportStatus({
                                                                reportId: report.id,
                                                                status: draft.status,
                                                                note: draft.statusNote,
                                                                isPublic: draft.statusIsPublic,
                                                            })) as ActionResult

                                                        if (!statusResult.success) {
                                                            setFeedback((prev) => ({
                                                                ...prev,
                                                                [report.id]: {
                                                                    type: "error",
                                                                    message:
                                                                        statusResult.message ||
                                                                        "Errore durante il salvataggio dello stato.",
                                                                },
                                                            }))
                                                            return
                                                        }
                                                    }

                                                    if (hasTimelineTitle && hasTimelineDescription) {
                                                        const timelineResult =
                                                            (await addTimelineUpdate({
                                                                reportId: report.id,
                                                                title: draft.timelineTitle,
                                                                description:
                                                                    draft.timelineDescription,
                                                                type: "update",
                                                                isPublic: draft.timelineIsPublic,
                                                            })) as ActionResult

                                                        if (!timelineResult.success) {
                                                            setFeedback((prev) => ({
                                                                ...prev,
                                                                [report.id]: {
                                                                    type: "error",
                                                                    message:
                                                                        timelineResult.message ||
                                                                        "Errore durante il salvataggio della timeline.",
                                                                },
                                                            }))
                                                            return
                                                        }
                                                    }

                                                    setFeedback((prev) => ({
                                                        ...prev,
                                                        [report.id]: {
                                                            type: "success",
                                                            message:
                                                                "Modifiche salvate correttamente.",
                                                        },
                                                    }))

                                                    setDrafts((prev) => ({
                                                        ...prev,
                                                        [report.id]: buildInitialDraft({
                                                            ...report,
                                                            status: draft.status,
                                                        }),
                                                    }))
                                                })
                                            }
                                        >
                                            Salva modifiche
                                        </Button>
                                    </div>

                                    <section className="space-y-4">
                                        <h3 className="text-sm font-semibold">Timeline</h3>

                                        <div className="space-y-3">
                                            {updates.length === 0 ? (
                                                <div className="rounded-xl border p-4 text-sm text-muted-foreground">
                                                    Nessun aggiornamento presente.
                                                </div>
                                            ) : (
                                                updates.map((update) => (
                                                    <div
                                                        key={update.id}
                                                        className="rounded-xl border p-4"
                                                    >
                                                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium">
                                                                    {update.title}
                                                                </p>
                                                                <Badge
                                                                    variant={
                                                                        update.is_public
                                                                            ? "default"
                                                                            : "secondary"
                                                                    }
                                                                >
                                                                    {update.is_public
                                                                        ? "Pubblico"
                                                                        : "Interno"}
                                                                </Badge>
                                                            </div>

                                                            <span className="text-xs text-muted-foreground">
                                                                {new Date(
                                                                    update.created_at
                                                                ).toLocaleString("it-IT")}
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
                            ) : null}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}