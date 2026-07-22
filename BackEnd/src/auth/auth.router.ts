import express, { Router } from 'express';
import { User } from './user.model';
import { GetMe, LoginUser, RegisterUser, Refresh } from './auth.controller';
import {GoogleCallback, GoogleRedirect} from './google';
import { Authenticate } from '../middlewares/authentication';


const AuthRouter = Router()

AuthRouter.post("/register", RegisterUser)

AuthRouter.post("/login", LoginUser)

AuthRouter.get("/google", GoogleRedirect)

AuthRouter.get("/google/callback", GoogleCallback);

AuthRouter.post("/refresh", Refresh)

AuthRouter.get("/me", Authenticate ,GetMe)

export default AuthRouter