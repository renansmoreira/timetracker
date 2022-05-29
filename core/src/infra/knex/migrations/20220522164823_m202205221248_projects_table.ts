import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('projects', table => {
      table.string('id').notNullable();
      table.string('name').notNullable();
      table.decimal('valuePerHour').nullable();
      table.string('currency').nullable();
      table.string('customerId').unsigned().notNullable();
      table.foreign('customerId', 'FK_Projects_Customers')
        .references('id')
        .inTable('customers');
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('projects');
}

