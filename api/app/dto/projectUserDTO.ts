import { RoleEnum } from "../enums/roleEnum.js"

export interface ProjectUserDTO {
    id: string
    userId: string
    projectId: string
    role: RoleEnum
}

export interface CreateProjectUserDTO {
    userId: string
    projectId: string
    role: RoleEnum
}

export interface UpdateProjectUserDTO {
    userId?: string
    projectId?: string
    role?: RoleEnum
}