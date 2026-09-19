
import { Router } from "express"
import { Authenticate } from "../middlewares/authentication"
import { authorizeRoles } from "../middlewares/authorization"
import { AddContactDetailsToFooter, CreateLink, DeleteExploreLink, GetFooterConfig, UpdateBrandDetails } from "./siteconfig.controller"

export const SiteConfigRouter=Router()

SiteConfigRouter.get("/footer", GetFooterConfig);

SiteConfigRouter.post("/link",Authenticate,authorizeRoles("Admin"),CreateLink)

SiteConfigRouter.put("/contact", Authenticate, authorizeRoles("Admin"), AddContactDetailsToFooter)
SiteConfigRouter.put("/brand", Authenticate, authorizeRoles("Admin"), UpdateBrandDetails)

SiteConfigRouter.delete("/link",Authenticate,authorizeRoles("Admin"),DeleteExploreLink)



