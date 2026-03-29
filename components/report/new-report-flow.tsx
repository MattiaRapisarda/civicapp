"use client"

import { useMemo, useState } from "react"
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
import type {
    ReportCategory,
    ReportCategoryItem,
} from "@/components/report/report-types"

const categories: ReportCategoryItem[] = [
    { value: "road", label: "Buche e strada", icon: Construction },
    { value: "lighting", label: "Illuminazione", icon: Lightbulb },
    { value: "waste", label: "Rifiuti", icon: Trash2 },
    { value: "green", label: "Verde pubblico", icon: TreePine },
    { value: "other", label: "Altro", icon: AlertCircle },
]

export function NewReportFlow() {
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [address, setAddress] = useState("")
    const [category, setCategory] = useState<ReportCategory | null>(null)
    const [description, setDescription] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isValid = useMemo(() => {
        return Boolean(imagePreview && address.trim() && category)
    }, [imagePreview, address, category])

    function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) return

        const previewUrl = URL.createObjectURL(file)
        setImagePreview(previewUrl)
    }

    function handleRemoveImage() {
        setImagePreview(null)
    }

    async function handleSubmit() {
        if (!isValid) return

        try {
            setIsSubmitting(true)

            // TODO: collega qui action o API reale
            await new Promise((resolve) => setTimeout(resolve, 1000))

            console.log({
                imagePreview,
                address,
                category,
                description,
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <ReportFlowTopbar />

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-40 pt-4 sm:px-6 lg:px-8">
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
                        // TODO: collega qui la geolocalizzazione reale
                        console.log("use current location")
                    }}
                />

                <ReportCategoryCard
                    categories={categories}
                    selectedCategory={category}
                    onSelectCategory={setCategory}
                />

                <ReportDetailsCard
                    description={description}
                    onDescriptionChange={setDescription}
                    maxLength={240}
                />
            </div>

            <ReportSubmitBar
                isDisabled={!isValid || isSubmitting}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
            />
        </>
    )
}