export interface Project {
    id: string
    name: string
    slug: string
    isPublic: boolean
    createdAt: Date
    updatedAt?: Date
}