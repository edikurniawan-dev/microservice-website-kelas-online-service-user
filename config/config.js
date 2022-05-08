require('dotenv').config();
const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOSTNAME,
        dialect: 'mysql',
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOSTNAME,
        dialect: 'mysql',
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOSTNAME,
        dialect: 'mysql',
    },
};
