import { Knex } from 'knex'

import { TableNames } from '../TableNames'

export const up = (knex: Knex) => knex.schema.createTable(
  TableNames.Games,
  (table) => {
    table
      .uuid('Id')
      .primary()
    table
      .uuid('TeeId')
      .index()
      .references('Id')
      .inTable(TableNames.Tees)
    table
      .uuid('GolfCourseId')
      .index()
      .references('Id')
      .inTable(TableNames.GolfCourses)
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
).createTable(
  TableNames.Statistics,
  (table) => {
    table
      .uuid('Id')
      .primary()
    table
      .uuid('GameId')
      .index()
      .references('Id')
      .inTable(TableNames.Games)
    table
      .string('HoleNumber')
    table
      .integer('Score')
    table
      .integer('NumberOfPutts')
    table
      .string('DrivingAccuracy')
    table
      .string('IronAccuracy')
    table
      .json('PuttingAccuracy')
    table
      .string('IsInSand')
    table
      .integer('NumberOfChips')
    table
      .json('Penalties')
  },
)

export const down = (knex: Knex) => knex.schema.dropTable(TableNames.Games)
  .dropTable(TableNames.Statistics)
