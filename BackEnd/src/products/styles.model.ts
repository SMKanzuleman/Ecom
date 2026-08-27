import mongoose from "mongoose";
type StyleType = {
    Name: string;
    Categories: string[];
    createdAt: Date;
    updatedAt: Date;
}

const StyleScheme = new mongoose.Schema<StyleType>({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    Categories: {
        type: [String],
        required: true,
        default: []

    }

}, { timestamps: true })

export const Style = mongoose.model<StyleType>("Style", StyleScheme)