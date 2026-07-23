import mongoose from "mongoose";
import { User } from "../auth/user.model";
import { Product } from "../products/product.model";

type CartType = {
    UserId: mongoose.Types.ObjectId
    CartPrice: number
    Items: {
        ProductId: mongoose.Types.ObjectId
        Quantity: number
        Colors: string
        Sizes: string
    }[]
}

const CartSchema = new mongoose.Schema<CartType>(
    {
        UserId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        CartPrice: {
            type: Number,
            default: 0,
        },
        Items: [
            {
                ProductId: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                Quantity: {
                    type: Number,
                    default: 1,
                },
                Colors: {
                    type: String,
                    require: false,
                },
                Sizes: {
                    type: String,
                    require: false,
                },
            },
        ],
    },
    { timestamps: true },
);

export const Cart = mongoose.model<CartType>("Cart", CartSchema)