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
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return SendError(res, 404, "All field are required.");
    }
    const ExistingUser = await User.findOne({ Email });
    if (ExistingUser) {
      return SendError(res, 500, "Account already exist.");
    }
    const NewUser = new User({ Name, Email, Password });
    await NewUser.save();

    const AccessToken = GenerateToken(
      NewUser._id.toString(),
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

    const RefreshToken = GenerateToken(
      NewUser._id.toString(),
      AuthConfig.RefreshSecretKey,
      AuthConfig.RefreshExpiry,
    );
    res.cookie("token", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
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
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

    const RefreshToken = GenerateToken(
      FoundedUser._id.toString(),
      AuthConfig.RefreshSecretKey,
      AuthConfig.RefreshExpiry,
    );

    res.cookie("refeshToken", RefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });
    return SendSuccess(res, 200, "User Found sucessfully", {
      User: FoundedUser,
      accessToken: AccessToken,
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
    let { token } = req.cookies;
    if (!token) {
      return SendError(res, 404, "You have not refresh token.");
    }
    const decoded = jwt.verify(token, AuthConfig.RefreshSecretKey) as {
      id: string;
    };

    const AccessToken = GenerateToken(
      decoded.id,
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

    return SendSuccess(res, 200, "Token genrated successfully", {
      AccessToken: AccessToken,
    });
  } catch (error) {
    return SendError(res, 500, "There is some error in refreshing token.");
  }
};

export { RegisterUser, LoginUser, GetMe, Refresh };
