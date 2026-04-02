export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-8 space-y-2">
                <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border p-6"
                    >
                        <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
                        <div className="mt-4 h-8 w-16 animate-pulse rounded-md bg-muted" />
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border p-6"
                    >
                        <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
                        <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-muted" />
                        <div className="mt-2 h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    )
}