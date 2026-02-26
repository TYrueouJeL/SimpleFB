import { BaseSchema } from "@adonisjs/lucid/schema"

export default class extends BaseSchema { 
  protected tableName = 'tags'

  public async up () {

    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.string('name').notNullable().unique()
      table.string('color').notNullable

      table.timestamp('updated_at').nullable()
      table.timestamp('created_at').notNullable()

    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}



