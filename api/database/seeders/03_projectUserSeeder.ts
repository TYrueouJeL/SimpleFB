import Project from "#models/project";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { ProjectUserFactory } from "../../app/factories/projectUserFactory.js";

export default class ProjectUserSeeder {
    async run() {
        const users = await User.all()
        const admin = await User
            .query()
            .where('firstname', 'SimpleFB')
            .firstOrFail()
        const projects = await Project.all()
        const simpleFB = await Project
            .query()
            .where('name', 'SimpleFB')
            .firstOrFail()

        await db.from('project_users').delete()
        await ProjectUserFactory.create({
            userId: admin!.id,
            projectId: simpleFB?.id
        })
        
        const otherUsers = users.filter(u => u.id !== admin!.id)
        await ProjectUserFactory.createMany(10, {
            userIds: otherUsers.map(u => u.id),
            projectIds: projects.map(p => p.id)
        })
    }
}