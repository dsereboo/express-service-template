import { NextFunction, Request, Response } from "express";
import AppError from "src/types/error";
import { STATUS_CODES } from "src/utils/constants";
import z from "zod"

//update to cater for query params as well
export const requestValidator = (schema:z.ZodType)=>(req:Request,res:Response,next:NextFunction)=>{
  const result = schema.safeParse(req.body)

  if (!result.success) {
    const errorMessage = result.error.issues
      .map((err) => err.message)
      .join(', ')

    return next(new AppError(STATUS_CODES.BADREQUEST, errorMessage))
  }
  
  Object.assign(req, { body: result.data })
  return next()
}