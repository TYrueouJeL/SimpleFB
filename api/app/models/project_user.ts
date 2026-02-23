import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import { RoleEnum } from '../enums/roleEnum.js'

export default class ProjectUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(projectUser: ProjectUser) {
    projectUser.id = v4()
  }

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare projectId: string

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare role: RoleEnum

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}