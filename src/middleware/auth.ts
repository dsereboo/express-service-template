import {Request,Response,NextFunction} from "express"
import AppError from "src/types/error"
import { getBearerToken, validateJWT } from "src/utils/auth"
import { config } from "src/utils/config"
import { STATUS_CODES } from "src/utils/constants"

export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    const token = getBearerToken(req)

    if(token === null){
        return next(new AppError(STATUS_CODES.UNAUTHORIZED,"User is unauthorized"))
    }

    if(!validateJWT(token, config.authentication.secretKey)){
        return next(new AppError(STATUS_CODES.UNAUTHORIZED, "Invalid Token"))
    }

    next()
}