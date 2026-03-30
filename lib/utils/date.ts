export function formatRelativeDate(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()

    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diff < 60) return "Adesso"
    if (diff < 3600) return `${Math.floor(diff / 60)} min fa`
    if (diff < 86400) return `${Math.floor(diff / 3600)} ore fa`
    if (diff < 172800) return "Ieri"

    return `${Math.floor(diff / 86400)} giorni fa`
}