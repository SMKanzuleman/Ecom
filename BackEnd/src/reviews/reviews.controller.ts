import { SendError, SendSuccess } from "../utils/responce"
import { Response } from "express"
import { Reviews } from "./reviews.model"
import { AuthRequest } from "../config/auth.config"

export const WriteReview = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.User.id
        const { productId } = req.params

        const { Comment, Recomended, Rating } = req.body

        if (!Rating || !Comment) {
            return SendError(res, 400, "Rating and Comment are required")
        }
        const NewReview = await Reviews.create({
            UserId: userId,
            ProductId: productId as string,
            Rating,
            Comment,
            IsRecomended: Boolean(Recomended)
        })

        SendSuccess(res, 201, "Review created", NewReview)


    } catch (error) {
        console.error(error)
        SendError(res, 500, "error")

    }
}
export const GetProductReviews = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.User.id
        const { productId } = req.params

        const FoundedReviews =await Reviews.find({ ProductId: productId }).populate("UserId")

        if (!FoundedReviews) {
            return SendError(res, 404, "No Reviews Found.")
        }
        return SendSuccess(res, 201, "Review created", {FoundedReviews})

    } catch (error) {
        console.error(error)
        SendError(res, 500, "error")

    }
}
