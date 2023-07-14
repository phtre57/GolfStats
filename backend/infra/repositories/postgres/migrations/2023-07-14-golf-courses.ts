import { Knex } from 'knex'

import { TableNames } from '../TableNames'

const add18HolesToTable = (table: Knex.CreateTableBuilder) => {
  const array: number[] = []

  for (let i = 1; i <= 18; i++) {
    array.push(i)
  }

  array.forEach((item) => {
    table.json(`${item}`)
  })
}

export const up = (knex: Knex) => knex.schema.createTable(
  TableNames.Tees,
  (table) => {
    table
      .uuid('Id')
      .primary()
    table
      .string('Name')
    table
      .uuid('GolfCourseId')
      .index()
      .references('Id')
      .inTable(TableNames.GolfCourses)
  },
).createTable(
  TableNames.Holes,
  (table) => {
    table
      .uuid('Id')
      .primary()
    table
      .uuid('TeeId')
      .index()
      .references('Id')
      .inTable(TableNames.Tees)
    add18HolesToTable(table)
  },
)

export const down = (knex: Knex) => knex.schema.dropTable(TableNames.Tees)
  .dropTable(TableNames.Holes)
