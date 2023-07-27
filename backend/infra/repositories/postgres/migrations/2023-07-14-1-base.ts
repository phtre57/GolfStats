import { Knex } from 'knex'

import { TableNames } from '../TableNames'

export const up = (knex: Knex) => knex.schema.createTable(
  TableNames.GolfCourses,
  (table) => {
    table.uuid('Id').primary()
    table.string('Name')
  },
)

export const down = (knex: Knex) => knex.schema.dropTable(TableNames.GolfCourses)
