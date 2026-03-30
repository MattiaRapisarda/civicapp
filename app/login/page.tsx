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
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-[28px] border bg-card p-6 shadow-sm">
                <div className="mb-6 space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">Accedi</h1>
                    <p className="text-sm text-muted-foreground">
                        Entra in CivicApp per supportare e commentare le segnalazioni
                    </p>
                </div>

                <form action={login} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none focus:border-foreground/20"
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
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm outline-none focus:border-foreground/20"
                            placeholder="••••••••"
                        />
                    </div>

                    {message ? (
                        <p className="text-sm text-emerald-600">{message}</p>
                    ) : null}

                    {error ? (
                        <p className="text-sm text-destructive">{error}</p>
                    ) : null}

                    <Button type="submit" className="h-12 w-full rounded-full cursor-pointer">
                        Accedi
                    </Button>
                </form>

                <p className="mt-5 text-center text-sm text-muted-foreground">
                    Non hai un account?{" "}
                    <Link href="/signup" className="font-medium text-foreground underline cursor-pointer">
                        Registrati
                    </Link>
                </p>
            </div>
        </main>
    )
}