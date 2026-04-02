"use client"

import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export function PasswordAccountItem() {
    const [isOpen, setIsOpen] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSaving, setIsSaving] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const isDirty = password.trim().length > 0 || confirmPassword.trim().length > 0

    const passwordsMatch = useMemo(() => {
        if (!password && !confirmPassword) return false
        return password === confirmPassword
    }, [password, confirmPassword])

    const isValidPassword = password.length >= 8

    const canSave =
        isDirty &&
        password.length > 0 &&
        confirmPassword.length > 0 &&
        passwordsMatch &&
        isValidPassword &&
        !isSaving

    const resetFields = () => {
        setPassword("")
        setConfirmPassword("")
        setErrorMessage("")
        setSuccessMessage("")
    }

    const handleToggle = () => {
        setIsOpen((prev) => {
            const next = !prev
            if (!next) resetFields()
            return next
        })
    }

    const handleSave = async () => {
        if (!canSave) return

        setIsSaving(true)
        setErrorMessage("")
        setSuccessMessage("")

        const { error } = await supabase.auth.updateUser({
            password,
        })

        if (error) {
            setErrorMessage(error.message || "Errore durante l'aggiornamento della password")
            setIsSaving(false)
            return
        }

        setSuccessMessage("Password aggiornata correttamente")
        setIsSaving(false)
        setPassword("")
        setConfirmPassword("")
    }

    return (
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
            <button
                type="button"
                onClick={handleToggle}
                className="flex w-full items-center justify-between cursor-pointer px-5 py-4 text-left transition hover:bg-muted/40"
            >
                <div className="min-w-0">
                    <p className="text-sm font-medium">Password</p>
                    <p className="truncate text-sm text-muted-foreground">
                        Modifica la tua password
                    </p>
                </div>

                <div className="ml-4 shrink-0">
                    {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                </div>
            </button>

            {isOpen && (
                <div className="border-t px-5 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Nuova password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Inserisci la nuova password"
                                className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                            />
                            <p className="text-xs text-muted-foreground">
                                Minimo 8 caratteri
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Conferma password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Ripeti la nuova password"
                                className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground/30"
                            />
                        </div>

                        {!passwordsMatch && confirmPassword.length > 0 && (
                            <p className="text-sm text-destructive">
                                Le password non coincidono
                            </p>
                        )}

                        {password.length > 0 && !isValidPassword && (
                            <p className="text-sm text-destructive">
                                La password deve contenere almeno 8 caratteri
                            </p>
                        )}

                        {errorMessage && (
                            <p className="text-sm text-destructive">
                                {errorMessage}
                            </p>
                        )}

                        {successMessage && (
                            <p className="text-sm text-green-600">
                                {successMessage}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!canSave}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition ${canSave
                                    ? "bg-foreground text-background hover:opacity-90"
                                    : "cursor-not-allowed bg-muted text-muted-foreground"
                                    }`}
                            >
                                {isSaving ? "Salvataggio..." : "Salva"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}