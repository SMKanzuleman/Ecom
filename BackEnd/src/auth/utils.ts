import jwt from 'jsonwebtoken';

export const GenerateToken = (UserId: string, SecretKey: string, Expiry: any): string => {
    return jwt.sign(
        { id: UserId },
        SecretKey,
        { expiresIn: Expiry }
    )
}