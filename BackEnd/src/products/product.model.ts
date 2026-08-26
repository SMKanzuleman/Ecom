import mongoose from "mongoose";
import { ProductType } from '../config/product.config';



const ProductScheme = new mongoose.Schema<ProductType>({
    Name: {
        type: String,
        required: [true, "Name is required"]
    },
    Brand: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: false
    },
    Tagline: {
        type: String,
        required: [true, "Tagline is required"]
    },


    Price: {
        type: Number,
        required: [true, "Price is required"]
    },
    SalePrice: {
        type: Number,
        required: false
    },
    Stock: {
        type: Number,
        required: [true, "Stock is required"]
    },
    SKU: {
        type: String,
        required: false
    },


    Description: {
        type: String,
        required: [true, "Description is required"]
    },



    Images: {
        type:[String],
        required:true

    },
    Sizes: {
        type: [String],
        required: false
    },
    Colors: {
        type: [String],
        required: false
    },


}, { timestamps: true })


export const Product = mongoose.model<ProductType>("Product", ProductScheme)

