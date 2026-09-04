import { Response } from "express";
import { AuthRequest } from "../config/auth.config";
import { SendError, SendSuccess } from "../utils/responce";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";
import { User } from "../auth/user.model";
import { Product } from "../products/product.model";



export const MakeOrder = async (req: AuthRequest, res: Response) => {
    try {

        let { id: userId } = req.User

        let { Address, Payment } = req.body

        const foundedCart = await Cart.findOne({ UserId: userId }).populate("Items.ProductId")

        if (!foundedCart) {
            return SendError(res, 400, "No Cart")
        }

        const FoundedItems = foundedCart.Items.map((item: any) => {
            return {
                ProductId: item.ProductId._id,
                Name: item.ProductId.Name,
                Quantity: item.Quantity,
                Color: item.Colors,
                Size: item.Sizes,


            }
        })

        for (const i of FoundedItems) {
            await Product.findByIdAndUpdate(i.ProductId,{
                $inc:{
                    Sold: i.Quantity,
                    Stock: -i.Quantity
                }
            })

        }

        const PStatus = Payment.type === "bank" ? "paid" : "pending"

        const NewOrder = await Order.create({
            UserId: userId,
            OrderPrice: foundedCart.CartPrice,
            Address: {
                State: Address.State,
                City: Address.City,
                Zip: Address.Zip,
                Location: Address.Address,
                LandMark: Address.LandMark
            },
            PaymentStatus: PStatus,
            Recipient: {
                FName: Address.RFName,
                LName: Address.RLName,
                Phone: Address.Phone
            },
            PaymentDetails: {
                Method: Payment.Type,
                CardNumber: Payment.CardNumber,
                CVV: Payment.CVV,
                MMYY: Payment.MMYY
            },
            OrderItems: FoundedItems
        })
        foundedCart.Items = [];
        foundedCart.CartPrice = 0;
        await foundedCart.save();

        return SendSuccess(res, 200, "Order Placed", { NewOrder })
    } catch (error) {
        console.error(error)
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
        return SendSuccess(res, 200, "All Orders", { Order: OrderUser })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}

export const GetAllOrders = async (req: AuthRequest, res: Response) => {
    try {
        const OrderUser = await Order.find().sort({ createdAt: -1 }).populate("UserId", "FName")
        if (!OrderUser || OrderUser.length === 0) {
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
            return SendError(res, 404, "No OrderFound")
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
        let { id: userId } = req.User
        let { id: OrderId } = req.params
        const FoundedOrder = await Order.findOne({ _id: OrderId, UserId: userId })

        if (!FoundedOrder) {
            return SendError(res, 404, "No OrderFound")
        }
        if (FoundedOrder.OrderStatus != "processing") {
            return SendError(res, 400, "Order can't be cancelled")
        }
        FoundedOrder.OrderStatus = "cancelled"

        await FoundedOrder.save()
        return SendSuccess(res, 200, `Order canceled`, { FoundedOrder })

    } catch (error) {
        return SendError(res, 500, "Internal Server error")

    }
}


