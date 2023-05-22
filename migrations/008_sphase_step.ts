/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // Phase
  await knex.schema.withSchema(Database.schema).createTable('PhaseStep', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('phase', {column: 'id', table: `${Database.schema}.Phase`}, true)
        .comment(`Phase''s id.`)

    columns
        .foreignUuid('step', {column: 'id', table: `${Database.schema}.Step`}, true)
        .comment(`Step''s id.`)

    columns
        .foreignUuid('game', {column: 'id', table: `${Database.schema}.Game`}, true)
        .comment(`Game''s id.`)

    columns
        .foreignUuid('question', {column: 'id', table: `${Database.schema}.Question`}, false)
        .comment(`Question''s id.`)

    table.string("name")
        .nullable()
        .comment("name")

    table.string("description")
        .nullable()
        .comment("step phase description")

    table.string("video_url")
        .nullable()
        .comment("video url")

    table.boolean("enabled")
        .defaultTo(false)
        .comment("Enabled")

    table.integer("column")
        .defaultTo(0)
        .comment("Column of step")

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
