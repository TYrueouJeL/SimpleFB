export interface ProjectDTO {
    id: string
    name: string
    slug: string
    enableAnonymousFeedback: boolean
}

export interface CreateProjectDTO {
    name: string
    enableAnonymousFeedback: boolean
}

export interface UpdateProjectDTO {
    name?: string
    enableAnonymousFeedback?: boolean
}