import { Camera, ImagePlus, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ReportPhotoCardProps {
    imagePreview: string | null
    onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveImage: () => void
}

export function ReportPhotoCard({
    imagePreview,
    onImageChange,
    onRemoveImage,
}: ReportPhotoCardProps) {
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

                {imagePreview ? (
                    <div className="relative overflow-hidden rounded-[24px]">
                        <img
                            src={imagePreview}
                            alt="Anteprima segnalazione"
                            className="h-72 w-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={onRemoveImage}
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm transition hover:scale-[1.02]"
                            aria-label="Rimuovi immagine"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ) : (
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed bg-muted/30 px-6 py-10 text-center transition hover:bg-muted/50">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background shadow-sm">
                            <ImagePlus className="h-6 w-6" />
                        </div>

                        <div className="space-y-1">
                            <p className="font-medium">Scatta o carica una foto</p>
                            <p className="text-sm text-muted-foreground">JPG, PNG o HEIC</p>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            className="hidden"
                            onChange={onImageChange}
                        />
                    </label>
                )}
            </CardContent>
        </Card>
    )
}