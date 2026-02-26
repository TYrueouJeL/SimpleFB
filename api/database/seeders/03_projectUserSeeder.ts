import Project from "#models/project";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { ProjectUserFactory } from "../../app/factories/projectUserFactory.js";

export default class ProjectUserSeeder {
    async run() {
        const admin = await User
            .query()
            .where('firstname', 'SimpleFB')
            .firstOrFail()
        const simpleFB = await Project
            .query()
            .where('name', 'SimpleFB')
            .firstOrFail()

        await db.from('project_users').delete()
        await ProjectUserFactory.create({
            userId: admin!.id,
            projectId: simpleFB?.id
        })
    }
}