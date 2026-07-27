import { Response } from "express";
import { AuthRequest } from "../config/auth.config";
import { SendError, SendSuccess } from "../utils/responce";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";

export const MakeOrder = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User

        let { State, City, Location } = req.body

        const foundedCart = await Cart.findOne({ UserId: userId }).populate("Items.ProductId")

        if (!foundedCart) {
            return SendError(res, 400, "No Cart")
        }

        const FoundedItems = foundedCart.Items.map((item: any) => {
            return {
                ProductId: item.ProductId,
                Name: item.ProductId.Name,
                Quantity: item.Quantity,
                Colors: item.Colors,
                Sizes: item.Sizes,

            }

        })

        const NewOrder = await Order.create({
            UserId: userId,
            OrderPrice: foundedCart.CartPrice,
            Address: {
                State, City, Location,
            },
            OrderItems: FoundedItems
        })

        return SendSuccess(res, 200, "Order Placed", { NewOrder })
    } catch (error) {
        return SendError(res, 500, "Internal server error")

    }
}

export const GetUserOrders = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User
        const OrderUser = await Order.find({ UserId: userId })
        if (!OrderUser) {
            return SendError(res, 400, "No Orders Found")
        }
        return SendSuccess(res, 200, "All Orders", { Order:OrderUser })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}

export const GetAllOrders = async (req: AuthRequest, res: Response) => {
    try {
        const OrderUser = await Order.find()
        if (!OrderUser || OrderUser.length===0) {
            return SendError(res, 400, "No Orders Found")
        }
        return SendSuccess(res, 200, "All Orders", { Order: OrderUser })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}

export const UpdateOrderStatus = async (req: AuthRequest, res: Response) => {
    try {
        let { id: OrderId } = req.params
        let { NewStatus } = req.body
        const FoundedOrder = await Order.findById(OrderId)

        if (!FoundedOrder) {
            return SendError(res,404,"No OrderFound")
        }
        FoundedOrder.OrderStatus = NewStatus

        await FoundedOrder.save()
        return SendSuccess(res, 200, `Order statsus changed to ${NewStatus}`, { FoundedOrder })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}

export const CancelOrder = async (req: AuthRequest, res: Response) => {
    try {
        let {  id:userId} =req.User
        let { id: OrderId } = req.params
        const FoundedOrder = await Order.findOne({_id:OrderId,UserId:userId})

        if (!FoundedOrder) {
            return SendError(res, 404, "No OrderFound")
        }
        if (FoundedOrder.OrderStatus != "processing") { 
            return SendError(res,400,"Order can't be cancelled")
        }
        FoundedOrder.OrderStatus = "cancelled"

        await FoundedOrder.save()
        return SendSuccess(res, 200, `Order canceled`, { FoundedOrder })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}


