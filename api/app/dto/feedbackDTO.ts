export interface FeedbackDTO {
    id: string
    title: string
    isOpen: boolean
    tagId: string
    projectId: string
    userId: string
}

export interface CreateFeedbackDTO {
    title: string
    isOpen: boolean
    tagId: string
    projectId: string
    userId: string
}

export interface UpdateFeedbackDTO {
    title?: string
    isOpen?: boolean
    tagId?: string
    projectId?: string
    userId?: string
}