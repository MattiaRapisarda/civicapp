"use client"

import { useMemo, useState } from "react"
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

export function NewReportFlow() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [category, setCategory] = useState<ReportCategory | null>(null)
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const isValid = useMemo(() => {
        return Boolean(
            imageFile &&
            title.trim() &&
            address.trim() &&
            category &&
            description.trim()
        )
    }, [imageFile, title, address, category, description])

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) return

        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }

        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
        setImageFile(file)
        setErrorMessage(null)
        setSuccessMessage(null)
    }

    function handleRemoveImage() {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }

        setImagePreview(null)
        setImageFile(null)
        setErrorMessage(null)
        setSuccessMessage(null)
    }

    async function handleSubmit() {
        if (!isValid || !imageFile || !category) return

        try {
            setIsSubmitting(true)
            setErrorMessage(null)
            setSuccessMessage(null)

            const formData = new FormData()
            formData.append("image", imageFile)
            formData.append("title", title.trim())
            formData.append("address", address.trim())
            formData.append("category", category)
            formData.append("description", description.trim())

            const result = await createReport(formData)

            if (!result.success) {
                setErrorMessage(result.error)
                return
            }

            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }

            setImagePreview(null)
            setImageFile(null)
            setTitle("")
            setAddress("")
            setCategory(null)
            setDescription("")
            setSuccessMessage("Segnalazione inviata con successo.")
        } catch (error) {
            console.error(error)
            setErrorMessage("Si è verificato un errore imprevisto.")
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
                    description="Aggiungi una foto, indica il punto e descrivi il problema."
                />

                <ReportPhotoCard
                    imagePreview={imagePreview}
                    onImageChange={handleImageChange}
                    onRemoveImage={handleRemoveImage}
                />

                <ReportLocationCard
                    address={address}
                    onAddressChange={setAddress}
                    onUseCurrentLocation={() => {
                        console.log("use current location")
                    }}
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