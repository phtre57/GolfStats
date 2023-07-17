import { Injector } from '@sailplane/injector'
import { knex } from 'knex'

const db = knex({
  client: 'pg',
  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    port: 5433,
    password: 'secret',
    ssl: false,
  },
})

Injector.registerConstant('Knex', db)
