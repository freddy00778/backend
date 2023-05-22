/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Subscription
  await knex.schema.withSchema(Database.schema).createTable('UserProgress', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
        .comment(`Primary User''s id.`)

    columns
        .foreignUuid('phaseStep', {column: 'id', table: `${Database.schema}.PhaseStep`}, true)
        .nullable()
        .comment(`Step id.`)

    columns
        .foreignUuid('game', {column: 'id', table: `${Database.schema}.Game`}, false)
        .nullable()
        .comment(`Game id.`)

    table.integer("ee_score")
        .defaultTo(0)

    table.integer("et_score")
        .defaultTo(0)

    table.integer("budget_score")
        .defaultTo(0)

    table.integer("actual_ee_score")
        .defaultTo(100)

    table.integer("actual_et_score")
        .defaultTo(100)

    table.integer("actual_budget_score")
        .defaultTo(100)

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
