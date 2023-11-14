import mysql from 'mysql2';

const pool =  mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'crypto',
    password: 'SilentBazaar@007'
});

const db = pool.promise();
export default db;