import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Feedback from './feedback.js'
import ProjectUser from './project_user.js'
import slugifyModule from 'slugify'

const slugify = slugifyModule.default

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assingUuid(project: Project) {
    project.id = v4()
  }

  @column()
  declare name: string

  @column()
  declare slug: string

  @beforeCreate()
  static assignSlug(project: Project) {
    project.slug = `${slugify(project.name, { lower: true, strict: true })}-${project.id.slice(0, 6)}`
  }

  @column()
  declare isPublic: boolean

  @hasMany(() => ProjectUser)
  declare users: HasMany<typeof ProjectUser>

  @hasMany(() => Feedback)
  declare feedbacks: HasMany<typeof Feedback>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}