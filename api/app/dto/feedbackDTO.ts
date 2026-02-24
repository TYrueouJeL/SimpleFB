export interface FeedbackDTO {
    id: string
    title: string
    note: number
    tagId: string
    projectId: string
    userId: string
}

export interface CreateFeedbackDTO {
    title: string
    note: number
    tagId: string
    projectId: string
    userId: string
}

export interface UpdateFeedbackDTO {
    title?: string
    note?: number
    tagId?: string
    projectId?: string
    userId?: string
}