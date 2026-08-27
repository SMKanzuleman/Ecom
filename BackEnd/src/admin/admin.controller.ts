import { User } from "../auth/user.model";
import { AuthRequest } from "../config/auth.config";
import { Product } from "../products/product.model";
import { Style } from "../products/styles.model";
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


export const AddStyles=async(req:AuthRequest,res:Response)=>{
    try {
        const {StyleName,StyleCategories}=req.body
        const NewStyle=await Style.create({Name:StyleName,Categories:StyleCategories})
        return SendSuccess(res,200,"Style added", NewStyle)
    } catch (error) {
        SendError(res,500,"Server Error")
    }
}
export const GetStyles=async(req:AuthRequest,res:Response)=>{
    try {
        const Styles=await Style.find()
        return SendSuccess(res,200,"These are Styles", Styles)
    } catch (error) {
        SendError(res,500,"Server Error")
    }
}


