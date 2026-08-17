import jwt from 'jsonwebtoken';

export const GenerateToken = (UserId: string,Role:string, SecretKey: string, Expiry: any): string => {
    return jwt.sign(
        { id: UserId ,Role},
        SecretKey,
        { expiresIn: Expiry }
    )
}