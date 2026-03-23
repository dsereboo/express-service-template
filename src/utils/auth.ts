import * as argon2 from "argon2";
import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "src/types/error";
import { STATUS_CODES } from "./constants";

export const hashPassword=async(password:string)=>{
    return await argon2.hash(password);
}

type SigningPayload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export const comparePasswordHash=async(password:string, passwordHash:string)=>{
    var hash= await argon2.hash(password)
    return argon2.verify(hash,password)
}

export const makeJWT = (userID: string, expiresIn: number, secret: string):string=>{
    let payload: SigningPayload ={
        exp:Math.floor(Date.now() / 1000)+ expiresIn,
        sub: userID,
        iat: Math.floor(Date.now() / 1000),
    }
    return jwt.sign(payload, secret)
}

export const validateJWT= (token:string, secret:string)=>{
    return jwt.verify(token,secret)
}

export const getBearerToken = (req: Request): string => {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")){
    throw new AppError(STATUS_CODES.BADREQUEST, "Bearer Token not found")
  }

  return authHeader.split(" ")[1];
};
