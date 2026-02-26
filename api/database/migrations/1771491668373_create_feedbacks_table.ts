import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()

      table.uuid('tag_id').notNullable()
      table.uuid('project_id').notNullable()
      table.uuid('user_id').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.foreign('tag_id').references('id').inTable('tags').onDelete('CASCADE')
      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('SET NULL')

      table.index(['tag_id'])
      table.index(['project_id'])
      table.index(['user_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

