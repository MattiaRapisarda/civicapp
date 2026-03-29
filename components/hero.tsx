import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ArrowRight, CheckCircle2, Clock3, AlertCircle } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative overflow-hidden border-b bg-background">
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="max-w-2xl">
                        <div className="mb-4">
                            <Badge
                                variant="outline"
                                className="rounded-full px-3 py-1 text-xs font-medium"
                            >
                                Partecipa alla vita della tua città
                            </Badge>
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                            Segnala problemi. Proponi soluzioni. Migliora il tuo quartiere.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                            Una piattaforma semplice per cittadini e amministrazioni, con
                            segnalazioni tracciabili, proposte condivise e aggiornamenti in
                            tempo reale.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="h-12 rounded-xl px-6">
                                Segnala ora
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button size="lg" variant="outline" className="h-12 rounded-xl px-6">
                                Esplora la mappa
                            </Button>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div className="rounded-full border px-3 py-1.5">
                                12 segnalazioni oggi
                            </div>
                            <div className="rounded-full border px-3 py-1.5">
                                4 risolte questa settimana
                            </div>
                            <div className="rounded-full border px-3 py-1.5">
                                Quartieri attivi: Centro, San Giovanni
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <Card className="overflow-hidden rounded-3xl border shadow-sm">
                            <CardContent className="p-0">
                                <div className="relative h-105 bg-muted/40">
                                    <div className="absolute inset-0">
                                        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[24px_24px]" />
                                    </div>

                                    <div className="absolute left-[18%] top-[22%]">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="absolute right-[20%] top-[30%]">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border">
                                            <AlertCircle className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-[24%] left-[30%]">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-md ring-1 ring-border">
                                            <CheckCircle2 className="h-5 w-5" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-4 left-4 right-4 space-y-3">
                                        <Card className="rounded-2xl border bg-background/95 shadow-sm backdrop-blur">
                                            <CardContent className="flex items-start justify-between gap-4 p-4">
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">
                                                        Illuminazione non funzionante
                                                    </p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Via Galatea, 12
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="rounded-full">
                                                    In verifica
                                                </Badge>
                                            </CardContent>
                                        </Card>

                                        <Card className="rounded-2xl border bg-background/95 shadow-sm backdrop-blur">
                                            <CardContent className="flex items-start justify-between gap-4 p-4">
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">
                                                        Buca stradale segnalata
                                                    </p>
                                                    <p className="mt-1 text-sm text-muted-foreground">
                                                        Piazza Duomo
                                                    </p>
                                                </div>
                                                <Badge className="rounded-full">Presa in carico</Badge>
                                            </CardContent>
                                        </Card>

                                        <Card className="rounded-2xl border bg-background/95 shadow-sm backdrop-blur">
                                            <CardContent className="flex items-start justify-between gap-4 p-4">
                                                <div className="flex items-center gap-2">
                                                    <Clock3 className="h-4 w-4 text-muted-foreground" />
                                                    <p className="text-sm text-muted-foreground">
                                                        Aggiornato 5 minuti fa
                                                    </p>
                                                </div>
                                                <Badge variant="outline" className="rounded-full">
                                                    Live
                                                </Badge>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}