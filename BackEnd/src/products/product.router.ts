import { Router } from "express";
import { AddNewProduct, DeleteAllProduct, DeleteSingleProduct, EditProduct, GetAllProduct, GetFilterData, GetSingleProduct } from "./product.controller";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { upload } from "../middlewares/upload";

export const ProductRouter = Router()

ProductRouter.get("/FilterData",GetFilterData)

ProductRouter.post("/",Authenticate,authorizeRoles("Admin"),upload.array("Imges",5) ,AddNewProduct )

ProductRouter.get("/", GetAllProduct)

ProductRouter.get("/:id",GetSingleProduct)

ProductRouter.put("/:id",Authenticate,authorizeRoles("Admin"),upload.array("Imges",5), EditProduct)

ProductRouter.delete("/:id", Authenticate,authorizeRoles("Admin"),DeleteSingleProduct)

ProductRouter.delete("/",Authenticate,authorizeRoles("Admin"), DeleteAllProduct)

