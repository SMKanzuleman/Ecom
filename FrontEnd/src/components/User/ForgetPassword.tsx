import { useState } from "react";
import API from "../../Utils/API";
import { showErrorToast, showSuccessToast } from "../../Utils/toast";
import axios from "axios";

const ForgetPassword = ({setVerified, setForgetPass,setMenu}:any) => {

    const [CodeSent, setCodeSent] = useState(false);
    const [Email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");


    const [Loading, setLoading] = useState({
        "sendotp": false,
        "verifyotp": false
    });

    const ToggleLoading = (status: "sendotp" | "verifyotp") => {
        setLoading((prev) => ({ ...prev, [status]: !prev[status] }))
    }

    const HandleForgetPassword = async () => {
        if (!Email) {
            return showErrorToast("Please enter email")
        }
        try {
            ToggleLoading("sendotp") //true
            const res = await API.post("/auth/forget-password", { Email })
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
                setVerified(true)
                setForgetPass(false)
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

          
            <form className="flex flex-col relative gap-2 px-5 animate-fade-up  w-full">

                <label htmlFor="email" className="text-[14px] tracking-wider">Enter Email</label>
                <input value={Email} onChange={(e) => setEmail(e.target.value)} required={true} id="email" type="text" className="input-primary bg-wh border border-gray-700/30" />
                <div className="flex justify-between items-center">
                    <div className="text-xs text-black font-bold underline underline-offset-2 cursor-pointer"
                    onClick={()=>setMenu("Profile")}>Go back</div>
                    <button
                        type="button"
                        disabled={Loading.sendotp || CodeSent}
                        onClick={() => {
                            HandleForgetPassword()
                        }}
                        className={`btn-primary  ${Loading.sendotp ? "bg-black/50 cursor-not-allowed opacity-70" : ""
                            }`}>
                        {Loading.sendotp ? "Sending..." : "Send OTP"}
                    </button>
                </div>
                {CodeSent && (
                    <>
                        <label htmlFor="otp" className="text-[14px] tracking-wider">Enter OTP</label>
                        <input value={OTP} onChange={(e) => setOTP(e.target.value)} required={true} id="otp" type="text" className="input-primary bg-wh border border-gray-700/30" />
                        <div className="w-full flex justify-end items-center py-2">
                            <button
                                type="button"
                                disabled={Loading.verifyotp}
                                onClick={VerifyOTP}
                                className={`btn-primary py-2 ${Loading.verifyotp ? "bg-black/50 cursor-not-allowed opacity-70" : ""
                                    }`}>

                                {Loading.verifyotp ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </>

                )}




            </form>




        </div>
    )
}

export default ForgetPassword
