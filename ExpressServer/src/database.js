import knex from 'knex'

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin',
        database: 'sakila',
        port: 3307,
    },
    pool: {
        min: 0, max: 10,
    },
});

db.raw('SELECT 1 + 1 AS result')
    .then(() => console.log('Connected to MySQL with Knex'))
    .catch((err) => console.error('Error connecting to MySQL with Knex:', err));

export default db