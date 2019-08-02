'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string("name").notNulalble()
      table.string('password', 60).notNullable()
      table.string("phone").notNulalble().unique()
      table.integer('role_id').unsigned()
      table.enu('type', ['USER', 'STAFF']).defaultTo('STAFF')
      table.integer("created_by").unsigned();
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
