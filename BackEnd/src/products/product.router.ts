import { Router } from "express";
import { AddNewProduct, DeleteAllProduct, DeleteSingleProduct, EditProduct, GetAllProduct, GetSingleProduct } from "./product.controller";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";

export const ProductRouter = Router()

ProductRouter.post("/",Authenticate,authorizeRoles("Admin") ,AddNewProduct )

ProductRouter.get("/:id",GetSingleProduct)

ProductRouter.get("/", GetAllProduct)

ProductRouter.put("/:id",Authenticate,authorizeRoles("Admin"), EditProduct)

ProductRouter.delete("/:id", Authenticate,authorizeRoles("Admin"),DeleteSingleProduct)

ProductRouter.delete("/",Authenticate,authorizeRoles("Admin"), DeleteAllProduct)
