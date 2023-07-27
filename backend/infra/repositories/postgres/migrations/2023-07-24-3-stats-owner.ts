import { Knex } from 'knex'

import { TableNames } from '../TableNames'

export const up = (knex: Knex) => knex.schema
  .createTable(TableNames.Users, (table) => {
    table
      .uuid('Id')
      .primary()
    table
      .string('FullName')
  })
  .alterTable(
    TableNames.Games,
    (table) => {
      table
        .uuid('OwnerId')
        .references('Id')
        .inTable(TableNames.Users)
    },
  )

export const down = (knex: Knex) => knex.schema
  .dropTable(TableNames.Users)
  .alterTable(
    TableNames.Games,
    (table) => {
      table.dropColumn('OwnerId')
    },
  )
