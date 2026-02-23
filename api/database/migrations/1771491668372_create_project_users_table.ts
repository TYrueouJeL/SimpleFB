import { BaseSchema } from '@adonisjs/lucid/schema'
import { RoleEnum } from '../../app/enums/roleEnum.js'

export default class extends BaseSchema {
  protected tableName = 'project_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()

      table.uuid('user_id').notNullable()
      table.uuid('project_id').notNullable()
      table.enum('role', Object.values(RoleEnum))

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')

      table.unique(['project_id', 'user_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

