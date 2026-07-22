import dotenv from 'dotenv';
import { Request } from 'express';
dotenv.config()

type AuthConfig = {
    AccessSecretKey: string
    AccessExpiry: string
    RefreshSecretKey: string
    RefreshExpiry: string
    NODE_ENV: string
    OAuthClientId: string,
    OAuthClientSecret: string
    OAuthCallbackUrl:string
}

export interface AuthRequest extends Request {
    User?: any
}

export const AuthConfig: AuthConfig = {
    AccessSecretKey: process.env.JWT_SECRET || "123456",
    NODE_ENV: process.env.NODE_ENV || "production",
    AccessExpiry: process.env.ACCESS_TOKEN_EXPIRY || "10m",
    RefreshSecretKey: process.env.REFRESH_TOKEN_JWT_SECRET || "12444",
    RefreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    OAuthClientId:process.env.OAUTH_CLIENT_ID || "",
    OAuthClientSecret: process.env.OAUTH_CLIENT_SECRET || "",
    OAuthCallbackUrl: process.env.OAUTH_CALLBACK_URL || " "
    
}