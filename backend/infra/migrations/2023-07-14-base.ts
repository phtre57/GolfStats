import { Knex } from 'knex'

export const up = (knex: Knex) => knex.schema.createTable(
  'GolfCourses',
  (table) => {
    table.uuid('Id').primary()
    table.string('Name')
  },
)

export const down = (knex: Knex) => knex.schema.dropTable('GolfCourses')
