import type { Project } from "./Project"
import type { Tag } from "./Tag"
import type { User } from "./User"

export interface Feedback {
    id: string
    title: string
    isOpen: string
    tag: Tag
    project: Project
    user: User
    createdAt: Date
    updatedAt?: Date
}