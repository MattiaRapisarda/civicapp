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
        <div className="inset-x-0 -mb-26 z-20 px-4 sm:px-6">
            <div className="mx-auto w-full max-w-md">
                <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={isDisabled}
                    className="h-14 w-full rounded-full text-base font-medium shadow-md cursor-pointer bg-success"
                >
                    {isSubmitting ? "Pubblicazione..." : "Pubblica segnalazione"}
                </Button>
            </div>
        </div>
    )
}