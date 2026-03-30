import { Request, Response } from "express"
import { IUserService } from "./service";

export class UsersController{
    private userService: IUserService

    constructor(userService:IUserService){
        this.userService = userService;
    }

    public async handleGetUsers(req:Request, res:Response){
        const users = await this.userService.handleGetActiveUsers()
        return users;
    }
}
