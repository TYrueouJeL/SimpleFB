export interface Project {
    id: string
    name: string
    slug: string
    enableAnonymousFeedback: boolean
    createdAt: Date
    updatedAt?: Date
}