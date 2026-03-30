import { User } from 'src/types/users'
import { createConnection } from 'src/utils/database'

export interface IUserRepo {
    getAllUsers(): Promise<Array<User>>
}

export class UserRepository implements IUserRepo {
    constructor() {}

    public async getAllUsers() {
        await using db = await createConnection()
        const res = await db.connection.query<User>(`SELECT NOW()`)
        return res.rows
    }
}
