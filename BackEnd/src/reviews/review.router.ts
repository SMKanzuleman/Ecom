import { Router } from "express";
import { Authenticate } from "../middlewares/authentication";
import { authorizeRoles } from "../middlewares/authorization";
import { GetProductReviews, WriteReview } from "./reviews.controller";

export const ReviewRouter=Router()

ReviewRouter.post("/:productId",Authenticate,authorizeRoles("User"),WriteReview)
ReviewRouter.get("/:productId",Authenticate,authorizeRoles("User"),GetProductReviews)