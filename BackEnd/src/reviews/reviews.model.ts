import mongoose, { Mongoose, Schema } from "mongoose";


const ReviewSchema = new mongoose.Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    Rating: {
        type: Number,
        min:0,
        max:5,
        required: true
    },
    Comment:{
        type: String,
        required:true
    },
    IsRecomended:{
        type: Boolean,
        default:true
    },
    IsVerified:{
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Reviews = mongoose.model("Reviews", ReviewSchema)