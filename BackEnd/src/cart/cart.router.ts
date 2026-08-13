import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { AddToCart, GetCart, RemoveFromCart, RemoveCart, UpdateQuantity } from './cart.controller';


export const CartRouter = Router()

CartRouter.delete("/:id",Authenticate,authorizeRoles("User"),RemoveFromCart)

CartRouter.post("/:id", Authenticate, authorizeRoles("User"), AddToCart)

CartRouter.get("/", Authenticate, authorizeRoles("User"), GetCart)

// CartRouter.put("/:id", Authenticate, authorizeRoles("User"), RemoveFromCart)

CartRouter.put("/:id", Authenticate, authorizeRoles("User"), UpdateQuantity)

CartRouter.delete("/",Authenticate,authorizeRoles("User"),RemoveCart)
