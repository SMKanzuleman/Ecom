import express, { Router } from 'express';
import { User } from './user.model';
import { GetMe, LoginUser, RegisterUser, Refresh, Logout, VerifyOTP, ResetPassword, RequestOTP, ChangePassword } from './auth.controller';
import { GoogleCallback, GoogleRedirect } from './google';
import { Authenticate } from '../middlewares/authentication';
import { authorizeRoles } from '../middlewares/authorization';


const AuthRouter = Router()

AuthRouter.post("/register", RegisterUser)

AuthRouter.post("/login", LoginUser)

AuthRouter.get("/google", GoogleRedirect)

AuthRouter.get("/google/callback", GoogleCallback);

AuthRouter.post("/refresh", Refresh)

AuthRouter.get("/me", Authenticate, GetMe)

AuthRouter.post("/logout", Logout)

AuthRouter.post("/request-OTP", RequestOTP)

AuthRouter.post("/verify-otp", VerifyOTP)

AuthRouter.post("/reset-password", ResetPassword)

AuthRouter.post("/change-password", Authenticate, authorizeRoles("User"), ChangePassword)


export default AuthRouter
