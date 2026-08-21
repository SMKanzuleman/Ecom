import { User } from "../auth/user.model";
import { AuthRequest } from "../config/auth.config";
import { SendError, SendSuccess } from "../utils/responce"
import { Request,Response } from "express"

export const GetAllUsers=async(req:AuthRequest,res:Response)=>{
    try {
        const AllUers=await User.find()
        return SendSuccess(res,200,"AllUsers",{"Users":AllUers})
    } catch (error) {
        SendError(res,500,"Server Error")
    }
}