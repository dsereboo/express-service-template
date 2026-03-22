import { createConnection } from "src/utils/database"

//all database access functions
export const getAllUsers=async()=>{
    await using db = await createConnection()
    var res= await db.connection.query(`SELECT NOW()`)
    return res.rows
}