import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'feedbacks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('title').notNullable()
      table.boolean('is_open').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('title')
      table.dropColumn('is_open')
    })
  }
}