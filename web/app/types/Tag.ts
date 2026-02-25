import type { Feedback } from "./Feedback"

export interface Tag {
    id: string
    name: string
    color: string
    feedbacks: Feedback[]
}