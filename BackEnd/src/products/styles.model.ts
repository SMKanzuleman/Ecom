import mongoose from "mongoose";
type StyleType = {
    Name: string;
    Categories: string[];
    ShowOnHome: boolean;
    HomeSlot: number | null;
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
    },
    ShowOnHome: {
        type: Boolean,
        default: false
    },
    HomeSlot: {
        type: Number,
        default: null
    }
}, { timestamps: true })

export const Style = mongoose.model<StyleType>("Style", StyleScheme)