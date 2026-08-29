import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { Request, Response } from "express";
import { SendError, SendSuccess } from "../utils/responce";
import { AuthConfig, AuthRequest } from "../config/auth.config";
import { token } from "morgan";
import { OAuth2Client } from "google-auth-library";
import { GenerateToken } from "./utils";

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { FName, LName, Email, Password } = req.body;

    if (!FName || !Email || !Password) {
      return SendError(res, 404, "All field are required.");
    }
    const ExistingUser = await User.findOne({ Email });
    if (ExistingUser) {
      return SendError(res, 500, "Account already exist.");
    }
    const NewUser = new User({ FName, LName, Email, Password });
    await NewUser.save();

    const AccessToken = GenerateToken(
      NewUser._id.toString(),
      NewUser.Role,
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

    const RefreshToken = GenerateToken(
      NewUser._id.toString(),
      NewUser.Role,
      AuthConfig.RefreshSecretKey,
      AuthConfig.RefreshExpiry,
    );
    res.cookie("token", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return SendSuccess(res, 201, "User registered sucessfully", {
      user: NewUser,
      token: AccessToken,
    });
  } catch (error) {
    return SendError(res, 500, "There is some error");
  }
};

const LoginUser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return SendError(res, 404, "All field are required.");
    }
    const FoundedUser = await User.findOne({ Email });
    if (!FoundedUser) {
      return SendError(res, 404, "You does not have an account");
    }
    const AccessToken = GenerateToken(
      FoundedUser._id.toString(),
      FoundedUser.Role,
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

    const RefreshToken = GenerateToken(
      FoundedUser._id.toString(),
      FoundedUser.Role,
      AuthConfig.RefreshSecretKey,
      AuthConfig.RefreshExpiry,
    );

    res.cookie("token", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30*24*60*60*1000,
    });
    return SendSuccess(res, 200, "User Found sucessfully", {
      User: FoundedUser,
      token: AccessToken,
    });
  } catch (error) {
    return SendError(res, 500, "There is some error");
  }
};

const GetMe = async (req: AuthRequest, res: Response) => {
  try {
    let { id } = req.User; // grab user's id  from middlewares responce
    const FoundedUser = await User.findById(id).select("-Password");
    if (!FoundedUser) {
      return SendError(
        res,
        400,
        "You does not have an account.Create account first.",
      );
    }
    return SendSuccess(res, 200, "Token Found.", { User: FoundedUser });
  } catch (error) {
    return SendError(res, 500, "There is some error");
  }
};

const Refresh = async (req: Request, res: Response) => {
  try {
    console.log("Cookie recived",req.cookies)
    let { token } = req.cookies;
    if (!token) {
      return SendError(res, 404, "You have not refresh token.");
    }
    const decoded = jwt.verify(token, AuthConfig.RefreshSecretKey) as {
      id: string;
    };
    const FoundedUser=await User.findById(decoded.id)
    
    if(!FoundedUser){
      return SendError(res,404,"You does't have account")
    }
    
    console.log("decoded")
    
    const AccessToken = GenerateToken(
      decoded.id,
      FoundedUser.Role,
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );
    console.log("generated")
    
    return SendSuccess(res, 200, "Token genrated successfully", {
      token: AccessToken,
      UserName: FoundedUser.FName
    });
  } catch (error) {
    res.clearCookie("token")
    console.error("❌ REFRESH ERROR DETAILS:", error);

    return SendError(res, 500, "There is some error in refreshing token.");
  }
};

export { RegisterUser, LoginUser, GetMe, Refresh };
