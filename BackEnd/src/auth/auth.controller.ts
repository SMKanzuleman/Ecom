import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { Request, Response } from "express";
import { SendError, SendSuccess } from "../utils/responce";
import { AuthConfig, AuthRequest } from "../config/auth.config";
import { token } from "morgan";
import { OAuth2Client } from "google-auth-library";
import { GenerateToken } from "./utils";
import { SendEmail } from "../utils/sendmail";
import { OTP } from "./otp.model";

import crypto from "crypto"

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
    if (FoundedUser.Password !== Password) {
      return SendError(res, 400, "Enter valid credientials");

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
      maxAge: 30 * 24 * 60 * 60 * 1000,
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
    console.log("Cookie recived", req.cookies)
    let { token } = req.cookies;
    if (!token) {
      return SendError(res, 404, "You have not refresh token.");
    }
    const decoded = jwt.verify(token, AuthConfig.RefreshSecretKey) as {
      id: string;
    };
    const FoundedUser = await User.findById(decoded.id)

    if (!FoundedUser) {
      return SendError(res, 404, "You does't have account")
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

const Logout = async (req: Request, res: Response) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: AuthConfig.NODE_ENV === "production",
      sameSite: "lax"
    });

    return SendSuccess(res, 200, "Logged out successfully");

  } catch (error) {
    console.error("Logout error details:", error);
    return SendError(res, 500, "There is some error in refreshing token.");
  }
};

const ForgetPassword = async (req: AuthRequest, res: Response) => {
  try {

    const { Email } = req.body
    //verify user
    const Founded = await User.findOne({ Email })
    if (!Founded) {
      SendError(res, 404, "Your email seems incorrect.TRY AGAIN")
    }
    //genraate OTP
    const OTPCode = crypto.randomInt(100000, 1000000).toString()

    await OTP.deleteMany({ Email })

    await OTP.create({ Email, OTP: OTPCode })

    const emailHtml = `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Password Reset Request</h2>
                <p>Use the following 6-digit verification code to reset your password:</p>
                <h1 style="background: #f4f4f4; padding: 10px 20px; display: inline-block; letter-spacing: 4px;">${OTPCode}</h1>
                <p>This code will expire in 60 seconds. If you didn't request this, ignore this email.</p>
            </div>
        `;
    //send Email
    await SendEmail(Email, "ECOM: OTP-verification", emailHtml)

    SendSuccess(res, 201, "OTP sent")

  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}
const VerifyOTP = async (req: AuthRequest, res: Response) => {
  try {

    const { UserOTP, Email } = req.body
    //verify token
    const Founded = await OTP.findOne({ Email, OTP: UserOTP })
    if (!Founded) {
      SendError(res, 404, "Sorry Incorrect OTP")
    }

    SendSuccess(res, 201, "OTP verified")

  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}

const ResetPassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.User.id
    const { NewPassword } = req.body
    const Success = await User.findByIdAndUpdate(userId, {
      $set: {
        Password: NewPassword
      }
    })
    if (!Success) {
      SendError(res, 404, "Sorry Incorrect OTP")
    }
    SendSuccess(res, 201, "Password changed.")
  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}





export { RegisterUser, LoginUser, GetMe, Refresh, Logout, VerifyOTP, ForgetPassword, ResetPassword };
