import mongoose from "mongoose";

const SiteConfigSchema = new mongoose.Schema({
    // Footer Configuration
    Footer: {
        BrandDescription: {
            type: String,
            default: "Your premier luxury fashion destination."
        },
        ContactEmail: {
            type: String,
            default: "support@ecom.com"
        },
        ContactPhone: {
            type: String,
            default: "+92 300 1234567"
        },
        Address: {
            type: String,
            default: "Lahore, Pakistan"
        },
        BusinessTimings: {
            type: String,
            default: "Mon - Sat: 9:00 AM – 9:00 PM PKT"
        },

        SocialLinks: {
            Instagram: { type: String, default: "" },
            Facebook: { type: String, default: "" },
            Twitter: { type: String, default: "" }
        },

        ExplorePagesLinks: [
            {
                Label: {
                    type: String,
                    required: true
                },
                Url: {
                    type: String,
                    required: true
                }

            }
        ],
    
        CustomerCareLinks: [
            {
       
                label: { type: String, required: true },
                url: { type: String, required: true }
            }
        ],
       
        CopyrightText: {
            type: String,
            default: "© 2026 Ecom Inc. All rights reserved."
        }
    }
}, { timestamps: true });

export const SiteConfig = mongoose.model("SiteConfig", SiteConfigSchema);