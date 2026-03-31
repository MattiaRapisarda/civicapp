"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface UseMyPositionButtonProps {
    onSelect: (coords: { lat: number; lng: number }) => void
}

export function UseMyPositionButton({
    onSelect,
}: UseMyPositionButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    function handleClick() {
        if (!navigator.geolocation) {
            return
        }

        setIsLoading(true)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                onSelect({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
                setIsLoading(false)
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
        <Button type="button" variant="outline" onClick={handleClick} disabled={isLoading}>
            {isLoading ? "Rilevo posizione..." : "Usa la mia posizione"}
        </Button>
    )
}