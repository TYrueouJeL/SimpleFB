import Feedback from "#models/feedback";
import { CreateFeedbackDTO, UpdateFeedbackDTO } from "../dto/feedbackDTO.js";

export default class FeedbackService {
    public async list(projectId: string) {
        return Feedback.query()
            .where('project_id', projectId)
            .preload('project')
            .preload('customer')
            .preload('tag')
    }

    public async findById(feedbackId: string) {
        return Feedback
            .query()
            .where('id', feedbackId)
            .preload('project')
            .preload('customer')
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
            tag: feedback.tag,
            project: feedback.project,
            customer: feedback.customer
        }
    }

    public async delete(feedbackId: string)
}