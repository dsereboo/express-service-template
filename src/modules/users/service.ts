import { User } from "src/types/users";
import { IUserRepo } from "./repository";

export interface IUserService{
  handleGetActiveUsers: ()=>Promise<Array<User>>
}
export class UserService implements IUserService {
    private userRepo: IUserRepo
    
    constructor(userRepo:IUserRepo){
        this.userRepo = userRepo;
    }

    public async handleGetActiveUsers(){
        return this.userRepo.getAllUsers()
    }
}