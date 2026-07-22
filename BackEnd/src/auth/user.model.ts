import mongoose, { Schema } from "mongoose";

type UserType = {
    Name: string
    Email: string
    Provider: "local" | "google"
    Password?: string
    Role: "User" | "Admin"
}

// Generics allow us to pass types as parameters to functions and classes keeping strict type safety.

const UserSchema = new mongoose.Schema<UserType>({
    Name: {
        type: String,
        required: [true, "name is required"]
    },
    Email: {
        type: String,
        required: [true, "email is required"]
    },
    Provider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    Password: {
        type: String,
        required: function (this: any) {
            return this.Provider === "local"
        }
    },
    Role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
}, {
    timestamps: true
})

export const User = mongoose.model<UserType>("User", UserSchema)