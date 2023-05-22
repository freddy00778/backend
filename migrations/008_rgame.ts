/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

  // Game
  await knex.schema.withSchema(Database.schema).createTable('Game', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string("media")
        .nullable()
        .comment("media")

    table.string("name")
        .nullable()
        .comment("name")

    table.string("description")
        .nullable()
        .comment(`step phase''s description`)

    table.string("instruction")
        .nullable()
        .comment(`Game''s Instruction`)

    table.boolean("enabled")
        .defaultTo(false)
        .comment("Enabled")

    table.string("file")
        .comment("File name")

    table.integer("no_of_phases")
        .comment("Number of phases")

    table.integer("no_of_rows")
        .comment("Number of rows")

    table.integer("no_of_columns")
        .comment("Number of columns")

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
