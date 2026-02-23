export interface ProjectDTO {
    id: string
    name: string
    slug: string
    isPublic: boolean
}

export interface CreateProjectDTO {
    name: string
    isPublic: boolean
}

export interface UpdateProjectDTO {
    name?: string
    isPublic?: boolean
}