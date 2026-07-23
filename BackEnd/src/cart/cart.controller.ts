import { AuthRequest } from "../config/auth.config";
import { Product } from "../products/product.model";
import { SendError, SendSuccess } from "../utils/responce";
import { Request, Response } from 'express';
import { Cart } from "./cart.model";

export const AddToCart = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User

        let { id: productId } = req.params

        let { Quantity, Sizes, Colors } = req.body

        const FounedProduct = await Product.findById(productId)

        if (!FounedProduct) {
            return SendError(res, 400, "Product not found")
        }

        const FoundedCart = await Cart.findOne({ UserId: userId })

        if (!FoundedCart) {
            const NewCart = await Cart.create({
                UserId: userId,
                CartPrice: FounedProduct.Price * Quantity,
                Items: [
                    {
                        ProductId: productId as any,
                        Quantity,
                        Colors,
                        Sizes
                    }
                ]
            })
            return SendSuccess(res, 200, `${FounedProduct.Name} added to cart😊`, { NewCart })
        }

        const index = FoundedCart.Items.findIndex(item => item.ProductId.toString() === FounedProduct._id.toString())

        if (index > -1) {
            FoundedCart.Items[index].Quantity += Quantity
        }
        else {
            FoundedCart.Items.push(
                {
                    ProductId: productId as any,
                    Quantity,
                    Colors,
                    Sizes
                }
            )
        }
        FoundedCart.CartPrice += FounedProduct.Price * Quantity
        await FoundedCart.save()
        return SendSuccess(res, 200, `${FounedProduct.Name} added to cart😊`, { FoundedCart })

    } catch (error) {
        return SendError(res, 500, "error in adding product to cart")

    }

}

export const GetCart = async (req: AuthRequest, res: Response) => {
    try {
        let { id } = req.User
        const FoundedCart = await Cart.findOne({ UserId: id }).populate("Items.ProductId")
        if (!FoundedCart) {
            return SendError(res, 404, "Cart Empty")
        }
        return SendSuccess(res, 200, "Cart items", { FoundedCart })

    } catch (error) {
        return SendError(res, 500, "Unkonwn error")
    }

}

export const RemoveFromCart = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User
        let { id: productId } = req.params
        const FoundedProduct = await Product.findById(productId)
        if (!FoundedProduct) {
            return SendError(res, 400, "Product not found")
        }
        const FoundedCart = await Cart.findOne({ UserId: userId })
        if (!FoundedCart) {
            return SendError(res, 400, "Cart not found")
        }
        const index = FoundedCart.Items.findIndex(item => item.ProductId.toString() === productId.toString())

        if (index > -1) {
            FoundedCart.Items[index].Quantity--
            FoundedCart.CartPrice -= FoundedProduct.Price
            if (FoundedCart.Items[index].Quantity === 0) {
                FoundedCart.Items.splice(index, 1)
                await FoundedCart.save()
                return SendError(res, 200, `${FoundedProduct.Name} removed from cart completely`)
            }
            await FoundedCart.save()
            return SendSuccess(res, 200, `${FoundedProduct.Name} removed from cart`, { CurrentQuantity: FoundedCart.Items[index].Quantity })
        }
        return SendError(res, 400, "Product is not in your cart")

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

export const RemoveCart = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User
        const FoundedCart = await Cart.findOne({ UserId: userId })
        if (!FoundedCart) {
            return SendError(res, 400, "Cart not found")
        }
        FoundedCart.Items.length = 0
        FoundedCart.CartPrice=0
        await FoundedCart.save()
        return SendSuccess(res, 200, `Cart removed`, { FoundedCart })

} catch (error) {
    return SendError(res, 500, "Unknown error")

}
}
