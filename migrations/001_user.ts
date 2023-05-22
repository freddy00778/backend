/* tslint:disable await-promise */
import Knex from 'knex'

import MigrationUtils from '../src/utils/MigrationUtils'
import {Database} from '../src/config'

export async function up (knex: Knex) {
  const schema = MigrationUtils.schema(knex)

  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  await knex.raw(`CREATE SCHEMA ${Database.schema};`)

  // User
  await knex.schema.withSchema(Database.schema).createTable('User', table => {
    const columns = schema(table)
    columns.primaryUuid()

    table.timestamps(true, true)

    table.string('email')
        .unique()
        .notNullable()
        .comment(`The User''s email.`)

    // Fields
    table.string('username')
      .unique()
      .comment(`The User''s login id.`)

    table.string('password')
        .comment(`The User''s password.`)

    table.string('firstName')
      .comment(`The User''s first name.`)

    table.string('lastName')
      .comment(`The User''s last name.`)

    table.string('phoneNumber')
        .comment(`The User''s phone number.`)

    table.dateTime('lastVisitedAt')
        .comment(`The User''s last visited time.`)

    table.string('verificationToken')
        .comment(`The User''s verification token.`)

    table.boolean('isVerified')
        .comment(`The User''s verification status.`)

    table.boolean('isActive')
      .comment(`If false, the User is suspended.`)
      .defaultTo(true)

    table.boolean('isAdmin')
        .comment('if true, user is admin')
        .defaultTo(false)

    table.boolean('hasWatchedIntro')
        .comment('Has user watched intro video')
        .defaultTo(false)
  })

}

export function down (_knex: Knex) {
  throw new Error('Downward migrations are not supported. Restore from backup.')
}
