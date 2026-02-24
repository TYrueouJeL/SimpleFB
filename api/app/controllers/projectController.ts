import ProjectService from "#services/projectService";
import { HttpContext } from "@adonisjs/core/http";
import { CreateProjectDTO, ProjectDTO, UpdateProjectDTO } from "../dto/projectDTO.js";
import { createProjectValidator, updateProjectValidator } from "#validators/projectValidators";
import { CreateProjectUserDTO } from "../dto/projectUserDTO.js";
import { createProjectUserValidator } from "#validators/projectUserValidator";
import ProjectUser from "#models/project_user";
import { RoleEnum } from "../enums/roleEnum.js";

export default class ProjectController {
    private projectService = new ProjectService()

    public async index({ response, auth }: HttpContext) {
        const user = await auth.getUserOrFail();

        const projects: ProjectDTO[] = await this.projectService.list(user.id)
        return response.ok(projects)
    }

    public async show({ params, response }: HttpContext) {
        const projectSlug = params.projectSlug
        const project = await this.projectService.findBySlug(projectSlug)

        if (!project) {
            return response.notFound({ message: 'Project not found' })
        }

        return response.ok(project)
    }

    public async store({ auth, request, response }: HttpContext) {
        const payload: CreateProjectDTO = await request.validateUsing(createProjectValidator)
        const project = await this.projectService.create(payload)

        const user = await auth.getUserOrFail()
        await ProjectUser.create({
            userId: user.id,
            projectId: project.id,
            role: RoleEnum.OWNER
        })
        
        return response.created(project)
    }

    public async update({ params, request, response }: HttpContext) {
        const projectSlug = params.projectSlug
        const payload: UpdateProjectDTO = await request.validateUsing(updateProjectValidator)
        
        const updatedProject = await this.projectService.update(projectSlug, payload)
        if (!updatedProject) {
            return response.notFound({ message: 'Project not found' })
        }

        return response.ok(updatedProject)
    }

    public async delete({ params, response }: HttpContext) {
        const projectSlug = params.projectSlug
        const deleted = await this.projectService.delete(projectSlug)

        if (!deleted) {
            return response.notFound({ message: 'Project not found' })
        }

        return response.noContent()
    }

    public async addUser({ request, response }: HttpContext) {
        const payload: CreateProjectUserDTO = await request.validateUsing(createProjectUserValidator)
        const projectUser = await this.projectService.addUser(payload)
        return response.created(projectUser)
    }
}