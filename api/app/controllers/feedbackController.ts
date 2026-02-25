import FeedbackService from "#services/feedbackService"
import { HttpContext } from "@adonisjs/core/http"
import { createFeedbackValidator, updateFeedbackValidator } from "#validators/feedbackValidator"
import { CreateFeedbackDTO, UpdateFeedbackDTO } from "../dto/feedbackDTO.js"
import Project from "#models/project"

export default class FeedbackController {
    private feedbackService = new FeedbackService()

    public async index({ response, params, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = request.input('limit', 10)
        const search = request.input('search', '')
        const project = await Project.findByOrFail('slug', params.projectSlug)
        const feedbacks = await this.feedbackService.list(project.id, page, limit, search)
        return response.ok(feedbacks)
    }

    public async show({ response, params }: HttpContext) {
        const feedback = await this.feedbackService.findById(params.feedbackId)
        return response.ok(feedback)
    }

    public async store({ request, response }: HttpContext) {
        const payload: CreateFeedbackDTO = await request.validateUsing(createFeedbackValidator)
        const feedback = await this.feedbackService.create(payload)
        return response.created(feedback)
    }

    public async update({ params, request, response }: HttpContext) {
        const payload: UpdateFeedbackDTO = await request.validateUsing(updateFeedbackValidator)
        const updatedFeedback = await this.feedbackService.update(params.feedbackId, payload)
        return response.ok(updatedFeedback)
    }

    public async delete({ params, response }: HttpContext) {
        const deleted = await this.feedbackService.delete(params.feedbackId)

        if (!deleted) {
            return response.notFound({ message: 'Feedback not found' })
        }

        return response.noContent()
    }
}