import { Pool } from 'pg'
import { config } from './config'

const pool = new Pool({
    connectionString: config.database.url
})

export const createConnection = async () => {
    const connection = await pool.connect()
    return {
        connection,
        [Symbol.asyncDispose]: async () => {
            await connection.release()
        }
    }
}
