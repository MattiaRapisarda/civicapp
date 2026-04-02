"use client"

import { Heart } from "lucide-react"
import type { ReportComment } from "@/components/report/report-detail-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ReportDetailCommentsCardProps {
    comment: string
    comments: ReportComment[]
    commentError: string | null
    isCommentPending: boolean
    onCommentChange: (value: string) => void
    onSubmitComment: () => void
}

export function ReportDetailCommentsCard({
    comment,
    comments,
    commentError,
    isCommentPending,
    onCommentChange,
    onSubmitComment,
}: ReportDetailCommentsCardProps) {
    return (
        <Card className="overflow-hidden rounded-[28px] border-0 shadow-sm">
            <CardContent className="space-y-5 p-5 sm:p-6">
                <div>
                    <h2 className="text-lg font-semibold">Commenti</h2>
                    <p className="text-sm text-muted-foreground">
                        Contributi della comunità
                    </p>
                </div>

                <div className="rounded-[24px] border bg-background p-4">
                    <label htmlFor="comment" className="mb-2 block text-sm font-medium">
                        Aggiungi un commento
                    </label>

                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(event) => onCommentChange(event.target.value)}
                        placeholder="Scrivi un aggiornamento o condividi la tua esperienza..."
                        className="min-h-27.5 w-full resize-none rounded-[18px] border bg-background px-4 py-3 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-foreground/20"
                    />

                    <div className="mt-3 flex items-center justify-between gap-3">
                        {commentError ? (
                            <p className="text-sm text-destructive">{commentError}</p>
                        ) : (
                            <span className="text-xs text-muted-foreground">
                                Condividi informazioni utili e verificabili.
                            </span>
                        )}

                        <Button
                            onClick={onSubmitComment}
                            disabled={isCommentPending || comment.trim().length === 0}
                            className="cursor-pointer rounded-full"
                        >
                            {isCommentPending ? "Pubblicazione..." : "Pubblica commento"}
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    {comments.map((commentItem) => (
                        <div
                            key={commentItem.id}
                            className="rounded-[24px] bg-muted/50 p-4"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="font-medium">{commentItem.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {commentItem.createdAtLabel}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Heart className="h-4 w-4" />
                                    <span>{commentItem.likes}</span>
                                </div>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-foreground/90">
                                {commentItem.text}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}