import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('customers', table => {
      table.string('id').notNullable();
      table.string('name').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('customers');
}

