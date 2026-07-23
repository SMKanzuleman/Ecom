import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { AddToCart, GetCart } from "./cart.controller";


export const CartRouter = Router()

CartRouter.post("/:id", Authenticate, authorizeRoles("User"), AddToCart)
CartRouter.get("/",Authenticate,authorizeRoles("User"),GetCart)