import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { GetAllUsers } from "./admin.controller";

export const AdminRouter=Router()

AdminRouter.get("/AllUsers",Authenticate,authorizeRoles("Admin"),GetAllUsers)