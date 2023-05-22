/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // Phase
  await knex.schema.withSchema(Database.schema).createTable('Phase', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("name")
        .nullable()
        .comment(`name of phase`)

    table.string("description")
        .nullable()
        .comment(`phase''s description`)

    table.string("background").nullable()
        .comment(`phase''s background`)

    table.integer("steps_count")
        .comment(`phase''s step count`)

    table.integer("order")
        .nullable()
        .defaultTo(0)
  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
