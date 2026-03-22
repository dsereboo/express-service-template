import express from "express"
import { usersRouter } from "src/modules/users"
import { MODULES } from "src/utils/routes"

export const v1Router = express.Router()

v1Router.use(MODULES.USERS, usersRouter)
