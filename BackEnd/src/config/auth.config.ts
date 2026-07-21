import dotenv from 'dotenv';
dotenv.config()

type AuthConfig = {
    AccessSecretKey: string
    AccessExpiry: string
    RefreshSecretKey: string
    RefreshExpiry: string
    NODE_ENV: string
}

export const AuthConfig: AuthConfig = {
    AccessSecretKey: process.env.JWT_SECRET || "123456",
    NODE_ENV: process.env.NODE_ENV || "production",
    AccessExpiry: process.env.ACCESS_TOKEN_EXPIRY || "10m",
    RefreshSecretKey: process.env.REFRESH_TOKEN_JWT_SECRET || "12444",
    RefreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7D"
    
}