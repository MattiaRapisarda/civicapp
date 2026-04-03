import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signup } from "@/lib/auth/actions"

type SignupPageProps = {
    searchParams?: Promise<{
        error?: string
        message?: string
    }>
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
    const params = searchParams ? await searchParams : undefined
    const error = params?.error
    const message = params?.message

    return (
        <main className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Crea account</h1>
                    <p className="auth-description">
                        Registrati per partecipare attivamente alla tua città
                    </p>
                </div>

                <form action={signup} className="form-stack">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="field-stack">
                            <label htmlFor="firstName" className="field-label">
                                Nome
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                autoComplete="given-name"
                                placeholder="Mario"
                                className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-ring"
                            />
                        </div>

                        <div className="field-stack">
                            <label htmlFor="lastName" className="field-label">
                                Cognome
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                autoComplete="family-name"
                                placeholder="Rossi"
                                className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-ring"
                            />
                        </div>
                    </div>

                    <div className="field-stack">
                        <label htmlFor="email" className="field-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="tuoindirizzo@email.com"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-ring"
                        />
                    </div>

                    <div className="field-stack">
                        <label htmlFor="password" className="field-label">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            placeholder="Almeno 8 caratteri"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-ring"
                        />
                    </div>

                    <div
                        className="rounded-2xl border p-4"
                        style={{ backgroundColor: "color-mix(in oklab, var(--surface-1) 88%, transparent)" }}
                    >
                        <div className="flex items-start gap-3">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                value="accepted"
                                required
                                className="mt-1 h-4 w-4 rounded border"
                            />

                            <label
                                htmlFor="acceptTerms"
                                className="text-sm leading-6 text-muted-foreground"
                            >
                                Accetto la{" "}
                                <Link
                                    href="/privacy.pdf"
                                    className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </Link>{" "}
                                e i{" "}
                                <Link
                                    href="/termini.pdf"
                                    className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Termini e Condizioni
                                </Link>
                                .
                            </label>
                        </div>
                    </div>

                    {message ? <p className="feedback-success">{message}</p> : null}

                    {error ? <p className="feedback-error">{error}</p> : null}

                    <Button
                        type="submit"
                        className="w-full h-12 cursor-pointer hover:bg-success"
                    >
                        Registrati
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                    Hai già un account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-foreground underline underline-offset-4 transition hover:opacity-80"
                    >
                        Accedi
                    </Link>
                </p>
            </div>
        </main>
    )
}