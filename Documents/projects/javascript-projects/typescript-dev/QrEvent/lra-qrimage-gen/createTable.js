const Knex = require('knex');
const prompt = require('prompt');

const FIELDS = ['cedarqrimagegen_admin', 'cedarqrimagegen_db', 'cedarqrimagegen_db'];

prompt.start();

// Prompt the user for connection details
prompt.get(FIELDS, (err, config) => {
  if (err) {
    console.error(err);
    return;
  }

  // Connect to the database
  const knex = Knex({ client: 'pg', connection: config });

  // Create the "visits" table
  knex.schema.createTable('registeredguest', (table) => {
    table.increments();
    table.timestamp('timestamp');
    table.string('userIp');
  })
    .then(() => {
      console.log(`Successfully created 'visits' table.`);
      return knex.destroy();
    })
    .catch((err) => {
      console.error(`Failed to create '' table:`, err);
      if (knex) {
        knex.destroy();
      }
    });
});