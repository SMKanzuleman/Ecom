import mongoose from "mongoose";
import { METHODS } from "node:http";


export type OrderType = {
    UserId: mongoose.Types.ObjectId
    OrderPrice: number
    PaymentStatus: "pending" | "paid"
    OrderStatus: "processing" | "shipped" | "delivered" | "cancelled"
    
    Address: {
        State: string
        City: string
        Location: string
        Zip: string
        LandMark: string

    }
    Recipient: {
        FName: string
        LName: string
        Phone: Number
    }
    PaymentDetails:{
        Method:string,
        CardNumber?:string,
        CVV?:string,
        MMYY?:string,

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
