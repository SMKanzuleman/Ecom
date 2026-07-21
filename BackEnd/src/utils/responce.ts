import { Response } from 'express';

export const SendError = (res: Response, statuscode: number, message: string) => { 
    return res.status(statuscode).json({success: false , message})
}
export const SendSuccess = (res: Response, statuscode: number, message: string, data?: any) => {
    return res.status(statuscode).json({ success: true, message , ...data})
}