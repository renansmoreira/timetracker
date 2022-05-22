import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('timers', table => {
      table.string('id');
      table.bigInteger('startDate');
      table.bigInteger('endDate');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('timers');
}

