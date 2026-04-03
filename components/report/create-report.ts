"use server"

import { randomUUID } from "crypto"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

type CreateReportResult =
    | { success: true; reportId: string }
    | { success: false; error: string }

export async function createReport(
    formData: FormData
): Promise<CreateReportResult> {
    try {
        const supabase = await createSupabaseServerClient()

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
            console.error("AUTH GET USER ERROR:", userError)

            return {
                success: false,
                error: "Devi essere autenticato per inviare una segnalazione.",
            }
        }

        const image = formData.get("image")
        const title = formData.get("title")?.toString().trim() ?? ""
        const address = formData.get("address")?.toString().trim() ?? ""
        const category = formData.get("category")?.toString().trim() ?? ""
        const description = formData.get("description")?.toString().trim() ?? ""
        const latValue = formData.get("lat")?.toString().trim() ?? ""
        const lngValue = formData.get("lng")?.toString().trim() ?? ""

        const lat = Number(latValue)
        const lng = Number(lngValue)

        if (!image || typeof image === "string") {
            return {
                success: false,
                error: "Immagine non valida.",
            }
        }

        if (image.size === 0) {
            return {
                success: false,
                error: "Immagine non valida o vuota.",
            }
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
        const maxSize = 5 * 1024 * 1024

        if (!allowedTypes.includes(image.type)) {
            return {
                success: false,
                error: "Formato immagine non supportato.",
            }
        }

        if (image.size > maxSize) {
            return {
                success: false,
                error: "L'immagine deve essere inferiore a 5 MB.",
            }
        }

        if (!title) {
            return {
                success: false,
                error: "Inserisci un titolo.",
            }
        }

        if (!address) {
            return {
                success: false,
                error: "Inserisci un indirizzo.",
            }
        }

        if (!category) {
            return {
                success: false,
                error: "Seleziona una categoria.",
            }
        }

        if (!description) {
            return {
                success: false,
                error: "Inserisci una descrizione.",
            }
        }

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
            return {
                success: false,
                error: "Seleziona un punto valido sulla mappa.",
            }
        }

        const { data: createdReport, error: reportInsertError } = await supabase
            .from("reports")
            .insert({
                title,
                description,
                category,
                status: "in_verifica",
                location: address,
                address,
                lat,
                lng,
                reporter_id: user.id,
            })
            .select("id")
            .single()

        if (reportInsertError || !createdReport) {
            console.error("REPORT INSERT ERROR:", reportInsertError)

            return {
                success: false,
                error:
                    reportInsertError?.message ??
                    "Impossibile creare la segnalazione.",
            }
        }

        const extensionMap: Record<string, string> = {
            "image/jpeg": "jpg",
            "image/png": "png",
            "image/webp": "webp",
        }

        const fileExt = extensionMap[image.type] ?? "jpg"
        const filePath = `${user.id}/${createdReport.id}/${randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from("report-images")
            .upload(filePath, image, {
                cacheControl: "3600",
                upsert: false,
                contentType: image.type,
            })

        if (uploadError) {
            console.error("STORAGE UPLOAD ERROR:", uploadError)

            await supabase.from("reports").delete().eq("id", createdReport.id)

            return {
                success: false,
                error:
                    uploadError.message ??
                    "Upload immagine non riuscito.",
            }
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from("report-images").getPublicUrl(filePath)

        const { error: imageInsertError } = await supabase
            .from("report_images")
            .insert({
                report_id: createdReport.id,
                image_url: publicUrl,
                is_cover: true,
            })

        if (imageInsertError) {
            console.error("REPORT IMAGE INSERT ERROR:", imageInsertError)

            await supabase.storage.from("report-images").remove([filePath])
            await supabase.from("reports").delete().eq("id", createdReport.id)

            return {
                success: false,
                error:
                    imageInsertError.message ??
                    "Impossibile associare l'immagine alla segnalazione.",
            }
        }

        revalidatePath("/")
        revalidatePath("/map")
        revalidatePath("/activity")
        revalidatePath("/report")
        revalidatePath("/profile")

        return {
            success: true,
            reportId: createdReport.id,
        }
    } catch (error) {
        console.error("CREATE REPORT ACTION ERROR:", error)

        return {
            success: false,
            error: "Errore interno del server.",
        }
    }
}