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
    let ExistingUser = await User.findOne({ Email });
    if (ExistingUser?.IsVerified) {
      return SendError(res, 409, "Account already exists.");
    }
    if (!ExistingUser) {
      ExistingUser = new User({ FName, LName, Email, Password, IsVerified: false });
      await ExistingUser.save();
    }

    return SendSuccess(res, 201, "Signup started. Request a verification code to continue.");
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
    if (FoundedUser.IsVerified === false) {
      return SendError(res, 403, "Verify your email before signing in.");
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
    const IsCrossSite = process.env.NODE_ENV === "production"
    res.cookie("token", RefreshToken, {
      httpOnly: true,
      secure: IsCrossSite,
      sameSite: IsCrossSite ? "none" : "lax",
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

    const AccessToken = GenerateToken(
      decoded.id,
      FoundedUser.Role,
      AuthConfig.AccessSecretKey,
      AuthConfig.AccessExpiry,
    );

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
    const IsCrossSite = process.env.NODE_ENV === "production"
    res.clearCookie("token", {
      httpOnly: true,
      secure: IsCrossSite,
      sameSite: IsCrossSite ? "none" : "lax",
    });

    return SendSuccess(res, 200, "Logged out successfully");

  } catch (error) {
    console.error("Logout error details:", error);
    return SendError(res, 500, "There is some error in refreshing token.");
  }
};

const RequestOTP = async (req: AuthRequest, res: Response) => {
  try {

    const { Email, Purpose = "reset" } = req.body
    
    if (!Email) {
      return SendError(res, 400, "Email is required.");
    }
    //verify user
    const Founded = await User.findOne({ Email })

    if (!Founded || (Purpose === "signup" && Founded.IsVerified !== false)) {
      return SendError(res, 404, "Your email seems incorrect.TRY AGAIN")
    }

    //genraate OTP
    const OTPCode = crypto.randomInt(100000, 1000000).toString()

    const ExpiresAt = Date.now() + 60 * 1000;

    await OTP.deleteMany({ Email, Purpose })

    await OTP.create({ Email, OTP: OTPCode, Purpose })

    const IsSignupVerification = Purpose === "signup";

    const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>${IsSignupVerification ? "Verify your ECOM Store account" : "Password Reset Request"}</h2>
          <p>Use the following 6-digit verification code to ${IsSignupVerification ? "complete your signup" : "reset your password"}:</p>
          <h1 style="background: #f4f4f4; padding: 10px 20px; display: inline-block; letter-spacing: 4px;">${OTPCode}</h1>
          <p>This code will expire in 60 seconds. If you didn't request this, ignore this email.</p>
        </div>
      `;
    //send Email
    await SendEmail(Email, IsSignupVerification ? "ECOM: Verify your email" : "ECOM: OTP-verification", emailHtml)

    return SendSuccess(res, 201, "OTP sent", { expiresAt: ExpiresAt })

  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}


const VerifyOTP = async (req: AuthRequest, res: Response) => {
  try {

    const { UserOTP, Email, Purpose = "reset" } = req.body
    
    if (!Email || !UserOTP || !["signup", "reset"].includes(Purpose)) {
      return SendError(res, 400, "Email, OTP, and a valid purpose are required.");
    }
    //verify token
    const Founded = await OTP.findOne({
      Email,
      OTP: UserOTP,
      Purpose,
      CreatedAt: { $gt: new Date(Date.now() - 60 * 1000) },
    })
    if (!Founded) {
      return SendError(res, 404, "Sorry Incorrect OTP")
    }

    if (Purpose === "signup") {
      const VerifiedUser = await User.findOneAndUpdate(
        { Email, IsVerified: false },
        { $set: { IsVerified: true } },
        { new: true },
      ).select("-Password");
      if (!VerifiedUser) {
        return SendError(res, 404, "Signup account was not found.");
      }

      await OTP.deleteOne({ _id: Founded._id });
      const AccessToken = GenerateToken(
        VerifiedUser._id.toString(),
        VerifiedUser.Role,
        AuthConfig.AccessSecretKey,
        AuthConfig.AccessExpiry,
      );
      const RefreshToken = GenerateToken(
        VerifiedUser._id.toString(),
        VerifiedUser.Role,
        AuthConfig.RefreshSecretKey,
        AuthConfig.RefreshExpiry,
      );
      const IsCrossSite = process.env.NODE_ENV === "production";
      res.cookie("token", RefreshToken, {
        httpOnly: true,
        secure: IsCrossSite,
        sameSite: IsCrossSite ? "none" : "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return SendSuccess(res, 200, "Email verified and account created.", {
        User: VerifiedUser,
        token: AccessToken,
      });
    }

    return SendSuccess(res, 200, "OTP verified")

  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}

const ResetPassword = async (req: AuthRequest, res: Response) => {
  try {
    const { NewPassword, Email, UserOTP } = req.body
    if (!NewPassword || !Email || !UserOTP) {
      return SendError(res, 400, "Email, OTP, and new password are required.");
    }

    const ValidOTP = await OTP.findOne({
      Email,
      OTP: UserOTP,
      Purpose: "reset",
      CreatedAt: { $gt: new Date(Date.now() - 60 * 1000) },
    });
    if (!ValidOTP) {
      return SendError(res, 400, "OTP is incorrect or has expired.");
    }

    const Success = await User.findOneAndUpdate({ Email: Email }, {
      $set: {
        Password: NewPassword
      }
    }, { new: true })
    if (!Success) {
      return SendError(res, 404, "Sorry Incorrect OTP")
    }
    await OTP.deleteOne({ _id: ValidOTP._id });
    return SendSuccess(res, 201, "Password changed.")
  } catch (error) {
    console.error(error)
    SendError(res, 500, "Internal Server Error")
  }
}

const ChangePassword = async (req: AuthRequest, res: Response) => {
  try {
    let userId = req.User.id

    const { NewPassword, CurrentPassword } = req.body

    const FoundedUser = await User.findById(userId)

    //check
    if (!FoundedUser) {
      return SendError(res, 404, "Incorrect Password")
    }
    if (FoundedUser.Password === CurrentPassword) {
      FoundedUser.Password = NewPassword
      SendSuccess(res, 201, "Password changed.")
    }
    else {
      SendError(res, 400, "Incorrect current password")

    }

  } catch (error) {

    console.error(error)

    SendError(res, 500, "Internal Server Error")

  }
}


export { RegisterUser, LoginUser, GetMe, Refresh, Logout, VerifyOTP, RequestOTP, ResetPassword, ChangePassword };
