import dotenv from 'dotenv';
dotenv.config()

type AuthConfig = {
    SecretKey: string
}

export const AuthConfig: AuthConfig = {
    SecretKey: process.env.JWT_SECRET || "123456"
    
}