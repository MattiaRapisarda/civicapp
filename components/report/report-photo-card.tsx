"use client"

import Image from "next/image"
import { Camera, ImagePlus, Upload, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ReportPhotoCardProps {
    imagePreview: string | null
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveImage: () => void
    disabled?: boolean
}

export function ReportPhotoCard({
    imagePreview,
    onImageChange,
    onRemoveImage,
    disabled = false,
}: ReportPhotoCardProps) {
    const inputId = "report-photo-input"

    return (
        <Card className="overflow-hidden rounded-[28px] border shadow-sm">
            <CardContent className="p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                        <Camera className="h-5 w-5 text-foreground/80" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold">Foto</h2>
                        <p className="text-sm text-muted-foreground">
                            Aggiungi un’immagine del problema
                        </p>
                    </div>
                </div>

                <input
                    id={inputId}
                    type="file"
                    accept="image/png,image/jpeg,image/heic,image/heif,image/webp"
                    className="sr-only"
                    onChange={onImageChange}
                    disabled={disabled}
                />

                {imagePreview ? (
                    <div className="space-y-3">
                        <div className="relative overflow-hidden rounded-[24px] border bg-muted/20">
                            <div className="relative h-72 w-full">
                                <Image
                                    src={imagePreview}
                                    alt="Anteprima della foto della segnalazione"
                                    fill
                                    unoptimized
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 768px"
                                />
                            </div>

                            <Button
                                type="button"
                                size="icon"
                                variant="secondary"
                                onClick={onRemoveImage}
                                disabled={disabled}
                                className="absolute right-3 top-3 h-9 w-9 rounded-full shadow-sm"
                                aria-label="Rimuovi immagine"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <label htmlFor={inputId} className="flex-1">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full cursor-pointer"
                                    disabled={disabled}
                                    asChild
                                >
                                    <span>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Cambia foto
                                    </span>
                                </Button>
                            </label>

                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onRemoveImage}
                                disabled={disabled}
                                className="w-full sm:w-auto cursor-pointer text-destructive"
                            >
                                Rimuovi
                            </Button>
                        </div>
                    </div>
                ) : (
                    <label
                        htmlFor={inputId}
                        className={[
                            "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed px-6 py-10 text-center transition",
                            "bg-muted/30 hover:bg-muted/50",
                            "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                            disabled ? "cursor-not-allowed opacity-60" : "",
                        ].join(" ")}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm">
                            <ImagePlus className="h-6 w-6" />
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium">Scatta o carica una foto</p>
                            <p className="text-sm text-muted-foreground">
                                PNG, JPG, WEBP, HEIC
                            </p>
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Aiuta a capire meglio il problema segnalato
                        </p>
                    </label>
                )}
            </CardContent>
        </Card>
    )
}