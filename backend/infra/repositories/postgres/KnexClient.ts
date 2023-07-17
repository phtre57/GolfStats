import { Injector } from '@sailplane/injector'
import { Knex, knex } from 'knex'

export class KnexClient {
  db: Knex

  constructor(db: Knex) {
    this.db = db
  }
}

const create = (): KnexClient => {
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
    pool: {
      min: 2,
      max: 5,
    },
  })

  return new KnexClient(db)
}

Injector.register(KnexClient, create)
