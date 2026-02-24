import Project from "#models/project";
import ProjectUser from "#models/project_user";
import { CreateProjectDTO, UpdateProjectDTO } from "../dto/projectDTO.js";
import { CreateProjectUserDTO } from "../dto/projectUserDTO.js";
import { RoleEnum } from "../enums/roleEnum.js";

export default class ProjectService {
    public async list(userId: string) {
        const projectUsers = await ProjectUser.query()
            .where('userId', userId)
            .preload('project')

        return projectUsers.map(pu => pu.project)
    }

    public async findById(projectId: string) {
        return Project
            .query()
            .where('id', projectId)
            .preload('users')
            .firstOrFail()
    }

    public async findBySlug(slug: string) {
        return Project.query()
            .where('slug', slug)
            .preload('users')
            .first()
    }

    public async create(data: CreateProjectDTO) {
        return Project.create(data)
    }

    public async update(slug: string, data: UpdateProjectDTO) {
    const project = await Project.findByOrFail('slug', slug)
    project.merge(data)
    await project.save()
    return {
        id: project.id,
        name: project.name,
        slug: project.slug,
        isPublic: project.isPublic
    }
    }

    public async delete(slug: string) {
    const project = await Project.findByOrFail('slug', slug)
    await project.delete()
    return true
    }

    public async addUser(data: CreateProjectUserDTO) {
        const projectUser = await ProjectUser.query()
            .where('userId', data.userId)
            .andWhere('projectId', data.projectId)
            .firstOrFail()

        if (projectUser.role !== RoleEnum.ADMIN && projectUser.role !== RoleEnum.OWNER) {
            throw new Error('Unauthorized: user must be ADMIN or OWNER')
        }

        return ProjectUser.create(data)
    }
}