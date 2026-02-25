import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { FeedbackFactory } from "../../app/factories/feedbackFactory.js";
import Tag from "#models/tag";
import Project from "#models/project";
import User from "#models/user";

export default class FeedbackSeeder extends BaseSeeder {
    async run() {
        const tags = await Tag.all()
        const projects = await Project.all()
        const customers = await User.all()

        await db.from('feedbacks').delete()
        await FeedbackFactory.createMany(20, {
            tagIds: tags.map(t => t.id),
            projectIds: projects.map(p => p.id),
            userIds: customers.map(c => c.id)
        })
    }
}