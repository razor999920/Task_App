// // Connect DB
// const {Pool} = require('pg');

// const pool = new Pool({
//     user: 'postgres',
//     database: 'task_manager',
//     password: 'Root999920',
//     port: 5432,
//     host: 'localhost'
// });

// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client');
//     process.exit(-1);
// })

// pool.connect().then(() => {
//     console.log('Databse Connected!')
// }).catch((err) => {
//     console.log(err);
// });

// module.exports = {pool};