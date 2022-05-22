import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('timers', table => {
      table.string('id').notNullable();
      table.bigInteger('startDate').nullable();
      table.bigInteger('endDate').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('timers');
}

