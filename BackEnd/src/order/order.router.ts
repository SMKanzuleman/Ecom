import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { MakeOrder, GetUserOrders, GetAllOrders, UpdateOrderStatus, CancelOrder, StripeSession, VerifyStrpeAndCreateOrder, GetOrder } from './order.controller';
import AuthRouter from "../auth/auth.router";

export const OrderRouter = Router()

OrderRouter.post("", Authenticate, authorizeRoles("User"), MakeOrder)

OrderRouter.post("/stripe-session", Authenticate, authorizeRoles("User"), StripeSession)

OrderRouter.post("/verify-stripe", Authenticate, authorizeRoles("User"), VerifyStrpeAndCreateOrder)

OrderRouter.get("/userorders", Authenticate, GetUserOrders)

OrderRouter.get("/:id/", Authenticate, authorizeRoles("User"),GetOrder)

OrderRouter.get("", Authenticate, authorizeRoles("Admin"), GetAllOrders)

OrderRouter.put("/:id/", Authenticate, authorizeRoles("Admin"), UpdateOrderStatus)

OrderRouter.put("/cancel/:id", Authenticate, authorizeRoles("User"), CancelOrder)