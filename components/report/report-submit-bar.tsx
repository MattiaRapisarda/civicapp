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
        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">
            <div className="mx-auto flex w-full max-w-2xl items-center gap-3">
                <Button
                    type="button"
                    onClick={onSubmit}
                    disabled={isDisabled}
                    className="h-14 w-full rounded-full text-base font-medium cursor-pointer"
                >
                    {isSubmitting ? "Pubblicazione..." : "Pubblica segnalazione"}
                </Button>
            </div>
        </div>
    )
}