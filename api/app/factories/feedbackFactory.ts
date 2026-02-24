import { faker } from "@faker-js/faker"
import { ProjectFactory } from "./projectFactory.js"
import { UserFactory } from "./userFactory.js"
import Feedback from "#models/feedback"
import { TagFactory } from "./tagFactory.js"

type FeedbackType = {
    title?: string
    note?: number
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
        const user = data.userId ? null : await UserFactory.create()

        return Feedback.create({
            title: data.title ?? faker.word.words(),
            note: data.note ?? faker.number.int({ min:1, max: 5}),
            tagId: data.tagId ?? faker.string.uuid() ?? tag!.id,
            projectId: data.projectId ?? faker.string.uuid() ?? project!.id,
            userId: data.userId ?? faker.string.uuid() ?? user!.id
        })
    }

    static async createMany(count: number, data: FeedbackType = {}) {
        const pairs = new Set<string>()
        const results = []

        while (results.length < count) {
            const userId = data.userIds
                ? faker.helpers.arrayElement(data.userIds)
                : (await UserFactory.create()).id
            const projectId = data.projectIds
                ? faker.helpers.arrayElement(data.projectIds)
                : (await ProjectFactory.create()).id
            const tagId = data.tagIds
                ? faker.helpers.arrayElement(data.tagIds)
                : (await TagFactory.create()).id

            const key = `${userId}-${projectId}-${tagId}`
            if (pairs.has(key)) continue

            pairs.add(key)
            results.push(await this.create({ ...data, userId, projectId, tagId }))
        }

        return results
    }
}