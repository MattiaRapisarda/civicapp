"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronRight, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LocationPickerMapShell } from "@/components/map/location-picker-map-shell"

type SelectedCoords = {
    lat: number
    lng: number
}

type LocationSuggestion = {
    id: string
    label: string
    lat: number
    lng: number
}

type NominatimResponse = {
    display_name?: string
    address?: {
        road?: string
        pedestrian?: string
        house_number?: string
        city?: string
        town?: string
        village?: string
        postcode?: string
    }
}

interface ReportLocationCardProps {
    address: string
    selectedCoords: SelectedCoords | null
    isLocating: boolean
    onAddressChange: (value: string) => void
    onMapPositionChange: (coords: SelectedCoords) => void
    onUseCurrentLocation: () => void
    onSuggestionSelect: (suggestion: LocationSuggestion) => void
}

export function ReportLocationCard({
    address,
    selectedCoords,
    isLocating,
    onAddressChange,
    onMapPositionChange,
    onUseCurrentLocation,
    onSuggestionSelect,
}: ReportLocationCardProps) {
    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
    const [isResolvingAddress, setIsResolvingAddress] = useState(false)

    const normalizedAddress = useMemo(() => address.trim(), [address])

    useEffect(() => {
        if (normalizedAddress.length < 3) {
            setSuggestions([])
            setIsSuggestionsOpen(false)
            return
        }

        const controller = new AbortController()

        const timeoutId = window.setTimeout(async () => {
            try {
                setIsLoadingSuggestions(true)

                const response = await fetch(
                    `/api/location-suggestions?q=${encodeURIComponent(
                        normalizedAddress
                    )}`,
                    {
                        signal: controller.signal,
                    }
                )

                if (!response.ok) {
                    setSuggestions([])
                    setIsSuggestionsOpen(false)
                    return
                }

                const data = (await response.json()) as {
                    suggestions: LocationSuggestion[]
                }

                setSuggestions(data.suggestions ?? [])
                setIsSuggestionsOpen((data.suggestions?.length ?? 0) > 0)
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error("SUGGESTIONS FETCH ERROR:", error)
                }
                setSuggestions([])
                setIsSuggestionsOpen(false)
            } finally {
                setIsLoadingSuggestions(false)
            }
        }, 450)

        return () => {
            controller.abort()
            window.clearTimeout(timeoutId)
        }
    }, [normalizedAddress])

    async function reverseGeocode(lat: number, lng: number) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        )

        if (!response.ok) {
            throw new Error("Impossibile recuperare l'indirizzo")
        }

        const data: NominatimResponse = await response.json()

        const street = data.address?.road ?? data.address?.pedestrian ?? ""
        const houseNumber = data.address?.house_number ?? ""
        const city =
            data.address?.city ??
            data.address?.town ??
            data.address?.village ??
            ""
        const postcode = data.address?.postcode ?? ""

        return (
            data.display_name ??
            [street, houseNumber, city, postcode].filter(Boolean).join(", ")
        )
    }

    function handleSelectSuggestion(suggestion: LocationSuggestion) {
        onSuggestionSelect(suggestion)
        onAddressChange(suggestion.label)
        setSuggestions([])
        setIsSuggestionsOpen(false)
    }

    async function handleMapPositionChange(coords: SelectedCoords) {
        onMapPositionChange(coords)

        try {
            setIsResolvingAddress(true)
            const resolvedAddress = await reverseGeocode(coords.lat, coords.lng)

            if (resolvedAddress) {
                onAddressChange(resolvedAddress)
            }
        } catch (error) {
            console.error("REVERSE GEOCODING ERROR:", error)
        } finally {
            setIsResolvingAddress(false)
        }
    }

    return (
        <Card className="rounded-[28px] border shadow-sm">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <MapPin className="h-5 w-5 text-foreground/80" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold">Posizione</h2>
                        <p className="text-sm text-muted-foreground">
                            Scrivi un indirizzo oppure tocca la mappa per selezionare il punto esatto
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="overflow-hidden rounded-[24px] bg-muted/40">
                        <LocationPickerMapShell
                            value={selectedCoords}
                            onChange={handleMapPositionChange}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            value={address}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                onAddressChange(e.target.value)
                                setIsSuggestionsOpen(true)
                            }}
                            onFocus={() => {
                                if (suggestions.length > 0) {
                                    setIsSuggestionsOpen(true)
                                }
                            }}
                            placeholder="Via, piazza o riferimento"
                            className="h-12 w-full rounded-2xl border bg-background px-4 text-sm shadow-none outline-none"
                        />

                        {isLoadingSuggestions && normalizedAddress.length >= 3 ? (
                            <div className="mt-2 text-xs text-muted-foreground">
                                Cerco suggerimenti...
                            </div>
                        ) : null}

                        {isSuggestionsOpen && suggestions.length > 0 ? (
                            <div className="absolute z-1000 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border bg-background p-2 shadow-lg">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion.id}
                                        type="button"
                                        onClick={() =>
                                            handleSelectSuggestion(suggestion)
                                        }
                                        className="w-full rounded-xl px-3 py-3 text-left text-sm hover:bg-muted"
                                    >
                                        {suggestion.label}
                                    </button>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onUseCurrentLocation}
                        className="h-11 w-full cursor-pointer justify-between rounded-2xl border px-4"
                        disabled={isLocating}
                    >
                        {isLocating ? "Rilevo posizione..." : "Usa la mia posizione"}
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {isResolvingAddress ? (
                        <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                            Recupero indirizzo...
                        </div>
                    ) : address.trim() ? (
                        <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                            Indirizzo selezionato: {address}
                        </div>
                    ) : selectedCoords ? (
                        <div className="rounded-2xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
                            Punto selezionato sulla mappa
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
                            Nessun punto selezionato. Scrivi almeno 3 caratteri, scegli un suggerimento, tocca la mappa oppure usa la tua posizione attuale.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}