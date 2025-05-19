const {Client} = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '####iwant26CATS', 
    database: 'postgres'
});

client.connect(); 

client.query('SELECT * FROM users', (err, res) => {
    if (err) {
        console.error('Error executing query', err.stack);
    } else {
        console.log('Query result:', res.rows);
    }
    client.end; 
});

// client.query('SELECT * FROM users', (err, res) => {