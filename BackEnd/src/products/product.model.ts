import mongoose from "mongoose";
import { ProductType } from '../config/product.config';



const ProductScheme = new mongoose.Schema<ProductType>({
    Name: {
        type: String,
        required: [true, "Name is required"]
    },
    Price: {
        type: Number,
        required: [true, "Price is required"]
    },
    Stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    Description: {
        type: String,
        required: [true, "Description is required"]
    },
    Sizes: {
        type: [String],
        required: false
    },
    Colors: {
        type: [String],
        required: false
    },
    Tags: {
        type: [String],
        required: false
    }

}, { timestamps: true })


export const Product = mongoose.model<ProductType>("Product",ProductScheme)

