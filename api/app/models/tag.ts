import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 } from 'uuid'
import Feedback from './feedback.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  static assignUuid(tag: Tag) {
    tag.id = v4()
  }

  @column()
  declare name: string

  @column()
  declare color: string

  @column()
  declare isOpen: boolean

  @hasMany(() => Feedback)
  declare feedbacks: HasMany<typeof Feedback>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}