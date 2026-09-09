import express, { Router } from 'express';
import { User } from './user.model';
import { GetMe, LoginUser, RegisterUser, Refresh, Logout, ForgetPassword, VerifyOTP, ResetPassword } from './auth.controller';
import {GoogleCallback, GoogleRedirect} from './google';
import { Authenticate } from '../middlewares/authentication';
import { authorizeRoles } from '../middlewares/authorization';


const AuthRouter = Router()

AuthRouter.post("/register", RegisterUser)

AuthRouter.post("/login", LoginUser)

AuthRouter.get("/google", GoogleRedirect)

AuthRouter.get("/google/callback", GoogleCallback);

AuthRouter.post("/refresh", Refresh)

AuthRouter.get("/me", Authenticate ,GetMe)

AuthRouter.post("/logout",Logout)

AuthRouter.post("/forget-password",ForgetPassword)

AuthRouter.post("/verify-otp",VerifyOTP)

AuthRouter.post("/reset-password",Authenticate,authorizeRoles("User"),ResetPassword)


export default AuthRouter
