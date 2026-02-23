export interface FeedbackDTO {
    id: string
    tagId: string
    projectId: string
    userId: string
}

export interface CreateFeedbackDTO {
    tagId: string
    projectId: string
    userId: string
}

export interface UpdateFeedbackDTO {
    tagId?: string
    projectId?: string
    userId?: string
}