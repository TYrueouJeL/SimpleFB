import Project from "#models/project";
import User from "#models/user";
import db from "@adonisjs/lucid/services/db";
import { ProjectUserFactory } from "../../app/factories/projectUserFactory.js";

export default class ProjectUserSeeder {
    async run() {
        const users = await User.all()
        const admin = await User.findBy('firstname', 'Admin')
        const projects = await Project.all()

        await db.from('project_users').delete()
        await ProjectUserFactory.createMany(5, {
            userId: admin!.id,
            projectIds: projects.map(p => p.id)
        })
        
        const otherUsers = users.filter(u => u.id !== admin!.id)
        await ProjectUserFactory.createMany(20, {
            userIds: otherUsers.map(u => u.id),
            projectIds: projects.map(p => p.id)
        })
    }
}