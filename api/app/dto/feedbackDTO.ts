export interface FeedbackDTO {
    id: string
    title: string
    tagId: string
    projectId: string
    userId: string
}

export interface CreateFeedbackDTO {
    title: string
    tagId: string
    projectId: string
    userId: string
}

export interface UpdateFeedbackDTO {
    title?: string
    tagId?: string
    projectId?: string
    userId?: string
}