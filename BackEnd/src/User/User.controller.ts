import { User } from "../auth/user.model";
import { AuthRequest } from "../config/auth.config";
import { Order } from "../order/order.model";
import { SendError, SendSuccess } from "../utils/responce";
import { Response } from "express";
import crypto from "crypto"
import { SendEmail } from "../utils/sendmail";
import { OTP } from "../auth/otp.model";

export const GetUserDashStats = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.User.id
        //Total order
        const TotalOrders = await Order.countDocuments({ UserId: userId })
        //InProgress orders
        const TotalInProgressOrders = await Order.countDocuments({ UserId: userId, OrderStatus: { $in: ["shipped", "processing"] } })
        //Total Cancelled orders
        const TotalInCancelOrders = await Order.countDocuments({ UserId: userId, OrderStatus: "cancelled" })

        //Total spent
        const TotalSpending = await Order.aggregate([
            {
                $match: {
                    OrderStatus: "delivered"
                }
            },
            {
                $group: {
                    _id: null,
                    TotalSpending: { $sum: "$OrderPrice" }
                }
            }
        ])

        const UserTotalSpending = TotalSpending[0]?.TotalSpending || 0;

        SendSuccess(res, 201, "User stats", { TotalOrders, TotalInProgressOrders, UserTotalSpending, TotalInCancelOrders })

    } catch (error) {
        console.error(error)
        SendError(res, 500, "Internal Server Error")

    }
}

export const GetUserInfo = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.User.id
        const FoundedUser = await User.findById(userId).select("-Password")
        //UserDetails
        const UserName = `${FoundedUser?.FName} ${FoundedUser?.LName}`.trim()
        const UserEmail = `${FoundedUser?.Email}`.trim()
        const DefaultAddress = FoundedUser?.Address
        // const UserPhone = `${FoundedUser?.Phone}`.trim()
        //InProgress orders
        SendSuccess(res, 201, "User stats", { UserName, UserEmail, DefaultAddress })

    } catch (error) {
        console.error(error)
        SendError(res, 500, "Internal Server Error")
    }
}
export const AddUserAddress = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.User.id
        const { UserAddress } = req.body
        const FoundedUser = await User.findByIdAndUpdate(userId,
            {
                $set: {
                    Address: UserAddress
                }
            })

        SendSuccess(res, 201, "User stats",)

    } catch (error) {
        console.error(error)
        SendError(res, 500, "Internal Server Error")
    }
}

