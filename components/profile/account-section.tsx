"use client"

import { EditableAccountItem } from "@/components/profile/editable-account-item"
import { PasswordAccountItem } from "@/components/profile/password-account-item"
import { logout } from "@/lib/auth/actions"

type UserProfile = {
    id: string
    initials: string
    fullName: string
    email: string
    city: string
    stats: {
        createdCount: number
        supportedCount: number
        resolvedCount: number
    }
}

interface AccountSectionProps {
    userProfile: UserProfile
    onSaveField: (field: string, value: string) => Promise<void>
    savingField: string | null
}

export function AccountSection({
    userProfile,
    onSaveField,
    savingField,
}: AccountSectionProps) {
    return (
        <section className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold">Impostazioni account</h2>
                <p className="text-sm text-muted-foreground">
                    Gestisci e modifica le informazioni del tuo profilo
                </p>
            </div>

            <div className="space-y-3">
                <EditableAccountItem
                    title="Informazioni personali"
                    subtitle={userProfile.fullName}
                    field="fullName"
                    label="Nome e cognome"
                    defaultValue={userProfile.fullName}
                    onSave={onSaveField}
                    isSaving={savingField === "fullName"}
                />

                <EditableAccountItem
                    title="Email"
                    subtitle={userProfile.email}
                    field="email"
                    label="Indirizzo email"
                    defaultValue={userProfile.email}
                    inputType="email"
                    onSave={onSaveField}
                    isSaving={savingField === "email"}
                />

                <EditableAccountItem
                    title="Città"
                    subtitle={userProfile.city || "Aggiungi la tua città"}
                    field="city"
                    label="Città"
                    defaultValue={userProfile.city}
                    onSave={onSaveField}
                    isSaving={savingField === "city"}
                />

                <PasswordAccountItem />

                <form action={logout}>
                    <button
                        type="submit"
                        className="w-full cursor-pointer rounded-2xl px-5 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/10"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </section>
    )
}