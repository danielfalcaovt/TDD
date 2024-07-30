import * as dotenv from 'dotenv'
dotenv.config()

export default {
    PgHost: process.env.PG_HOST || 'localhost',
    PgUser: process.env.PG_USER || 'postgres',
    PgDatabase: process.env.PG_DATABASE,
    PgPort: Number(process.env.PG_PORT),
    PgPassword: process.env.PG_PASSWORD,
    SECRET_KEY: 'deenedev@2023',
    Port: 3000
}