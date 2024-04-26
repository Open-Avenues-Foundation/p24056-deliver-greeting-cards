require("dotenv").config();

const cors = require("cors");
const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const pg = require("pg");
const Lob = require("lob")(process.env.LOB_API_KEY);

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(cors());
app.use(express.json());

// to serve the react application as a static build
app.use(express.static(path.resolve(__dirname, "./client/build")));

const port = process.env.PORT || 5001;

const client = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
client.connect();

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

// this endpoint should return all events in the database
app.get("/api/events", async (req, res) => {
  const response = await client.query("SELECT * FROM events");
  res.send(response.rows);
});

// this endpoint should return an event by its id
app.get("/api/events/:id", async (req, res) => {
  const response = await client.query("SELECT * FROM events WHERE id = $1", [
    req.params.id,
  ]);
  res.send(response.rows);
});

// this endpoint should create a new event in the database
app.post("/api/events", async (req, res) => {
  console.log(req.body); // Right inside the POST endpoint

  const event_type = req.body.event_type;
  const date = req.body.date;
  const user_id = req.body.user_id;
  const application_user_id = req.body.application_user_id;
  const response = await client.query(
    "INSERT INTO events (event_type, date, user_id, application_user_id) VALUES($1, $2, $3, $4) RETURNING *",
    [event_type, date, user_id, application_user_id],
  );
  res.send(response.rows[0]);
});

// this endpoint should update an event by its id
app.patch("/api/events/:id", async (req, res) => {
  var response = 0;
  if (req.body.event_type != null) {
    response = await client.query(
      "UPDATE events SET event_type = $1 WHERE id = $2 RETURNING *",
      [req.body.event_type, req.params.id],
    );
  }
  if (req.body.date != null) {
    response = await client.query(
      "UPDATE events SET date = $1 WHERE id = $2 RETURNING *",
      [req.body.date, req.params.id],
    );
  }
  if (req.body.user_id != null) {
    response = await client.query(
      "UPDATE events SET user_id = $1 WHERE id = $2 RETURNING *",
      [req.body.user_id, req.params.id],
    );
  }
  if (req.body.application_user_id != null) {
    response = await client.query(
      "UPDATE events SET application_user_id = $1 WHERE id = $2 RETURNING *",
      [req.body.application_user_id, req.params.id],
    );
  }

  res.send(response.rows);
});

// this endpoint should return all users in the database
app.get("/api/users", async (req, res) => {
  const response = await client.query("SELECT * FROM users");
  res.send(response.rows);
});

// this endpoint should return a user by their id
app.get("/api/users/:id", async (req, res) => {
  const id = req.params.id;
  const response = await client.query("SELECT * FROM users WHERE id=$1", [id]);
  const userRow = response.rows[0];
  if (!userRow) {
    res.status(404).send("HTTP Not Found Error");
    return;
  }
  res.send(userRow);
});

// this endpoint should create a new user in the database
app.post("/api/users", async (req, res) => {
  const { name, address_id, application_user_id } = req.body; // Destructuring for clarity
  const response = await client.query(
    "INSERT INTO users (name, address_id, application_user_id) VALUES ($1, $2, $3) RETURNING *",
    [name, address_id, application_user_id],
  );
  res.send(response.rows[0]);
});
// this endpoint should update a user by its id
app.patch("/api/users/:id", async (req, res) => {
  var response = 0;
  if (req.body.name != null) {
    response = await client.query(
      "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
      [req.body.name, req.params.id],
    );
  }
  if (req.body.address_id != null) {
    response = await client.query(
      "UPDATE users SET address_id = $1 WHERE id = $2 RETURNING *",
      [req.body.address_id, req.params.id],
    );
  }
  res.send(response.rows);
});

app.delete("/api/events/:id", async (req, res) => {
  const id = req.params.id;
  const response = await client.query("DELETE FROM events WHERE id=$1", [id]);
  res.send(response.rows);
});

// this endpoint should delete a user by its id -- IMADE
app.delete("/api/users/:id", async (req, res) => {
  if (req.params.id == null) {
    res.status(404).send("HTTP Not Found Error");
    return;
  }
  if (req.params.id != null) {
    const response = await client.query("DELETE FROM users WHERE id = $1", [
      req.params.id,
    ]);
    res.send(response.rows);
  }
});

// This endpoint should retrieve the list of addresses that are stored in Lob's system using the Lobe Node SDK -- IMADE
app.get("/api/addresses", async (req, res) => {
  const response = await Lob.addresses.list();
  res.send(response);
});

// retrieves the list of postcards that have been sent through Lob’s system using the Lob Node SDK
app.get("/api/postcards", async (req, res) => {
  const response = await Lob.postcards.list();
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// this endpoint should return all auth_users in the database
// This is new, if something breaks delete everything under
app.get("/api/auth_users", async (req, res) => {
  const response = await client.query("SELECT * FROM auth_users");
  res.send(response.rows);
});
