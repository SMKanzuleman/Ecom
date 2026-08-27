import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import {  AddStyles, GetAllUsers, GetStyles } from "./admin.controller";

export const AdminRouter=Router()

AdminRouter.get("/AllUsers",Authenticate,authorizeRoles("Admin"),GetAllUsers)
AdminRouter.post("/Styles",Authenticate,authorizeRoles("Admin"),AddStyles)
AdminRouter.get("/Styles",Authenticate,authorizeRoles("Admin"),GetStyles)