import mongoose, { Mongoose } from "mongoose";

const OTPSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        expires: 60
    }
})

export const OTP = mongoose.model("OTP", OTPSchema)