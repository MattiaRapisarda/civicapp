interface ReportFlowHeaderProps {
    title: string
    description: string
}

export function ReportFlowHeader({
    title,
    description,
}: ReportFlowHeaderProps) {
    return (
        <div className="space-y-1 px-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
                {description}
            </p>
        </div>
    )
}