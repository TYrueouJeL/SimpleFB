import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { ProjectFactory } from "../../app/factories/projectFactory.js";

export default class ProjectSeeder extends BaseSeeder {
    async run() {
        await db.from('projects').delete()
        await ProjectFactory.create({ name: 'SimpleFB', isPublic: true })
    }
}