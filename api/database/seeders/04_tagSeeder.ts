import { BaseSeeder } from "@adonisjs/lucid/seeders";
import db from "@adonisjs/lucid/services/db";
import { TagFactory } from "../../app/factories/tagFactory.js";

export default class TagSeeder extends BaseSeeder {
    async run() {
        await db.from('tags').delete()
        await TagFactory.createMany(3)
    }
}