import { StringColorFormat } from "@faker-js/faker"
import { FeedbackDTO } from "./feedbackDTO.js"

export interface TagDTO {
    id: string
    name: string
    color: StringColorFormat
    feedbacks: FeedbackDTO[]
}

export interface CreateTagDTO {
    name: string
    color: string
}

export interface UpdateTagDTO {
    name?: string
    color?: string
}