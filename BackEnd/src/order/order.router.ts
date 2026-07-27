import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { MakeOrder, GetUserOrders, GetAllOrders, UpdateOrderStatus, CancelOrder } from './order.controller';
import AuthRouter from "../auth/auth.router";

export const OrderRouter = Router()

OrderRouter.post("",Authenticate,authorizeRoles("User"),MakeOrder)

OrderRouter.get("/userorders",Authenticate,authorizeRoles("User"),GetUserOrders)

OrderRouter.get("", Authenticate, authorizeRoles("Admin"), GetAllOrders)

OrderRouter.put("/:id/", Authenticate, authorizeRoles("Admin"), UpdateOrderStatus)

OrderRouter.put("/cancel/:id",Authenticate,authorizeRoles("User"),CancelOrder)