import { Router } from "express"
import { Authenticate } from "../middlewares/authentication"
import { authorizeRoles } from "../middlewares/authorization"
import { AddUserAddress, GetUserDashStats, GetUserInfo } from "./User.controller"

export const UserRouter=Router()

UserRouter.get("/dashboard/stats",Authenticate,authorizeRoles("User"),GetUserDashStats)

UserRouter.get("/dashboard/info",Authenticate,authorizeRoles("User"),GetUserInfo)

UserRouter.post("/dashboard/add/adress",Authenticate,authorizeRoles("User"),AddUserAddress)

