// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO





const mysql = require("mysql2");


const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;



const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

connection.connect((err) => {
  if (err) throw err;

  console.info("Connection to DB created");
});

module.exports = connection;