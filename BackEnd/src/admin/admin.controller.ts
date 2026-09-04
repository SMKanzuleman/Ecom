import { User } from "../auth/user.model";
import { AuthRequest } from "../config/auth.config";
import { Order } from "../order/order.model";
import { Product } from "../products/product.model";
import { Style } from "../products/styles.model";
import { SendError, SendSuccess } from "../utils/responce"
import { Request, Response } from "express"

export const GetAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const AllUers = await User.find()
        return SendSuccess(res, 200, "AllUsers", { "Users": AllUers })
    } catch (error) {
        SendError(res, 500, "Server Error")
    }
}



export const AddStyles = async (req: AuthRequest, res: Response) => {
    try {
        const { StyleName, StyleCategories } = req.body
        const NewStyle = await Style.create({ Name: StyleName, Categories: StyleCategories })
        return SendSuccess(res, 200, "Style added", NewStyle)
    } catch (error) {
        SendError(res, 500, "Server Error")
    }
}
export const GetStyles = async (req: AuthRequest, res: Response) => {
    try {
        const Styles = await Style.find()
        return SendSuccess(res, 200, "These are Styles", Styles)
    } catch (error) {
        SendError(res, 500, "Server Error")
    }
}

export const IsCurrentMonth = (DateString: string) => {
    const now = new Date()
    if (!DateString) {
        return false
    }
    const d = new Date(DateString)
    return d.getFullYear() === now.getFullYear() && d.getMonth === now.getMonth
}

export const GetStats = async (req: AuthRequest, res: Response) => {
    try {

        const AU = await User.find()
        const AO = await Order.find()

        const AllCustomers = AU.length

        const AllOrders = AO.length

        const ThisMonthCustomers = AU.filter((u: any) => IsCurrentMonth(u.createdAt)).length

        const ThisMonthOrdersArray = AO.filter((o: any) => IsCurrentMonth(o.createdAt))
        
        const ThisMonthOrders = ThisMonthOrdersArray.length

        const TotalRevenue = AO.reduce((s: number, order: any) => {
            const isShipped = order.OrderStatus?.toLowerCase() === "delivered";
            return isShipped ? s + (Number(order.OrderPrice) || 0) : s;
        }, 0);

        const ThisMonthTotalRevenue = ThisMonthOrdersArray.reduce((s: number, order: any) => {
            const isShipped = order.OrderStatus?.toLowerCase() === "delivered";
            return isShipped ? s + (Number(order.OrderPrice) || 0) : s;
        }, 0);

        const AvgLifetime = Math.round(TotalRevenue / AllCustomers)

        return SendSuccess(res, 200, "These are Styles", { AllCustomers, AllOrders, ThisMonthCustomers, ThisMonthOrders, TotalRevenue, ThisMonthTotalRevenue, AvgLifetime })

    } catch (error) {

        console.error(error)

        SendError(res, 500, "Server Error")

    }
}



