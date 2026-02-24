export interface Feedback {
    id: string
    title: string
    note: number
    tagId: string
    projectId: string
    userId: string
    createdAt: Date
    updatedAt?: Date
}