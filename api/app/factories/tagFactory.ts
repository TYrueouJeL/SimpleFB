import Tag from "#models/tag"
import { faker } from "@faker-js/faker"

type TagType = {
    name?: string
    color?: string
    isOpen?: boolean
}

export class TagFactory {
    static async create(data: TagType = {}) {
        return Tag.create({
            name: data.name ?? faker.word.sample({ length: { min: 3, max: 10 } }),
            color: data.color ?? faker.color.rgb(),
            isOpen: data.isOpen ?? faker.datatype.boolean()
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