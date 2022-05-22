import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('projects', table => {
      table.string('id');
      table.string('name');
      table.boolean('billable');
      table.string('customerId').unsigned();
      table.foreign('customerId', 'FK_Projects_Customers')
        .references('id')
        .inTable('customers');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('projects');
}

