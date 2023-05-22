/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  // await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // Subscription
  await knex.schema.withSchema(Database.schema).createTable('Subscription', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    columns
        .foreignUuid('user', {column: 'id', table: `${Database.schema}.User`}, true)
        .comment(`Primary User''s id.`)

    columns
        .foreignUuid('license', {column: 'id', table: `${Database.schema}.License`}, false)
        .comment(`License''s id.`)

    columns
        .foreignUuid('team', {column: 'id', table: `${Database.schema}.Team`}, true)
        .nullable()
        .comment(`Team id.`)

    columns
        .foreignUuid('subscription_plan', {column: 'id', table: `${Database.schema}.SubscriptionPlan`}, true)
        .nullable()
        .comment(`Subscriptions''s plan.`)

    columns
        .foreignUuid('invoice', {column: 'id', table: `${Database.schema}.Invoice`}, true)
        .nullable()
        .comment(`Invoice id.`)

    table.integer("quantity")
        .nullable()
        .defaultTo(0)

    table.dateTime('expires_at')
        .nullable()
        .comment(`Expires at.`)

  })
}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
