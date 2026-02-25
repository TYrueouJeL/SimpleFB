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
        const results = []

        if (data.userIds && data.projectIds) {
            const allPairs = []

            for (const userId of data.userIds) {
                for (const projectId of data.projectIds) {
                    allPairs.push({ userId, projectId })
                }
            }

            if (allPairs.length < count) {
                throw new Error(
                    `Impossible de générer ${count} combinaisons uniques. Max possible: ${allPairs.length}`
                )
            }

            const shuffled = faker.helpers.shuffle(allPairs).slice(0, count)

            for (const pair of shuffled) {
                results.push(await this.create({ ...data, ...pair }))
            }

            return results
        }

        throw new Error("userIds et projectIds requis pour createMany sécurisé")
    }
}