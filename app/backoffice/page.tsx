import { requireAdmin } from "@/lib/auth/is-admin"
import { BackofficeReportsList } from "@/components/backoffice/backoffice-reports-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

type BackofficeReport = {
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
    profiles:
    | {
        first_name: string | null
        last_name: string | null
    }
    | {
        first_name: string | null
        last_name: string | null
    }[]
    | null
    report_updates:
    | {
        id: string
        title: string
        description: string
        type: string | null
        is_public: boolean
        created_at: string
    }[]
    | null
    report_supports:
    | {
        report_id: string
        user_id: string
    }[]
    | null
}

function countByStatus(reports: BackofficeReport[], status: string) {
    return reports.filter((report) => report.status === status).length
}

export default async function BackofficePage() {
    const { supabase, profile } = await requireAdmin()

    const { data, error } = await supabase
        .from("reports")
        .select(`
            id,
            title,
            description,
            category,
            status,
            location,
            address,
            lat,
            lng,
            reporter_id,
            created_at,
            updated_at,
            resolved_at,
            abuse_reports_count,
            profiles:reporter_id (
                first_name,
                last_name
            ),
            report_updates (
                id,
                title,
                description,
                type,
                is_public,
                created_at
            ),
            report_supports (
                report_id,
                user_id
            )
        `)
        .order("created_at", { ascending: false })

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8">
                <h1 className="text-3xl font-semibold">Backoffice</h1>
                <p className="mt-4 text-sm text-red-600">
                    Errore nel caricamento delle segnalazioni.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{error.message}</p>
            </div>
        )
    }

    const reports = (data ?? []) as BackofficeReport[]

    const totalReports = reports.length
    const totalChecking = countByStatus(reports, "in_verifica")
    const totalTakenInCharge = countByStatus(reports, "presa_in_carico")
    const totalResolved = countByStatus(reports, "risolta")

    return (
        <div className="mx-auto w-full max-w-5xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">

            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">Backoffice</h1>
                <p className="text-sm text-muted-foreground">
                    Benvenuto {profile.first_name ?? "Admin"}, qui puoi monitorare e aggiornare le segnalazioni.
                </p>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Totali
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">{totalReports}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            In verifica
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">{totalChecking}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Prese in carico
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">{totalTakenInCharge}</p>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Risolte
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-semibold">{totalResolved}</p>
                    </CardContent>
                </Card>
            </div>

            <BackofficeReportsList reports={reports} />
        </div>
    )
}