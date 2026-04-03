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
    <main className="min-h-screen bg-background text-foreground">
      <section className="hero-shell">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(37,99,235,0.08),transparent_35%)]" />

        <div className="hero-inner">
          <div className="max-w-3xl">
            <div className="hero-badge">
              <Sparkles className="h-4 w-4 text-success" />
              Una webapp per migliorare la città insieme
            </div>

            <h1 className="hero-title">
              Segnalare un problema nel tuo territorio deve essere
              semplice, chiaro e utile.
            </h1>

            <p className="hero-description">
              Questa webapp nasce per aiutare cittadini e
              amministrazione a collaborare meglio: puoi inviare
              segnalazioni, indicare la posizione, allegare foto e
              seguire gli aggiornamenti nel tempo.
            </p>

            <div className="hero-actions">
              <Link
                href="/report/new"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-success px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Fai una segnalazione
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Vedi le segnalazioni
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="feature-grid-3">
          <article className="content-card">
            <div className="icon-chip-success mb-4">
              <Megaphone className="h-6 w-6" />
            </div>
            <h2 className="card-title">Qual è l’obiettivo?</h2>
            <p className="card-description">
              Rendere più facile segnalare problemi, disservizi e
              situazioni che meritano attenzione, favorendo un
              dialogo più diretto tra cittadini e territorio.
            </p>
          </article>

          <article className="content-card">
            <div className="icon-chip-info mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="card-title">Perché è utile?</h2>
            <p className="card-description">
              Perché organizza meglio le informazioni, rende più
              comprensibili le segnalazioni e aiuta a monitorare lo
              stato di avanzamento nel tempo.
            </p>
          </article>

          <article className="content-card">
            <div className="icon-chip-warning mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="card-title">A chi si rivolge?</h2>
            <p className="card-description">
              A cittadini attivi, comitati, realtà locali e a chi
              vuole contribuire in modo semplice a rendere la città
              più vivibile e più curata.
            </p>
          </article>
        </div>
      </section>

      <section className="page-section-border">
        <div className="page-shell">
          <div className="section-header">
            <h2 className="section-title">Come funziona</h2>
            <p className="section-description">
              Il flusso è pensato per essere intuitivo e veloce,
              anche da smartphone.
            </p>
          </div>

          <div className="mt-10 feature-grid-3">
            <article className="content-card-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="step-badge bg-success">1</div>
                <MapPin className="h-5 w-5 text-success" />
              </div>

              <h3 className="card-title">Indica il problema</h3>
              <p className="card-description">
                Descrivi cosa non va e specifica dove si trova la
                segnalazione, così da renderla immediatamente più
                utile e leggibile.
              </p>
            </article>

            <article className="content-card-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="step-badge bg-info">2</div>
                <Camera className="h-5 w-5 text-info" />
              </div>

              <h3 className="card-title">Aggiungi dettagli utili</h3>
              <p className="card-description">
                Puoi allegare una foto o usare la posizione per
                contestualizzare meglio la situazione e facilitare
                la comprensione del caso.
              </p>
            </article>

            <article className="content-card-soft">
              <div className="mb-4 flex items-center gap-3">
                <div className="step-badge bg-warning">3</div>
                <Bell className="h-5 w-5 text-warning" />
              </div>

              <h3 className="card-title">Segui gli aggiornamenti</h3>
              <p className="card-description">
                Una volta inviata la segnalazione, puoi monitorarne
                lo stato e restare informato sull’evoluzione.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="page-shell page-section">
        <div className="split-grid">
          <div className="surface-panel-dark">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Perché provarla
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-panel-dark-muted">
                <h3 className="font-semibold">Più semplicità</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Un’interfaccia immediata, pensata per inviare
                  segnalazioni senza passaggi inutili.
                </p>
              </div>

              <div className="surface-panel-dark-muted">
                <h3 className="font-semibold">Più chiarezza</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Le informazioni sono raccolte in modo ordinato,
                  con posizione, descrizione e immagini.
                </p>
              </div>

              <div className="surface-panel-dark-muted">
                <h3 className="font-semibold">Più partecipazione</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Ogni persona può contribuire a far emergere
                  criticità e priorità del territorio.
                </p>
              </div>

              <div className="surface-panel-dark-muted">
                <h3 className="font-semibold">Più trasparenza</h3>
                <p className="mt-2 text-sm leading-7 text-white/80">
                  Seguire lo stato di una segnalazione aiuta a
                  rendere il processo più visibile e comprensibile.
                </p>
              </div>
            </div>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              In sintesi
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Non è solo una pagina per inviare problemi: è uno
              strumento per raccogliere attenzione sul territorio,
              dare voce ai cittadini e rendere più semplice il
              passaggio dall’osservazione all’azione.
            </p>

            <div className="mt-6 space-y-3">
              <div className="list-pill">Segnala in pochi passaggi</div>
              <div className="list-pill">Geolocalizza e allega foto</div>
              <div className="list-pill">Segui gli aggiornamenti</div>
              <div className="list-pill">
                Contribuisci a migliorare la città
              </div>
            </div>

            <Link
              href="/report/new"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-success px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Inizia ora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-success">
        <div className="page-shell py-14 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            La tua voce può aiutare a migliorare il territorio
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-primary-foreground/80">
            Uno strumento semplice per cittadini attivi e comunità più
            consapevoli.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/report/new"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
            >
              Crea una segnalazione
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center bg-primary justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Registrati
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}