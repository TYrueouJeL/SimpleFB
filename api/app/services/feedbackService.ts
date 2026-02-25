import Feedback from "#models/feedback";
import { CreateFeedbackDTO, UpdateFeedbackDTO } from "../dto/feedbackDTO.js";

export default class FeedbackService {
    public async list(projectId: string, page: number = 1, limit: number = 10, search: string = '') {
        const offset = (page - 1) * limit
        const query = Feedback.query()
            .where('projectId', projectId)
            .preload('project')
            .preload('user')
            .preload('tag')

        if (search.trim()) {
            query.where('title', 'LIKE', `%${search}%`)
        }

        const feedbacks = await query.offset(offset).limit(limit)

        const countQuery = Feedback.query()
        if (search.trim()) {
            countQuery.where('title', 'LIKE', `%${search}%`)
        }
        const total = await countQuery.count('* as count').then(result => result[0].$extras.count)

        const data = feedbacks.map((feedback) => ({
            id:feedback.id,
            title: feedback.title,
            isOpen: feedback.isOpen,
            tag: feedback.tag,
            project: feedback.project,
            user: feedback.user,
            createdAt: feedback.createdAt,
            updatedAt: feedback.updatedAt
        }))

        return {
            total,
            page,
            limit,
            data
        }
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
            id:feedback.id,
            title: feedback.title,
            isOpen: feedback.isOpen,
            tag: feedback.tag,
            project: feedback.project,
            user: feedback.user,
            createdAt: feedback.createdAt,
            updatedAt: feedback.updatedAt
        }
    }

    public async delete(feedbackId: string) {
        const feedback = await Feedback.findByOrFail('id', feedbackId)
        await feedback.delete()
        return true
    }
}