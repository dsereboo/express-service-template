import {Request,Response, NextFunction} from "express"
import AppError from "src/types/error";
import { STATUS_CODES } from "src/utils/constants";

export const notFoundMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    next(new AppError(STATUS_CODES.NOT_FOUND, "Not found"));
}