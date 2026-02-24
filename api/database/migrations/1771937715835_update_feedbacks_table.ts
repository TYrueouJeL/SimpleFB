import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'feedbacks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('title').notNullable()
      table.integer('note').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('title')
      table.dropColumn('ntoe')
    })
  }
}