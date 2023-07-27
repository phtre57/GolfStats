import { Knex } from 'knex'

import { TableNames } from '../TableNames'

export const up = (knex: Knex) => knex.schema
  .alterTable(
    TableNames.Games,
    (table) => {
      table
        .dropColumn('FIR')
      table
        .dropColumn('GIR')
      table
        .dropColumn('Scrambling')
      table
        .dropColumn('IronLeft')
      table
        .dropColumn('IronRight')
      table
        .dropColumn('DrivingLeft')
      table
        .dropColumn('DrivingRight')
      table
        .dropColumn('PuttingLowSide')
      table
        .dropColumn('PuttingHighSide')
      table
        .dropColumn('PuttingHit')
      table
        .dropColumn('PuttingShort')
      table
        .dropColumn('NumberOfPutts')
      table
        .dropColumn('FinalScore')
    },
  )

export const down = (knex: Knex) => knex.schema
  .alterTable(
    TableNames.Games,
    (table) => {
      table
        .float('FIR')
      table
        .float('GIR')
      table
        .float('Scrambling')
      table
        .float('IronLeft')
      table
        .float('IronRight')
      table
        .float('DrivingLeft')
      table
        .float('DrivingRight')
      table
        .float('PuttingLowSide')
      table
        .float('PuttingHighSide')
      table
        .float('PuttingHit')
      table
        .float('PuttingShort')
      table
        .float('NumberOfPutts')
      table
        .float('FinalScore')
    },
  )
