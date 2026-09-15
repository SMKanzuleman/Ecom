import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API, { APIERROR } from "../../Utils/API";
import { showErrorToast, showSuccessToast } from "../../Utils/toast";
import axios from "axios";

const ResetPassword = ({ setMenu }: any) => {


    const [CodeSent, setCodeSent] = useState(false);
    const [Email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");

    const [OTPVerified, setOTPVerified] = useState(false);

    const [NewPass, setNewPass] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");
    const [Saving, setSaving] = useState(false);

    const [ShowPass, setShowPass] = useState({
        new: false,
        confirm: false,
    });


    const [Loading, setLoading] = useState({
        "sendotp": false,
        "verifyotp": false
    });

    const ToggleLoading = (status: "sendotp" | "verifyotp") => {
        setLoading((prev) => ({ ...prev, [status]: !prev[status] }))
    }

    const toggle = (field: "new" | "confirm") => {
        setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const HandleResetPassword = async () => {

        if (!NewPass || !ConfirmPass) {
            showErrorToast("Enter and confirm your new password");
            return;
        }

        if (NewPass !== ConfirmPass) {
            showErrorToast("Passwords do not match");
            return;
        }

        try {
            setSaving(true);
            const res = await API.post("/auth/reset-password", { NewPassword: NewPass,Email });
            if (res.data) {
                showSuccessToast("Password changed successfully");
                setNewPass("");
                setConfirmPass("");
                setMenu("Profile");
            }
        } catch (error) {
            console.error(error);
            APIERROR(error, "Failed to change password")
        } finally {
            setSaving(false);
        }
    };

    const HandleRequestOTP = async () => {
        if (!Email) {
            return showErrorToast("Please enter email")
        }
        try {
            ToggleLoading("sendotp") //true
            const res = await API.post("/auth/request-OTP", { Email })
            if (res.data) {
                showSuccessToast("OTP sent")
                setCodeSent(true)
            }
        } catch (error) {
            console.error(error)
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message || "Failed to send OTP"
                );
            } else {
                showErrorToast("Failed to send OTP");
            }
        }
        finally {
            ToggleLoading("sendotp") //false
        }
    }

    const VerifyOTP = async () => {
        if (!OTP) {
            return showErrorToast("Enter OTP first.")
        }
        try {
            ToggleLoading("verifyotp") //true
            const res = await API.post("/auth/verify-otp", { Email, UserOTP: OTP })
            if (res.data) {
                showSuccessToast("OTP veridifed")
                setOTPVerified(true)
            }
        } catch (error) {
            console.error(error)
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message || "Failed to verify OTP"
                );
            } else {
                showErrorToast("Failed to verify OTP");
            }
        }
        finally {
            ToggleLoading("verifyotp") //false
        }
    }

    return (
        <div className="w-full flex flex-col">

            {OTPVerified ? (

                <form className="flex flex-col relative gap-2 px-5 animate-fade-up w-full">
                    <label htmlFor="NewPass" className="text-[14px] tracking-wider">New Password</label>
                    <input value={NewPass} onChange={(e) => setNewPass(e.target.value)} required id="NewPass" type={ShowPass.new ? "text" : "password"} className="input-primary bg-wh border border-gray-700/30" />
                    <button
                        type="button"
                        onClick={() => toggle("new")}
                        className="absolute right-15 top-11 text-gray-500 hover:text-black cursor-pointer"
                    >
                        {ShowPass.new ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <label htmlFor="ConfirmPass" className="text-[14px] tracking-wider">Confirm Password</label>
                    <input value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} required id="ConfirmPass" type={ShowPass.confirm ? "text" : "password"} className="input-primary bg-wh border border-gray-700/30" />
                    <button
                        type="button"
                        onClick={() => toggle("confirm")}
                        className="absolute right-15 top-29 text-gray-500 hover:text-black cursor-pointer"
                    >
                        {ShowPass.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    <div className="w-full flex justify-between items-center py-5">
                        <button type="submit" disabled={Saving} className={`btn-primary w-full py-2 ${Saving ? "bg-black/60" : ""}`}
                            onClick={(e) => {
                                e.preventDefault()
                                HandleResetPassword()
                            }}>
                            {Saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>

            ) : (
                <form className="flex flex-col relative gap-2 px-5 animate-fade-up  w-full">

                    <label htmlFor="email" className="text-[14px] tracking-wider">Enter Email</label>
                    <input value={Email} onChange={(e) => setEmail(e.target.value)} required={true} id="email" type="text" className="input-primary bg-wh border border-gray-700/30" />

                    <div className="flex justify-between items-center">
                        <div className="text-xs text-black font-bold underline underline-offset-2 cursor-pointer"
                            onClick={() => setMenu("Profile")}>Go back</div>
                        <button
                            type="button"
                            disabled={Loading.sendotp || CodeSent}
                            onClick={() => {
                                HandleRequestOTP()
                            }}
                            className={`btn-primary  ${Loading.sendotp ? "bg-black/50 cursor-not-allowed opacity-70" : ""
                                }`}>
                            {Loading.sendotp ? "Sending..." : "Send OTP"}
                        </button>
                    </div>
                    {
                        CodeSent && (
                            <>
                                <label htmlFor="otp" className="text-[14px] tracking-wider">Enter OTP</label>
                                <input value={OTP} onChange={(e) => setOTP(e.target.value)} required={true} id="otp" type="text" className="input-primary bg-wh border border-gray-700/30" />
                                <div className="w-full flex justify-end items-center py-2">
                                    <button
                                        type="button"
                                        disabled={Loading.verifyotp}
                                        onClick={() => {
                                            VerifyOTP()
                                        }}
                                        className={`btn-primary py-2 ${Loading.verifyotp ? "bg-black/50 cursor-not-allowed opacity-70" : ""
                                            }`}>
                                        {Loading.verifyotp ? "Verifying..." : "Verify OTP"}
                                    </button>
                                </div>
                            </>
                        )
                    }

                </form >


            )}






        </div >
    )
}

export default ResetPassword
