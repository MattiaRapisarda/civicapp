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
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-[28px] border bg-card p-6 shadow-sm">
                <div className="mb-6 space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">Crea account</h1>
                    <p className="text-sm text-muted-foreground">
                        Registrati per partecipare attivamente alla tua città
                    </p>
                </div>

                <form action={signup} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">
                                Nome
                            </label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                autoComplete="given-name"
                                className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/20"
                                placeholder="Mario"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">
                                Cognome
                            </label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                autoComplete="family-name"
                                className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/20"
                                placeholder="Rossi"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/20"
                            placeholder="tuoindirizzo@email.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition-colors focus:border-foreground/20"
                            placeholder="Almeno 8 caratteri"
                        />
                    </div>

                    <div className="rounded-2xl border bg-background/60 p-4">
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
                                    className="font-medium text-foreground underline underline-offset-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Privacy Policy
                                </Link>{" "}
                                e i{" "}
                                <Link
                                    href="/termini.pdf"
                                    className="font-medium text-foreground underline underline-offset-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Termini e Condizioni
                                </Link>
                                .
                            </label>
                        </div>
                    </div>

                    {message ? (
                        <p className="text-sm text-emerald-600">{message}</p>
                    ) : null}

                    {error ? (
                        <p className="text-sm text-destructive">{error}</p>
                    ) : null}

                    <Button type="submit" className="h-12 w-full cursor-pointer rounded-full">
                        Registrati
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                    Hai già un account?{" "}
                    <Link
                        href="/login"
                        className="cursor-pointer font-medium text-foreground underline underline-offset-4"
                    >
                        Accedi
                    </Link>
                </p>
            </div>
        </main>
    )
}