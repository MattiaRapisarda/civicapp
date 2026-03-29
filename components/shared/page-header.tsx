"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
    title: string
    showBack?: boolean
}

export function PageHeader({ title, showBack = true }: PageHeaderProps) {
    const router = useRouter()

    return (
        <div className="sticky top-0 z-10 mb-4 flex items-center gap-3 bg-background/80 backdrop-blur px-1 py-2">
            {showBack && (
                <button
                    onClick={() => router.back()}
                    className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
            )}

            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
    )
}