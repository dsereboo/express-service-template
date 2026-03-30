import express from "express"
import { UserRepository } from "./repository";
import { UsersController } from "./controller";
import { UserService } from "./service";

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const usersController = new UsersController(userService)

const usersRouter = express.Router();

usersRouter.get("/users", usersController.handleGetUsers)

export {usersRouter}
