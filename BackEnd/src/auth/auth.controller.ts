import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken'
import { User } from './user.model';
import { Request, Response } from 'express'
import { SendError, SendSuccess } from "../utils/responce";
import { AuthConfig } from "../config/auth.config";
import { token } from "morgan";



const GenerateToken = (UserId: string): string => {
    return jwt.sign(
        { id: UserId },
        AuthConfig.SecretKey,
        { expiresIn: "1m" }
    )
}

const RegisterUser = async (req: Request, res: Response) => {
    try {
        const { Name, Email, Password } = req.body

        if (!Name || !Email || !Password) {
            return SendError(res, 404, "All field are required.")
        }
        const ExistingUser = await User.findOne({ Email })
        if (ExistingUser) {
            return SendError(res, 500, "Account already exist.")
        }
        const NewUser = new User({ Name, Email, Password });
        await NewUser.save()

        const Token = GenerateToken(NewUser._id.toString())
        return SendSuccess(res, 201, "User registered sucessfully", { user: NewUser, token: Token })

    } catch (error) {
        return SendError(res, 500, "There is some error")
    }
}

const LoginUser = async (req: Request, res: Response) => {
    try {
        const { Email, Password } = req.body

        if (!Email || !Password) {
            return SendError(res, 404, "All field are required.")
        }
        const FoundedUser = await User.findOne({ Email })
        if (!FoundedUser) {
            return SendError(res, 404, "You does not have an account")
        }
        const Token = GenerateToken(FoundedUser._id.toString())
        return SendSuccess(res, 200, "User Found sucessfully", { User: FoundedUser, token: Token })

    } catch (error) {
        return SendError(res, 500, "There is some error")
    }
}

const GetMe = async (req: Request, res: Response) => {
    try {
        if (!req.headers.authorization) {
            return SendError(res, 404, "Token does not found")
        }
        const Token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(Token, AuthConfig.SecretKey) as { id: string }
        const FoundedUser = await User.findById(decoded.id).select("-Password")
        if (!FoundedUser) {
            return SendError(res, 400, "You does not have an account.Create account first.")
        }
        return SendSuccess(res, 200, "Token Found.", { User: FoundedUser })

    } catch (error) {
        return SendError(res, 500, "There is some error")
    }
}

export { RegisterUser, LoginUser, GetMe }