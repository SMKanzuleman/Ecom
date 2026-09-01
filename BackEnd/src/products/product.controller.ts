import { SendError, SendSuccess } from "../utils/responce";
import { Request, Response } from 'express';
import { Style } from "./styles.model";
import { Product } from './product.model';
import { ProductType } from "../config/product.config";
import { AuthRequest } from "../config/auth.config";
import { isArray } from "node:util";

//Create

export const AddNewProduct = async (req: Request, res: Response) => {
    try {

        const Files = req.files as any[]

        const Images = Files ? Files.map((f: any) => f.path) : []

        let { Name, Brand, Gender, Category, Tagline, Price, SalePrice, Stock, SKU, Description, Sizes, Colors } = req.body

        if (!Name || !Price || !Stock || !Description || !Brand || !Gender || !Category || !Tagline || !Sizes || !Colors) {
            return SendError(res, 400, "Fill all required fields")
        }

        const NewProduct = new Product({
            Name, Brand, Gender, Category, Tagline, Price, SalePrice, Stock, SKU, Description, Sizes, Colors, Images
        })

        await NewProduct.save()

        return SendSuccess(res, 200, "Product created.", { AddedProduct: NewProduct })

    } catch (error) {
        console.log("Error:", error)
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

        const { category, MaxPrice, MinPrice, style, color } = req.query

        let Query: any = {}

        if (category) {
            Query.Category = category
        }
        if (color) {
            Query.Colors = color
        }
        if (style) {
            const catsArray = (style as string).split(",");
            Query.Category = { $in: catsArray };
        }
        if (MinPrice || MaxPrice) {
            Query.Price = {};
            if (MinPrice) Query.Price.$gte = Number(MinPrice);
            if (MaxPrice) Query.Price.$lte = Number(MaxPrice);
        }

        const AllProducts: ProductType[] = await Product.find(Query)

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

        let ExistingImges = []

        if (req.body.Imges.length > 1) {
            ExistingImges = req.body.Imges
        }
        else {
            ExistingImges = [req.body.Images]
        }

        const Files = req.files as any[]

        const NewImges = Files ? Files.map((f: any) => f.path) : []

        const FinalImges = [...ExistingImges, ...NewImges]



        const updateData = {
            Name: req.body.Name,
            Brand: req.body.Brand,
            Gender: req.body.Gender,
            Category: req.body.Category,
            Tagline: req.body.Tagline,
            Price: Number(req.body.Price),
            SalePrice: Number(req.body.SalePrice),
            SKU: req.body.SKU,
            Stock: Number(req.body.Stock),
            Description: req.body.Description,
            Colors: req.body.Colors || [],
            Sizes: req.body.Sizes || [],
            Images: FinalImges, // 🌟 Combined Images List!
        };

        const UpdatedProduct = await Product.findByIdAndUpdate(id, {
            $set: updateData
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

export const GetFilterData = async (req: Request, res: Response) => {
    try {
        const Categories = await Product.distinct("Category");
        const Colors = await Product.distinct("Colors");
        const Styles = await Style.find();
        return SendSuccess(res, 200, "Shop filters data fetched", {
            Categories,
            Colors,
            Styles
        });
    } catch (error) {
        console.error("GetShopFiltersData Error:", error);
        SendError(res, 500, "Server Error")
    }
}


