require("dotenv").config();

const pg = require("pg");

// returns the postgres database client
function getDBClient() {
  const client = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  client.connect();
  return client;
}

// TODO: insert user into users table
async function insertUser(name, address_id, application_user_id, client) {
  const data_row = await client.query(
    "INSERT INTO users (name, address_id, application_user_id) VALUES ($1, $2, $3) Returning *",
    [name, address_id, application_user_id],
  );
  return data_row.rows[0];
}
(async () => {
  let client;
  try {
    client = getDBClient();

    const name = process.argv[2];
    const address_id = process.argv[3];
    const application_user_id = process.argv[4];

    const user = await insertUser(
      name,
      address_id,
      application_user_id,
      client,
    );
    console.log(user);
  } catch (e) {
    console.log(e);
  } finally {
    client.end();
  }
})();
