"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface UseMyPositionButtonProps {
    onSelect: (data: {
        lat: number
        lng: number
        address: string
        street?: string
        houseNumber?: string
        city?: string
        postcode?: string
    }) => void
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

export function UseMyPositionButton({
    onSelect,
}: UseMyPositionButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

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

        const address =
            data.display_name ??
            [street, houseNumber, city, postcode].filter(Boolean).join(", ")

        return {
            address,
            street,
            houseNumber,
            city,
            postcode,
        }
    }

    function handleClick() {
        if (!navigator.geolocation) {
            return
        }

        setIsLoading(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude
                const lng = position.coords.longitude

                try {
                    const locationData = await reverseGeocode(lat, lng)

                    onSelect({
                        lat,
                        lng,
                        address: locationData.address,
                        street: locationData.street,
                        houseNumber: locationData.houseNumber,
                        city: locationData.city,
                        postcode: locationData.postcode,
                    })
                } catch {
                    onSelect({
                        lat,
                        lng,
                        address: "",
                    })
                } finally {
                    setIsLoading(false)
                }
            },
            () => {
                setIsLoading(false)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        )
    }

    return (
        <Button
            type="button"
            variant="outline"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading ? "Rilevo posizione..." : "Usa la mia posizione"}
        </Button>
    )
}