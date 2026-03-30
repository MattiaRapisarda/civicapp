export type ReportStatus = "in_verifica" | "presa_in_carico" | "risolta"

export type ReportUpdateType = "created" | "review" | "progress" | "resolved"

export type ReportUpdate = {
    id: string
    title: string
    description: string
    createdAtLabel: string
    type: ReportUpdateType
}

export type ReportComment = {
    id: string
    author: string
    text: string
    createdAtLabel: string
    likes: number
}

export type ReportDetail = {
    id: string
    title: string
    description: string
    category: string
    status: ReportStatus
    location: string
    address: string
    coordinates: {
        lat: number
        lng: number
    }
    updatedAtLabel: string
    createdAtLabel: string
    supports: number
    commentsCount: number
    image: string
    reporter: string
    isCreatedByCurrentUser: boolean
    isSupportedByCurrentUser: boolean
    updates: ReportUpdate[]
    comments: ReportComment[]
}