import path from "path";
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "../config";
import { ConnectionOptions } from "typeorm";

export default {
  name: 'default',
  type: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  synchronize: false,
  migrationsRun: false,
  dropSchema: false,
  entities: [path.join(__dirname, "..", "entity", "**", "*.*"), path.join(__dirname, "..", "entity", "*.*")],
  migrations: [path.join(__dirname, "migrations", "*.*")],
  cli: {
    entitiesDir: path.join(__dirname, "..", "entity"),
    migrationsDir: path.join(__dirname, "migrations")
  }
} as ConnectionOptions;