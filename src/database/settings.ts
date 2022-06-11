import {
    DB_DIALECT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_PASS,
    DB_USER,
    NODE_ENV,
    DB_SYNCHRONIZE,
    
    M_DB_DIALECT,
    M_DB_HOST,
    M_DB_PORT,
    M_DB_NAME,
    M_DB_PASS,
    M_DB_USER,
    M_DB_SYNCHRONIZE,
} from '../config';

const R = require("ramda");
const Path = require("path");

export const connection = {
    type: DB_DIALECT,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    password: DB_PASS,
    username: DB_USER,
    logging: NODE_ENV !== 'production',
    synchronize: DB_SYNCHRONIZE
}

export const connectionMongo = {
    type: M_DB_DIALECT,
    host: M_DB_HOST,
    port: M_DB_PORT,
    database: M_DB_NAME,
    password: M_DB_PASS,
    username: M_DB_USER,
    logging: NODE_ENV !== 'production',
    synchronize: M_DB_SYNCHRONIZE
}
