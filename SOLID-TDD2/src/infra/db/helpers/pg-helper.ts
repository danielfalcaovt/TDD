import { Pool, QueryResult, QueryResultRow } from 'pg'
import env from '../../../main/config/env'

export const PgHelper = {
    client: null as unknown as Pool,
    async connect(): Promise<void> {
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
    },
    async query(queryString: string, queryValues?: any[]): Promise<QueryResult<any>> {
        const result = await this.client.query(queryString, queryValues)
        return result
    }
}