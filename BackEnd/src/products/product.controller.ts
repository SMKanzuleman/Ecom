import { SendError, SendSuccess } from "../utils/responce";
import { Request, Response } from 'express';
import { Product } from './product.model';
import { ProductType } from "../config/product.config";

//Create

export const AddNewProduct = async (req: Request, res: Response) => {
    try {

        let { Name, Price, Stock, Description, Sizes, Colours, Tags } = req.body

        if (!Name || !Price || !Stock || !Description) {
            return SendError(res, 400, "Fill all required fields")
        }

        const NewProduct = new Product({
            Name, Price, Stock, Description, Sizes, Colours, Tags
        })

        await NewProduct.save()

        return SendSuccess(res, 200, "Product created.", { AddedProduct: NewProduct })

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

//Read

export const GetSingleProduct = async (req: Request, res: Response) => {
    try {

        let { id } = req.params

        const FoundedProduct = await Product.findById(id)

        if (!FoundedProduct) {
            return SendError(res, 400, "No product found")
        }
        return SendSuccess(res, 200, "Product found.", { FoundedProduct })

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

export const GetAllProduct = async (req: Request, res: Response) => {
    try {

        const AllProducts: ProductType[] = await Product.find({}).limit(30)

        return SendSuccess(res, 200, "Products found.", { AllProducts })

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}



//Update

export const EditProduct = async (req: Request, res: Response) => {
    try {

        let { id } = req.params

        const FoundedProduct = await Product.findById(id)

        if (!FoundedProduct) {
            return SendError(res, 400, "No product found")
        }

        const UpdatedProduct = await Product.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })

        return SendSuccess(res, 200, "Product updated.", { UpdatedProduct })

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

//Delete

export const DeleteSingleProduct = async (req: Request, res: Response) => {
    try {

        let { id } = req.params

        const FoundedProduct = await Product.findById(id)

        if (!FoundedProduct) {
            return SendError(res, 400, "No product found")
        }

        await Product.findByIdAndDelete(id)

        return SendSuccess(res, 200, "Product deleted.")

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}

export const DeleteAllProduct = async (req: Request, res: Response) => {
    try {

        await Product.deleteMany({})

        return SendSuccess(res, 200, "All products deleted.",)

    } catch (error) {
        return SendError(res, 500, "Unknown error")

    }
}
