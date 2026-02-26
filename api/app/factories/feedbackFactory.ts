import { faker } from "@faker-js/faker"
import { ProjectFactory } from "./projectFactory.js"
import Feedback from "#models/feedback"
import { TagFactory } from "./tagFactory.js"

type FeedbackType = {
    title?: string
    isOpen?: boolean
    tagId?: string
    projectId?: string
    userId?: string
    tagIds?: string[]
    projectIds?: string[]
    userIds?: string[]
}

export class FeedbackFactory {
    static async create(data: FeedbackType = {}) {
        const tag = data.tagId ? null : await TagFactory.create()
        const project = data.projectId ? null : await ProjectFactory.create()

        return Feedback.create({
            title: data.title ?? faker.word.words(),
            tagId: data.tagId ?? faker.string.uuid() ?? tag!.id,
            projectId: data.projectId ?? faker.string.uuid() ?? project!.id,
            userId: data.userId ?? null
        })
    }

    static async createMany(count: number, data: FeedbackType = {}) {
        const results = []

        while (results.length < count) {
            const userId = data.userIds
                ? faker.helpers.arrayElement(data.userIds)
                : undefined
            const projectId = data.projectIds
                ? faker.helpers.arrayElement(data.projectIds)
                : (await ProjectFactory.create()).id
            const tagId = data.tagIds
                ? faker.helpers.arrayElement(data.tagIds)
                : (await TagFactory.create()).id

            results.push(await this.create({ ...data, userId, projectId, tagId }))
        }

        return results
    }
}