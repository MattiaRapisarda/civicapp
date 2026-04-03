import Link from "next/link"
import { Button } from "@/components/ui/button"
import { login } from "@/lib/auth/actions"

type LoginPageProps = {
    searchParams?: Promise<{
        error?: string
        message?: string
    }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = searchParams ? await searchParams : undefined
    const error = params?.error
    const message = params?.message

    return (
        <main className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Accedi</h1>
                    <p className="auth-description">
                        Entra in CivicApp per supportare e commentare le segnalazioni
                    </p>
                </div>

                <form action={login} className="form-stack">
                    <div className="field-stack">
                        <label htmlFor="email" className="field-label">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
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
                            placeholder="••••••••"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-ring"
                        />
                    </div>

                    {message ? (
                        <p className="feedback-success">{message}</p>
                    ) : null}

                    {error ? (
                        <p className="feedback-error">{error}</p>
                    ) : null}

                    <Button
                        type="submit"
                        className="w-full h-12 cursor-pointer hover:bg-success"
                    >
                        Accedi
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                    Non hai un account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-foreground underline transition hover:opacity-80"
                    >
                        Registrati
                    </Link>
                </p>
            </div>
        </main>
    )
}