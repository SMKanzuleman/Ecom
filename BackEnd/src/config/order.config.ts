import mongoose from "mongoose";


export type OrderType = {
    UserId: mongoose.Types.ObjectId
    OrderPrice: number
    PaymentStatus: "pending" | "paid"
    OrderStatus: "processing" | "shipped" | "delivered" | "cancelled"
    Address: {
        State: string
        City: string
        Location: string
    }
    OrderItems: {
        ProductId: mongoose.Types.ObjectId
        Name: string
        Quantity: number
        PriceAtPurchase: number
        Colors?: string
        Sizes?: string
    }[]
}
