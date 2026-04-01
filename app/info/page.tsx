import Link from "next/link"
import {
    ArrowRight,
    Bell,
    Camera,
    CheckCircle2,
    MapPin,
    Megaphone,
    ShieldCheck,
    Sparkles,
} from "lucide-react"

export default function InfoPage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden border-b bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_35%)]" />
                <div className="relative mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
                    <div className="max-w-3xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                            <Sparkles className="h-4 w-4 text-emerald-600" />
                            Una webapp per migliorare la città insieme
                        </div>

                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
                            Segnalare un problema nel tuo territorio deve essere
                            semplice, chiaro e utile.
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Questa webapp nasce per aiutare cittadini e
                            amministrazione a collaborare meglio: puoi inviare
                            segnalazioni, indicare la posizione, allegare foto e
                            seguire gli aggiornamenti nel tempo.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/reports/new"
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                            >
                                Fai una segnalazione
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            >
                                Torna alla home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16 md:px-8">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                            <Megaphone className="h-6 w-6 text-emerald-700" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Qual è l’obiettivo?
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Rendere più facile segnalare problemi, disservizi e
                            situazioni che meritano attenzione, favorendo un
                            dialogo più diretto tra cittadini e territorio.
                        </p>
                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                            <ShieldCheck className="h-6 w-6 text-blue-700" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Perché è utile?
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            Perché organizza meglio le informazioni, rende più
                            comprensibili le segnalazioni e aiuta a monitorare lo
                            stato di avanzamento nel tempo.
                        </p>
                    </div>

                    <div className="rounded-3xl border bg-white p-6 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                            <CheckCircle2 className="h-6 w-6 text-amber-700" />
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            A chi si rivolge?
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                            A cittadini attivi, comitati, realtà locali e a chi
                            vuole contribuire in modo semplice a rendere la città
                            più vivibile e più curata.
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y bg-white">
                <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                            Come funziona
                        </h2>
                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Il flusso è pensato per essere intuitivo e veloce,
                            anche da smartphone.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                                    1
                                </div>
                                <MapPin className="h-5 w-5 text-emerald-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Indica il problema
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Descrivi cosa non va e specifica dove si trova la
                                segnalazione, così da renderla immediatamente più
                                utile e leggibile.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                    2
                                </div>
                                <Camera className="h-5 w-5 text-blue-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Aggiungi dettagli utili
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Puoi allegare una foto o usare la posizione per
                                contestualizzare meglio la situazione e facilitare
                                la comprensione del caso.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                                    3
                                </div>
                                <Bell className="h-5 w-5 text-amber-700" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Segui gli aggiornamenti
                            </h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Una volta inviata la segnalazione, puoi monitorarne
                                lo stato e restare informato sull’evoluzione.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-16 md:px-8">
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-sm">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                            Perché provarla
                        </h2>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/10 p-5">
                                <h3 className="font-semibold">
                                    Più semplicità
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-200">
                                    Un’interfaccia immediata, pensata per inviare
                                    segnalazioni senza passaggi inutili.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-5">
                                <h3 className="font-semibold">
                                    Più chiarezza
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-200">
                                    Le informazioni sono raccolte in modo ordinato,
                                    con posizione, descrizione e immagini.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-5">
                                <h3 className="font-semibold">
                                    Più partecipazione
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-200">
                                    Ogni persona può contribuire a far emergere
                                    criticità e priorità del territorio.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 p-5">
                                <h3 className="font-semibold">
                                    Più trasparenza
                                </h3>
                                <p className="mt-2 text-sm leading-7 text-slate-200">
                                    Seguire lo stato di una segnalazione aiuta a
                                    rendere il processo più visibile e comprensibile.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] border bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                            In sintesi
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Non è solo una pagina per inviare problemi: è uno
                            strumento per raccogliere attenzione sul territorio,
                            dare voce ai cittadini e rendere più semplice il
                            passaggio dall’osservazione all’azione.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                Segnala in pochi passaggi
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                Geolocalizza e allega foto
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                Segui gli aggiornamenti
                            </div>
                            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                Contribuisci a migliorare la città
                            </div>
                        </div>

                        <Link
                            href="/reports/new"
                            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Inizia ora
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-emerald-600">
                <div className="mx-auto max-w-6xl px-6 py-14 text-center text-white md:px-8">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                        La tua voce può aiutare a migliorare il territorio
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-emerald-50">
                        Uno strumento semplice per cittadini attivi e comunità più
                        consapevoli.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/reports/new"
                            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                        >
                            Crea una segnalazione
                        </Link>
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            Registrati
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}