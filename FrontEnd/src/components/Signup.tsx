import React, { useEffect, useState } from "react";
import GoogleIcon from "../assets/Google_Symbol_1.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../Utils/API";
import { showErrorToast, showSuccessToast } from "../Utils/toast";

const Signup = () => {

    const [SignEmail, setSignEmail] = useState("");
    const [SignPass, setSignPass] = useState("");
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [ShowPass, SetShowPass] = useState(false);
    const { setToken,setName } = useAuth();
    const Navigate = useNavigate()
    const Location = useLocation()
    const redirect = Location.state?.from || "/"
    const [OtpCode, setOtpCode] = useState("");
    const [CodeSent, setCodeSent] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [OtpExpiresAt, setOtpExpiresAt] = useState<number | null>(null);
    const [SecondsRemaining, setSecondsRemaining] = useState(0);

    useEffect(() => {
        if (!OtpExpiresAt) return;

        const UpdateCountdown = () => {
            setSecondsRemaining(Math.max(0, Math.ceil((OtpExpiresAt - Date.now()) / 1000)));
        };
        UpdateCountdown();
        const Timer = window.setInterval(UpdateCountdown, 1000);
        return () => window.clearInterval(Timer);
    }, [OtpExpiresAt]);


    const RequestVerificationCode = async () => {
        try {
            setIsLoading(true);
            const res = await API.post("/auth/request-OTP", { Email: SignEmail, Purpose: "signup" });
            setOtpExpiresAt(res.data.expiresAt);
            setOtpCode("");
            setCodeSent(true);
            showSuccessToast("Verification code sent to your email");
        } catch (error: any) {
            console.error(error);
            showErrorToast(error.response?.data?.message || "Could not send verification code");
        } finally {
            setIsLoading(false);
        }
    };

    const HandleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        const StartSignup = async () => {
            try {
                setIsLoading(true);
                await API.post("/auth/register", {
                    FName: Fname,
                    LName: Lname,
                    Email: SignEmail,
                    Password: SignPass,
                });
                await RequestVerificationCode();
            } catch (error: any) {
                console.error(error);
                showErrorToast(error.response?.data?.message || "Could not start signup");
            } finally {
                setIsLoading(false);
            }
        };
        void StartSignup();
    };

    const VerifySignupCode = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await API.post("/auth/verify-otp", {
                Email: SignEmail,
                UserOTP: OtpCode,
                Purpose: "signup",
            });
            setToken(res.data.token);
            setName(res.data.User.FName);
            showSuccessToast("Email verified. Your account is ready.");
            Navigate(redirect, { replace: true });
            
        } catch (error: any) {
            console.error(error);
            showErrorToast(error.response?.data?.message || "Could not verify code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm min-h-100 lg:min-h-125 lg:max-w-lg px-10 lg:px-0 py-12 border border-gray-400/20 rounded-2xl bg-white flex flex-col items-center justify-center animate-fade-up duration-500">
            {CodeSent ? (
                <form
                    onSubmit={VerifySignupCode}
                    className="w-full max-w-103 flex flex-col justify-center items-center gap-5"
                >
                    <div className="w-full text-center">
                        <h2 className="font-heading text-xl text-black">Verify your email</h2>
                        <p className="mt-2 text-sm text-gray-600">We sent a 6-digit code to {SignEmail}</p>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="signup-otp" className="text-sm text-black font-body">Verification code</label>
                        <input
                            id="signup-otp"
                            value={OtpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            required
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50 text-center tracking-[0.4em]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={IsLoading || OtpCode.length !== 6}
                        className="bg-black w-full text-white font-heading py-3 cursor-pointer rounded-full hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {IsLoading ? "Verifying..." : "Verify and create account"}
                    </button>
                    
                    <div className="w-full flex justify-between text-sm">
                        <span className="text-gray-600" aria-live="polite">
                            {SecondsRemaining > 0 ? `Resend in 00:${String(SecondsRemaining).padStart(2, "0")}` : "Code expired"}
                        </span>
                        <button type="button" disabled={IsLoading || SecondsRemaining > 0} onClick={() => void RequestVerificationCode()} className="underline underline-offset-2 disabled:opacity-50 disabled:no-underline">
                            {IsLoading ? "Sending..." : "Resend code"}
                        </button>
                    </div>
                </form>
            ) : (
            <form
                onSubmit={HandleSignUp}
                className="w-full max-w-103 flex flex-col justify-center items-center gap-3.5"
            >
                <div className="w-full flex lg:flex-row flex-col lg:gap-2.5 gap-3.5 ">
                    <div className="w-full lg:w-1/2 flex flex-col gap-2">
                        <label htmlFor="fname" className="text-sm text-black font-body">
                            First Name<span className="text-red-600 font-bold">*</span>
                        </label>

                        <input
                            onChange={(e) => {
                                setFname(e.target.value);
                            }}
                            onFocus={() => {
                                if (Fname === "Steve") setFname("");
                            }}
                            required
                            value={Fname}
                            id="fname"
                            autoComplete="given-name"
                            className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                        />
                    </div>

                    <div className=" w-full lg:w-1/2 flex flex-col gap-2">
                        <label htmlFor="lname" className="text-sm text-black font-body">
                            Last Name
                        </label>
                        <input
                            onChange={(e) => {
                                setLname(e.target.value);
                            }}
                            onFocus={() => {
                                if (Lname === "Smith") setLname("");
                            }}
                            value={Lname}
                            id="lname"
                            autoComplete="family-name"
                            className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                        />
                    </div>
                </div>

                <div className=" w-full flex flex-col gap-2">
                    <label htmlFor="smail" className="text-sm text-black font-body">
                        Email <span className="text-red-600 font-bold">*</span>
                    </label>
                    <input
                        onChange={(e) => {
                            setSignEmail(e.target.value);
                        }}
                        onFocus={() => {
                            if (SignEmail === "someone@gmail.com") setSignEmail("");
                        }}
                        value={SignEmail}
                        type="email"
                        required
                        id="smail"
                        autoComplete="email"
                        className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                    />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="spass" className="text-sm text-black font-body">
                        Password <span className="text-red-600 font-bold">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={ShowPass ? "text" : "password"}
                            id="spass"
                            required
                            value={SignPass}
                            autoComplete="new-password"
                            minLength={8}
                            onChange={(e) => {
                                setSignPass(e.target.value);
                            }}
                            className=" w-full p-2 pr-5 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                SetShowPass(!ShowPass);
                            }}
                            className="absolute right-5 top-3"
                        >
                            {ShowPass ? (
                                <FaRegEyeSlash className="text-black font-extrabold" />
                            ) : (
                                <FaRegEye className="text-black font-extrabold" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <button disabled={IsLoading} className="bg-black mt-2.5 w-[calc(100%-150px)] lg:w-[calc(100%-250px)] text-wh font-heading p-1.5 py-3 cursor-pointer rounded-full hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50">
                        {IsLoading ? "Sending code..." : "Sign Up"}
                    </button>
                </div>

            </form>
            )}

            {/*Signup with Google*/}

            {!CodeSent && <div className="w-full flex justify-center mt-10">
                <button
                    type="button"
                    onClick={() => {
                        window.location.href = "http://localhost:2026/auth/google";
                    }}
                    className="w-[70%] lg:w-[60%] flex justify-center items-center bg-black text-white font-heading py-3 px-2 gap-2 rounded-full  cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                >
                    <img src={GoogleIcon} className="w-5 h-5" alt="" />
                    <span>SignUp with Google </span>
                </button>
            </div>}

        </div>
    )
}

export default Signup