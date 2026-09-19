import { send } from "process";
import { AuthRequest } from "../config/auth.config";
import { SendError, SendSuccess } from "../utils/responce";
import { SiteConfig } from "./siteconfig.model";
import { Request, Response } from "express";



export const CreateLink = async (req: AuthRequest, res: Response) => {
    try {

        let { LinkLabel, LinkURL } = req.body

        const Updated = await SiteConfig.findOneAndUpdate({}, {
            $push: {
                "Footer.ExplorePagesLinks": {
                    Label: LinkLabel,
                    Url: LinkURL
                }
            }
        }, { new: true, upsert: true })

        SendSuccess(res, 200, "Link updated", { ExploreLink: Updated.Footer?.ExplorePagesLinks })

    } catch (error) {
        console.error(error)
    }
}
export const GetFooterConfig = async (req: Request, res: Response) => {
    try {
        let config = await SiteConfig.findOne();
        if (!config) {
            config = await SiteConfig.create({}); // Agar pehle se nahi hai to default bana do
        }
        // Poora Footer object bhej do
        SendSuccess(res, 200, "Footer config fetched", { Footer: config.Footer });
    } catch (error) {
        console.error(error);
        SendError(res, 500, "Error fetching footer config");
    }
};
export const DeleteExploreLink = async (req: Request, res: Response) => {
    try {

        let { id } = req.body

        let config = await SiteConfig.findOneAndUpdate({}, {
            $pull: {
                "Footer.ExplorePagesLinks": {
                    _id: id
                }
            }

        }, { new: true });

        if (!config) {
            SendError(res, 404, "Not Found")
        }

        // Poora Footer object bhej do
        SendSuccess(res, 200, "Footer config fetched", { Footer: config?.Footer });

    } catch (error) {

        console.error(error);

        SendError(res, 500, "Error Deleting Explore Link");

    }
};

export const AddContactDetailsToFooter = async (req: Request, res: Response) => {
    try {
        const { ContactEmail, ContactPhone, Address, BusinessTimings } = req.body;

        const config = await SiteConfig.findOneAndUpdate(
            {},
            {
                $set: {
                    "Footer.ContactEmail": ContactEmail,
                    "Footer.ContactPhone": ContactPhone,
                    "Footer.Address": Address,
                    "Footer.BusinessTimings": BusinessTimings,
                }
            },
            { new: true, upsert: true }
        );

        return SendSuccess(res, 200, "Contact details updated successfully", { Footer: config?.Footer });

    } catch (error) {
        console.error(error);
        return SendError(res, 500, "Error updating contact details");
    }
};

export const UpdateBrandDetails = async (req: Request, res: Response) => {
    try {
        const { BrandDescription, SocialLinks } = req.body;

        const config = await SiteConfig.findOneAndUpdate(
            {},
            {
                $set: {
                    "Footer.BrandDescription": BrandDescription,
                    "Footer.SocialLinks": SocialLinks,
                }
            },
            { new: true, upsert: true }
        );

        return SendSuccess(res, 200, "Brand and social details updated successfully", { Footer: config?.Footer });

    } catch (error) {
        console.error(error);
        return SendError(res, 500, "Error updating brand details");
    }
};

