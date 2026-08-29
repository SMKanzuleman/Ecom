import mongoose from "mongoose";
import { User } from "../auth/user.model";
import { Product } from "../products/product.model";
import { OrderType } from '../config/order.config';

const OrderScheme = new mongoose.Schema<OrderType>({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    OrderPrice: {
        type: Number,
        required: true
    },

    PaymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    },
    OrderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    },
    Recipient: {
        FName: {
            type: String,
            required: true
        },
        LName: {
            type: String,
            required: true
        },
        Phone: {
            type: Number,
            required: true
        }

    },
    PaymentDetails: {
        Method: {
            type: String,
            enum: ["cod", "bank"],
            required: true,
        },
        CardNumber: {
            type: String, 
            required: false,
        },
        CVV: {
            type: String,
            required: false,
        },
        MMYY: {
            type: String,
            required: false,
        }
    },

    Address: {
        State: {
            type: String,
            required: true
        },
        City: {
            type: String,
            required: true
        },
        Zip: {
            type: String,
            required: true
        },
        Location: {
            type: String,
            required: true
        },
        LandMark: {
            type: String,
            required: true
        }
    },
    OrderItems: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            Name: {
                type: String
            },
            Quantity: {
                type: Number
            },
            PriceAtPurchase: {
                type: Number
            },
            Colors: {
                type: String,
                required: false
            },
            Sizes: {
                type: String,
                required: false
            }

        }
    ]

}, { timestamps: true })

export const Order = mongoose.model<OrderType>("Order", OrderScheme)