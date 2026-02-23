import { FeedbackDTO } from "./feedbackDTO.js"

export interface TagDTO {
    id: string
    name: string
    feedbacks: FeedbackDTO[]
}

export interface CreateTagDTO {
    name: string
}

export interface UpdateTagDTO {
    name: string
}