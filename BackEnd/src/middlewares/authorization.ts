import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../config/auth.config";
import { User } from "../auth/user.model";
import { SendError } from "../utils/responce";

export const authorizeRoles = (requiredRole: string) => {
    return async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            let { id } = req.User;
            const FoundedUser = await User.findById(id);
            if (!FoundedUser) {
                return SendError(res, 404, "User not found");
            }
            if (FoundedUser.Role === requiredRole) {
                return next();
            }
            return SendError(
                res,
                403,
                "You donot have permission to access this route.",
            );
        } catch (error) {
            return SendError(
                res,
                500,
                "Error occured.",
            );
        }
    };
};
