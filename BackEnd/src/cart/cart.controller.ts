import { AuthRequest } from "../config/auth.config";
import { Product } from "../products/product.model";
import { SendError, SendSuccess } from "../utils/responce";
import { Request, Response } from 'express';
import { Cart } from "./cart.model";

export const AddToCart = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User

        let { id: productId } = req.params

        let { Quantity, Size, Color } = req.body

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
                        Colors: Color,
                        Sizes: Size,
                    }
                ]
            })

            return SendSuccess(res, 200, `${FounedProduct.Name} added to cart😊`, { NewCart })
        }

        const index = FoundedCart.Items.findIndex(item => item.ProductId.toString() === FounedProduct._id.toString() && item.Colors === Color && item.Sizes === Size)

        if (index > -1) {
            FoundedCart.Items[index].Quantity += Quantity
        }
        else {
            FoundedCart.Items.push(
                {
                    ProductId: productId as any,
                    Quantity,
                    Colors: Color,
                    Sizes: Size,
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

        let { Sizes, Colors, Quantity } = req.body

        const FoundedProduct = await Product.findById(productId)

        if (!FoundedProduct) {
            return SendError(res, 400, "Product not found")
        }

        const FoundedCart = await Cart.findOne({ UserId: userId })

        if (!FoundedCart) {
            return SendError(res, 400, "Cart not found")
        }

        const index = FoundedCart.Items.findIndex(item => item.ProductId.toString() === productId.toString() && item.Sizes === Sizes && item.Colors === Colors && item.Quantity === Quantity)

        if (index > -1) {
            const ItemToBeDeleted = FoundedCart.Items[index]
            FoundedCart.Items.splice(index, 1)
            FoundedCart.CartPrice -= ItemToBeDeleted.Quantity * FoundedProduct.Price
            await FoundedCart.save()
            return SendSuccess(res, 200, `${FoundedProduct.Name} removed from your cart`, { FoundedCart })
        }

        return SendError(res, 400, "Product is not in your cart")

    } catch (error) {
        console.error(error)
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
        FoundedCart.CartPrice = 0
        await FoundedCart.save()
        return SendSuccess(res, 200, `Cart removed`, { FoundedCart })

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

export const UpdateQuantity = async (req: AuthRequest, res: Response) => {
    try {
        let { id: userId } = req.User
        let { id: productId } = req.params

        let { q } = req.body //+1,-1

        // if(userId){
        //     return SendError(res, 200, `userid is this ${userId} pId is this ${productId} and quantity is this ${q}`)
        // }
        const FoundedCart = await Cart.findOne({ UserId: userId }).populate("Items.ProductId")
        if (!FoundedCart) {
            return SendError(res, 400, "Cart not found")
        }
        console.log("d2")
        const index = FoundedCart.Items.findIndex((item) => (item.ProductId._id.toString() === productId.toString()))

        if (index > -1) {
            FoundedCart.Items[index].Quantity = q
            
            FoundedCart.CartPrice = FoundedCart.Items.reduce((total, item: any) => {
                const itemPrice =item.ProductId?.Price || 0;
                return total + (itemPrice * item.Quantity);
            }, 0);
            console.log("d3")
        }

        await FoundedCart.save()
        console.log("d4")
        return SendSuccess(res, 200, `Quantity increased to ${q}`)

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

