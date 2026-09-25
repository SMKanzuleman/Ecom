import { Response, Request } from "express";
import { AuthRequest } from "../config/auth.config";
import { SendError, SendSuccess } from "../utils/responce";
import { Cart } from "../cart/cart.model";
import { Order } from "./order.model";
import { User } from "../auth/user.model";
import { Product } from "../products/product.model";
import Stripe from "stripe";
import dotenv from "dotenv"
dotenv.config()

const REDIRECT_URL_AFTER_PAYMENT=process.env.FRONTEND_URL


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "")



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
            await Product.findByIdAndUpdate(i.ProductId, {
                $inc: {
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
        const OrderUser = await Order.find({ UserId: userId }).sort({ createdAt: -1 }).populate("OrderItems.ProductId");
        if (!OrderUser) {
            return SendError(res, 400, "No Orders Found")
        }
        return SendSuccess(res, 200, "All Orders", { OrderUser })

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

export const StripeSession = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User

        let { ShippingAddress, DeliveryPrice } = req.body


        const FoundedCart = await Cart.findOne({ UserId: userId }).populate("Items.ProductId")
        if (!FoundedCart || FoundedCart.Items.length === 0) {
            return SendError(res, 404, "You haven't added any item to cart")
        }

        const line_items = FoundedCart.Items.map((item: any) => {
            return {
                price_data: {
                    currency: "pkr",
                    product_data: {
                        name: item.ProductId.Name,
                        description: `Size: ${item.Sizes || 'N/A'} | Color: ${item.Colors || 'N/A'}`,
                    },
                    unit_amount: Math.round(item.ProductId.Price * 100),
                },
                quantity: item.Quantity,
            };
        });
        if (DeliveryPrice) {
            line_items.push(
                {
                    price_data: {
                        currency: "pkr",
                        product_data: {
                            name: "Delivery charges",
                            description: `Express/Fast`,
                        },
                        unit_amount: Math.round(DeliveryPrice * 100),
                    },
                    quantity: 1,
                }
            )
        }
        else {
            return SendError(res, 401, "DeliveryPrice not came")
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `${REDIRECT_URL_AFTER_PAYMENT}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${REDIRECT_URL_AFTER_PAYMENT}`,
            metadata: {
                userId: userId.toString(),
                ShippingAddress: JSON.stringify(ShippingAddress),
            },
        });


        return SendSuccess(res, 200, "Session created", { url: session.url })

    } catch (error: any) {
        console.error("Stripe Error:", error);
        return SendError(res, 500, error.message || "Internal Server error")
    }
}

export const VerifyStrpeAndCreateOrder = async (req: AuthRequest, res: Response) => {
    try {

        let { id: userId } = req.User

        let { SessionId } = req.body

        if (!SessionId) {
            SendError(res, 203, "No Session Id Found")
        }

        const Session = await stripe.checkout.sessions.retrieve(SessionId)

        if (Session.payment_status !== "paid") {
            SendError(res, 203, "Order is Not paid")
        }

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
            await Product.findByIdAndUpdate(i.ProductId, {
                $inc: {
                    Sold: i.Quantity,
                    Stock: -i.Quantity
                }
            })
        }
        const Address = JSON.parse(Session.metadata?.ShippingAddress || "{}")

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
            PaymentStatus: "paid",
            Recipient: {
                FName: Address.RFName,
                LName: Address.RLName,
                Phone: Address.Phone
            },

            OrderItems: FoundedItems
        })
        foundedCart.Items = [] as any;
        foundedCart.CartPrice = 0;
        await foundedCart.save();
        SendSuccess(res, 200, "Order Created")

    } catch (error: any) {
        console.error("Stripe Error:", error);
        return SendError(res, 500, error.message || "Internal Server error")
    }
}



