import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import Tag from './tag.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import User from './user.js'

export default class Feedback extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(feedback: Feedback) {
    feedback.id = v4()
  }

  @column()
  declare title: string

  @column()
  declare tagId: string

  @belongsTo(() => Tag)
  declare tag: BelongsTo<typeof Tag>

  @column()
  declare projectId: string

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}