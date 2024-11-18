const knex = require ('knex')
const dotenv = require ('dotenv')

dotenv.config();

const db = knex({
    client: "mysql2",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    },
    pool: {
        min: 0,
        max: 10,
    },
});

db.raw('SELECT 1 + 1 AS result')
    .then(() => console.log('Connected to MySQL with Knex'))
    .catch((err) => console.error('Error connecting to MySQL with Knex:', err));

module.exports = db