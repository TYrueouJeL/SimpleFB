import { ProjectDTO } from "./projectDTO.js"
import { TagDTO } from "./tagDTO.js"
import { UserDTO } from "./userDTO.js"

export interface FeedbackDTO {
    id: string
    tag: TagDTO
    project: ProjectDTO
    customer: UserDTO
}

export interface CreateFeedbackDTO {
    tag_id: string
    project_id: string
    customer_id: string
}

export interface UpdateFeedbackDTO {
    tag_id: string
}