import { Knex } from 'knex'

import { TableNames } from '../TableNames'

export const up = (knex: Knex) => knex.schema
  .alterTable(TableNames.Games, (table) => {
    table
      .string('Date')
  })

export const down = (knex: Knex) => knex.schema
  .alterTable(
    TableNames.Games,
    (table) => {
      table.dropColumn('Date')
    },
  )
