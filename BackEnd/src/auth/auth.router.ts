import express, { Router } from 'express';
import { User } from './user.model';
import { GetMe, LoginUser, RegisterUser, Refresh } from './auth.controller';
import { Authenticate } from './auth.middleware';
import {GoogleCallback, GoogleRedirect} from './google';


const AuthRouter = Router()

AuthRouter.post("/register", RegisterUser)

AuthRouter.post("/login", LoginUser)

AuthRouter.get("/google", GoogleRedirect)

AuthRouter.get("/google/callback", GoogleCallback);

AuthRouter.post("/refresh", Refresh)

AuthRouter.get("/me", Authenticate ,GetMe)

export default AuthRouter