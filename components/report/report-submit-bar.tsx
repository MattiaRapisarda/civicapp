"use client"

import { Button } from "@/components/ui/button"

interface ReportSubmitBarProps {
    isDisabled: boolean
    isSubmitting: boolean
    onSubmit: () => void
}

export function ReportSubmitBar({
    isDisabled,
    isSubmitting,
    onSubmit,
}: ReportSubmitBarProps) {
    return (
        <div className="fixed inset-x-0 bottom-20 z-20 px-4 sm:px-6">
            <div className="mx-auto w-full max-w-md">
                <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={isDisabled}
                    className="h-14 w-full rounded-full text-base font-medium shadow-md cursor-pointer"
                >
                    {isSubmitting ? "Pubblicazione..." : "Pubblica segnalazione"}
                </Button>
            </div>
        </div>
    )
}