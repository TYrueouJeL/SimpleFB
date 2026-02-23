import Tag from "#models/tag"
import { faker } from "@faker-js/faker"

type TagType = {
    name?: string
}

export class TagFactory {
    static async create(data: TagType = {}) {
        return Tag.create({
            name: data.name ?? faker.word.sample({ length: { min: 3, max: 10 } })
        })
    }

    static async createMany(count: number) {
        const tags = []
        for (let i = 0; i < count; i++) {
            tags.push(await this.create())
        }
        return tags
    }
}