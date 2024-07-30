import { Pool } from 'pg'
import env from '../../../main/config/env'

export const PgHelper = {
    client: null as unknown as Pool,
    async connect() {
        this.client = new Pool({
            host: env.PgHost,
            user: env.PgUser,
            database: env.PgDatabase,
            port: env.PgPort,
            password: env.PgPassword

        })
        await this.client.connect()
    },
    async disconnect() {
        await this.client.end()
    }
}