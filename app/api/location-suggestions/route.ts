import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type NominatimResult = {
    place_id: number
    display_name: string
    lat: string
    lon: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q")?.trim() ?? ""

    if (q.length < 3) {
        return NextResponse.json({ suggestions: [] })
    }

    const enrichedQuery = q.toLowerCase().includes("calatabiano")
        ? q
        : `${q}, Calatabiano, Italia`

    const params = new URLSearchParams({
        q: enrichedQuery,
        format: "jsonv2",
        limit: "5",
        countrycodes: "it",
        addressdetails: "1",
    })

    try {
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
            return NextResponse.json(
                { suggestions: [], error: "Servizio non disponibile." },
                { status: 502 }
            )
        }

        const data = (await response.json()) as NominatimResult[]

        const suggestions = data
            .map((item) => ({
                id: String(item.place_id),
                label: item.display_name,
                lat: Number(item.lat),
                lng: Number(item.lon),
            }))
            .filter(
                (item) =>
                    Number.isFinite(item.lat) && Number.isFinite(item.lng)
            )

        return NextResponse.json({ suggestions })
    } catch (error) {
        console.error("LOCATION SUGGESTIONS ERROR:", error)

        return NextResponse.json(
            { suggestions: [], error: "Ricerca suggerimenti non riuscita." },
            { status: 500 }
        )
    }
}