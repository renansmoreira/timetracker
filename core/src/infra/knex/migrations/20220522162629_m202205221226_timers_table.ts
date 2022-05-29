import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('timers', table => {
      table.string('id').notNullable();
      table.boolean('billable').notNullable();
      table.string('description').nullable();
      table.bigInteger('startDate').nullable();
      table.bigInteger('endDate').nullable();
      table.bigInteger('elapsedTime').nullable();
      table.string('projectId').unsigned().notNullable();
      table.foreign('projectId', 'FK_Projects_Customers')
        .references('id')
        .inTable('projects');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('timers');
}

