import ProjectUser from "#models/project_user"
import { faker } from "@faker-js/faker"
import { RoleEnum } from "../enums/roleEnum.js"
import { ProjectFactory } from "./projectFactory.js"
import { UserFactory } from "./userFactory.js"

type ProjectUserType = {
    userId?: string
    projectId?: string
    role?: RoleEnum
    userIds?: string[]
    projectIds?: string[]
}

export class ProjectUserFactory {
    static async create(data: ProjectUserType = {}) {
        const project = data.projectId ? null : await ProjectFactory.create()
        const user = data.userId ? null : await UserFactory.create()

        return ProjectUser.create({
            userId: data.userId ?? faker.helpers.arrayElement(data.userIds!) ?? user!.id,
            projectId: data.projectId ?? faker.helpers.arrayElement(data.projectIds!) ?? project!.id,
            role: data.role ?? faker.helpers.enumValue(RoleEnum)
        })
    }

    static async createMany(count: number, data: ProjectUserType = {}) {
    const pairs = new Set<string>()
    const results = []

    while (results.length < count) {
        const userId = data.userIds 
            ? faker.helpers.arrayElement(data.userIds) 
            : (await UserFactory.create()).id
        const projectId = data.projectIds 
            ? faker.helpers.arrayElement(data.projectIds) 
            : (await ProjectFactory.create()).id

        const key = `${userId}-${projectId}`
        if (pairs.has(key)) continue

        pairs.add(key)
        results.push(await this.create({ ...data, userId, projectId }))
    }

    return results
    }
}