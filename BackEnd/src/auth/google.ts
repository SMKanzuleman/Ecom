import { User } from './user.model';
import { GenerateToken } from './utils';
import { Request, Response } from 'express';
import { SendError, SendSuccess } from '../utils/responce';
import { auth, OAuth2Client } from 'google-auth-library';
import { AuthConfig } from '../config/auth.config';

const GoogleClient = new OAuth2Client(AuthConfig.OAuthClientId, AuthConfig.OAuthClientSecret, AuthConfig.OAuthCallbackUrl)

export const GoogleRedirect = async (req: Request, res: Response) => {
    try {
        const AuthUrl = GoogleClient.generateAuthUrl({
            access_type: "offline",
            scope: ["email", "profile"],
            prompt: "select_account" 

        })
        if (!AuthUrl) {
            return SendError(res, 400, "There are some error while genrating auth url")
        }
        return res.redirect(AuthUrl)
    } catch (error) {
        return SendError(res, 500, "There is some error.")

    }

}
export const GoogleCallback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query
        if (!code) {
            return SendError(res, 400, "No auth code in url")
        }
        const { tokens } = await GoogleClient.getToken(code as string)

        const ticket = await GoogleClient.verifyIdToken({ idToken: tokens.id_token!, audience: AuthConfig.OAuthClientId })

        const payload = ticket.getPayload()

        if (!payload) {
            return SendError(res, 400, "Payload not found")
        }
        const { email, name } = payload;

        let user = await User.findOne({ Email: email })

        if (!user) {

             user = new User({
                Email: email,
                Provider: "google",
                FName: name,
                Role: "User"
            })
            await user.save()

        }
        
        const RefreshToken = GenerateToken(user._id.toString(), user.Role, AuthConfig.RefreshSecretKey, AuthConfig.RefreshExpiry)

        res.cookie("token", RefreshToken, {
            httpOnly: true,
            secure: AuthConfig.NODE_ENV === "prodcution",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000

        })

        const AccessToken = GenerateToken(user._id.toString(), user.Role, AuthConfig.AccessSecretKey, AuthConfig.AccessExpiry)

        return res.redirect("http://localhost:2024/");


    } catch (error) {
        console.error(error)
        return SendError(res, 500, "There is some error.")

    }
}