import { Resend } from "resend";
import { AuthConfig } from "../config/auth.config";

const resend = new Resend(AuthConfig.ResendApiKey);

export const SendEmail = async (to: string, sub: string, msg: string) => {
    try {
        const { data, error } = await resend.emails.send({
            // 🌟 On free tier, use 'onboarding@resend.dev':
            from: "ECOM Store <onboarding@resend.dev>",
            to: [to],
            subject: sub,
            html: msg
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("✅ Email sent via Resend! ID:", data?.id);
        return data;
    } catch (err: any) {
        console.error("Failed to send email via Resend:", err.message);
        throw err;
    }
};