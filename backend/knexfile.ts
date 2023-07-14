/* eslint-disable linebreak-style */
import { Knex } from 'knex'

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  dev: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'postgres',
      password: 'secret',
      port: 5433,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './infra/repositories/postgres/migrations',
    },
  },
}

module.exports = config
