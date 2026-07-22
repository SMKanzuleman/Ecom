import jwt from 'jsonwebtoken';
import { SendError } from "../utils/responce";
import { NextFunction,Request, Response } from "express";
import { AuthConfig, AuthRequest } from '../config/auth.config';


export const Authenticate =async (req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        let AuthHeader=req.headers.authorization;
        if(!AuthHeader || !AuthHeader.startsWith("Bearer")){
            return SendError(res,404,"Token does not found")
        }
        const Token = AuthHeader.split(" ")[1]
        
        const Decoded = jwt.verify(Token,AuthConfig.AccessSecretKey) as { id: string}

        req.User =Decoded
        next()
    } catch (error) {
        return SendError(res,500,"There is some error")
        
    }

}