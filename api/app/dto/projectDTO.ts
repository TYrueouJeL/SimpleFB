export interface ProjectDTO {
    id: string
    name: string
    slug: string
    is_public: boolean
}

export interface CreateProjectDTO {
    name: string
    is_public: boolean
}

export interface UpdateProjectDTO {
    name?: string
    is_public?: boolean
}