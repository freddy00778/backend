/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // Game Phase Step
  await knex.schema.withSchema(Database.schema).createTable('GamePhaseStep', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('game', {column: 'id', table: `${Database.schema}.Game`}, true)
        .comment(`Game''s id.`)

    columns
        .foreignUuid('phase_step', {column: 'id', table: `${Database.schema}.PhaseStep`}, true)
        .comment(`Phase''s step id.`)

    table.string("description")
        .nullable()
        .comment(`step phase''s description`)

    table.string("video_url")
        .nullable()
        .comment("video url")

    table.boolean("enabled")
        .defaultTo(false)
        .comment("Enabled")

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
