import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { TagFactory } from "../../app/factories/tagFactory.js";

export default class TagSeeder extends BaseSeeder {
    async run() {
        await db.from('tags').delete()
        await TagFactory.create({ name: 'Bug', color: '#eb4034' })
        await TagFactory.create({ name: 'Feature', color: '#6b34eb' })
        await TagFactory.create({ name: 'Suggestion', color: '#34eb43' })
    }
}