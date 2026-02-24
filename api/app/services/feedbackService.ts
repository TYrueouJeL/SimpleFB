import Feedback from "#models/feedback";
import { CreateFeedbackDTO, UpdateFeedbackDTO } from "../dto/feedbackDTO.js";

export default class FeedbackService {
    public async list(projectId: string) {
        return Feedback.query()
            .where('projectId', projectId)
            .preload('project')
            .preload('user')
            .preload('tag')
    }

    public async findById(feedbackId: string) {
        return Feedback
            .query()
            .where('id', feedbackId)
            .preload('project')
            .preload('user')
            .preload('tag')
            .firstOrFail()
    }

    public async create(data: CreateFeedbackDTO) {
        return Feedback.create(data)
    }

    public async update(feedbackId: string, data: UpdateFeedbackDTO) {
        const feedback = await Feedback.findByOrFail('id', feedbackId)
        feedback.merge(data)
        await feedback.save()
        return {
            id: feedback.id,
            title: feedback.title,
            tag: feedback.tag,
            project: feedback.project,
            customer: feedback.user
        }
    }

    public async delete(feedbackId: string) {
        const feedback = await Feedback.findByOrFail('id', feedbackId)
        await feedback.delete()
        return true
    }
}