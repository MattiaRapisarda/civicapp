"use client"

import { ArrowLeft, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function ReportFlowTopbar() {
    const router = useRouter()

    return (
        <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex h-16 w-full items-center justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full cursor-pointer"
                    aria-label="Torna indietro"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                <div className="text-sm font-semibold sm:text-base">
                    Nuova segnalazione
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/")}
                    className="rounded-full cursor-pointer"
                    aria-label="Chiudi"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}