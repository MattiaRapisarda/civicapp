"use server"

type SearchAddressCoordinatesResult =
    | {
        success: true
        lat: number
        lng: number
        displayName: string
    }
    | {
        success: false
        error: string
    }

export async function searchAddressCoordinates(
    query: string
): Promise<SearchAddressCoordinatesResult> {
    const normalizedQuery = query.trim()

    if (!normalizedQuery) {
        return {
            success: false,
            error: "Inserisci un indirizzo valido.",
        }
    }

    try {
        const params = new URLSearchParams({
            q: normalizedQuery,
            format: "jsonv2",
            limit: "1",
            countrycodes: "it",
            addressdetails: "1",
        })

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?${params.toString()}`,
            {
                headers: {
                    "User-Agent": "CivicApp/1.0",
                    "Accept-Language": "it",
                },
                cache: "no-store",
            }
        )

        if (!response.ok) {
            return {
                success: false,
                error: "Servizio di ricerca posizione non disponibile.",
            }
        }

        const results = (await response.json()) as Array<{
            lat: string
            lon: string
            display_name: string
        }>

        const firstResult = results[0]

        if (!firstResult) {
            return {
                success: false,
                error: "Nessun risultato trovato per questo indirizzo.",
            }
        }

        const lat = Number(firstResult.lat)
        const lng = Number(firstResult.lon)

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return {
                success: false,
                error: "Coordinate non valide restituite dalla ricerca.",
            }
        }

        return {
            success: true,
            lat,
            lng,
            displayName: firstResult.display_name,
        }
    } catch (error) {
        console.error("SEARCH ADDRESS COORDINATES ERROR:", error)

        return {
            success: false,
            error: "Ricerca indirizzo non riuscita.",
        }
    }
}