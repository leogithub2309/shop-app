import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'shop_everydei_db',
    password: ''
});

export default pool;