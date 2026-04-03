"use client"

import { useEffect, useMemo, useState } from "react"
import type { ChangeEvent } from "react"
import {
    AlertCircle,
    Construction,
    Lightbulb,
    Trash2,
    TreePine,
} from "lucide-react"

import { ReportFlowTopbar } from "@/components/report/report-flow-topbar"
import { ReportFlowHeader } from "@/components/report/report-flow-header"
import { ReportPhotoCard } from "@/components/report/report-photo-card"
import { ReportLocationCard } from "@/components/report/report-location-card"
import { ReportCategoryCard } from "@/components/report/report-category-card"
import { ReportDetailsCard } from "@/components/report/report-details-card"
import { ReportSubmitBar } from "@/components/report/report-submit-bar"
import { createReport } from "@/components/report/create-report"
import type {
    ReportCategory,
    ReportCategoryItem,
} from "@/components/report/report-types"

const categories: ReportCategoryItem[] = [
    { value: "Buche e strada", label: "Buche e strada", icon: Construction },
    { value: "Illuminazione", label: "Illuminazione", icon: Lightbulb },
    { value: "Rifiuti", label: "Rifiuti", icon: Trash2 },
    { value: "Verde pubblico", label: "Verde pubblico", icon: TreePine },
    { value: "Altro", label: "Altro", icon: AlertCircle },
]

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

export function NewReportFlow() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [selectedCoords, setSelectedCoords] = useState<SelectedCoords | null>(
        null
    )
    const [category, setCategory] = useState<ReportCategory | null>(null)
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isResolvingAddress, setIsResolvingAddress] = useState(false)
    const [isLocationSynced, setIsLocationSynced] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    const isValid = useMemo(() => {
        return Boolean(
            imageFile &&
            title.trim() &&
            address.trim() &&
            selectedCoords &&
            category &&
            description.trim() &&
            isLocationSynced &&
            !isResolvingAddress
        )
    }, [
        imageFile,
        title,
        address,
        selectedCoords,
        category,
        description,
        isLocationSynced,
        isResolvingAddress,
    ])

    function resetMessages() {
        setErrorMessage(null)
        setSuccessMessage(null)
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setErrorMessage("Seleziona un'immagine valida.")
            return
        }

        const maxSize = 50 * 1024 * 1024
        if (file.size > maxSize) {
            setErrorMessage("L'immagine deve essere inferiore a 25 MB.")
            return
        }

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }

        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
        setImageFile(file)
        resetMessages()
    }

    function handleRemoveImage() {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }

        setImagePreview(null)
        setImageFile(null)
        resetMessages()
    }

    function handleAddressChange(value: string) {
        setAddress(value)
        setIsLocationSynced(false)
        resetMessages()
    }

    function handleSuggestionSelect(suggestion: LocationSuggestion) {
        setAddress(suggestion.label)
        setSelectedCoords({
            lat: suggestion.lat,
            lng: suggestion.lng,
        })
        setIsLocationSynced(true)
        resetMessages()
    }

    function handleMapPositionChange(
        coords: SelectedCoords,
        resolvedAddress?: string
    ) {
        setSelectedCoords(coords)

        if (resolvedAddress?.trim()) {
            setAddress(resolvedAddress.trim())
            setIsLocationSynced(true)
        } else {
            setIsLocationSynced(false)
        }

        resetMessages()
    }

    function handleUseCurrentLocationResolved(
        coords: SelectedCoords,
        resolvedAddress?: string
    ) {
        setSelectedCoords(coords)

        if (resolvedAddress?.trim()) {
            setAddress(resolvedAddress.trim())
            setIsLocationSynced(true)
        } else {
            setIsLocationSynced(false)
        }

        resetMessages()
    }

    async function handleSubmit() {
        if (isSubmitting) return
        if (!isValid || !imageFile || !category || !selectedCoords) return

        try {
            setIsSubmitting(true)
            resetMessages()

            const formData = new FormData()
            formData.append("image", imageFile)
            formData.append("title", title.trim())
            formData.append("address", address.trim())
            formData.append("category", category)
            formData.append("description", description.trim())
            formData.append("lat", String(selectedCoords.lat))
            formData.append("lng", String(selectedCoords.lng))

            const result = await createReport(formData)

            if (!result.success) {
                setErrorMessage(result.error || "Invio non riuscito.")
                return
            }

            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }

            setImagePreview(null)
            setImageFile(null)
            setTitle("")
            setAddress("")
            setSelectedCoords(null)
            setCategory(null)
            setDescription("")
            setIsLocationSynced(false)

            setSuccessMessage("Segnalazione inviata con successo.")
        } catch (error) {
            console.error("Errore invio segnalazione:", error)

            if (error instanceof Error) {
                setErrorMessage(error.message || "Si è verificato un errore imprevisto.")
            } else {
                setErrorMessage("Si è verificato un errore imprevisto.")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="mx-auto w-full max-w-5xl gap-4 px-4 pb-28 pt-2 sm:px-6 lg:px-8">
            <ReportFlowTopbar />

            <div className="mt-4 flex flex-col gap-6">
                <ReportFlowHeader
                    title="Nuova segnalazione"
                    description="Aggiungi una foto, indica il punto esatto sulla mappa e descrivi il problema."
                />

                <ReportPhotoCard
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    onRemoveImage={handleRemoveImage}
                />

                <ReportLocationCard
                    address={address}
                    selectedCoords={selectedCoords}
                    isResolvingAddress={isResolvingAddress}
                    onAddressChange={handleAddressChange}
                    onAddressResolvingChange={setIsResolvingAddress}
                    onMapPositionChange={handleMapPositionChange}
                    onUseCurrentLocationResolved={handleUseCurrentLocationResolved}
                    onSuggestionSelect={handleSuggestionSelect}
                />

                <ReportCategoryCard
                    categories={categories}
                    selectedCategory={category}
                    onSelectCategory={setCategory}
                />

                <ReportDetailsCard
                    title={title}
                    onTitleChange={setTitle}
                    description={description}
                    onDescriptionChange={setDescription}
                    maxLength={240}
                />

                {!isLocationSynced && address.trim() ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        Conferma un indirizzo valido o seleziona un punto corretto
                        sulla mappa.
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errorMessage}
                    </div>
                ) : null}

                {successMessage ? (
                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {successMessage}
                    </div>
                ) : null}

                <ReportSubmitBar
                    isDisabled={!isValid || isSubmitting}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </main>
    )
}