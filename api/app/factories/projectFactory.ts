import Project from "#models/project"
import { faker } from "@faker-js/faker"

type ProjectType = {
    name?: string
    enableAnonymousFeedback?: boolean
}

export class ProjectFactory {
    static async create(data: ProjectType = {}) {
        return Project.create({
            name: data.name || faker.company.name(),
            enableAnonymousFeedback: data.enableAnonymousFeedback || faker.datatype.boolean()
        })
    }

    static async createMany(count: number) {
        const projects = []
        for (let i = 0; i < count; i++) {
            projects.push(await this.create())
        }
        return projects
    }
}