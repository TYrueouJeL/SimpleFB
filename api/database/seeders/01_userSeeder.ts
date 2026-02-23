import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { UserFactory } from "../../app/factories/userFactory.js";

export default class UserSeeder extends BaseSeeder {
    async run() {
        await db.from('users').delete()
        await UserFactory.createMany(10)
        await UserFactory.create({ firstname: 'Admin', lastname: 'Admin', email: 'admin@admin.com', password: 'ADmin123*' })
    }
}