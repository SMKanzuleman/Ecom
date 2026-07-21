import express, { Router } from 'express';
import { User } from './user.model';
import { GetMe, LoginUser, RegisterUser } from './auth.controller';



const AuthRouter = Router()

AuthRouter.post("/register", RegisterUser)

AuthRouter.post("/login", LoginUser)

AuthRouter.get("/me", GetMe)

export default AuthRouter