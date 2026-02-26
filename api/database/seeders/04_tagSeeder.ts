import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { TagFactory } from "../../app/factories/tagFactory.js";

export default class TagSeeder extends BaseSeeder {
    async run() {
        await db.from('tags').delete()
        await TagFactory.create({ name: 'Bug', color: '#e53e3e' })
        await TagFactory.create({ name: 'Feature', color: '#3182ce' })
        await TagFactory.create({ name: 'Suggestion', color: '#38a169' })
        await TagFactory.create({ name: 'UX', color: '#d69e2e' })
        await TagFactory.create({ name: 'Vote', color: '#805ad5' })
        await TagFactory.create({ name: 'Performance', color: '#dd6b20' })
    }
}