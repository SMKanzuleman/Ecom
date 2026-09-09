
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ForgetPassword from "./ForgetPassword";
import { showErrorToast, showSuccessToast } from "../../Utils/toast";
import API from "../../Utils/API";
import axios from "axios";

export const ResetPassword = ({ setMenu }) => {
    const [ForgetPas, setForgetPass] = useState(false);
    const [Verified, setVerified] = useState(false);

    const [CurrPass, setCurrPass] = useState("");
    const [NewPass, setNewPass] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");

    const [Loading, setLoading] = useState(false);


    const [ShowPass, setShowPass] = useState({
        "curr": false,
        "new": false,
        "confirm": false
    });

    const toggle = (field: "curr" | "new" | "confirm") => {
        setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const HandleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!Verified) {
            showErrorToast("Enter your current password or click forget password.!");
            return;
        }
        if (NewPass !== ConfirmPass) {
            showErrorToast("Passwords do not match!");
            return;
        }
        try {
            const res = await API.post("/auth/reset-password", {
                NewPassword: NewPass
            });
            if (res.data) {
                showSuccessToast("Password changed successfully!");
                setLoading(true)
                setVerified(false);
                setNewPass("");
                setConfirmPass("");
                setMenu("Profile")
            }
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                showErrorToast(
                    error.response?.data?.message || "Error"
                );
            } else {
                showErrorToast("Error in updating password");
            }
        } finally {
            setLoading(false)
        }
    };


    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* Inner */}
            <div className="w-full max-w-1/2 flex flex-col bg-wh rounded-xl gap-10 pb-10">

                {/*Header Row*/}
                <div className="w-full flex justify-center p-10">
                    <span className="font-bold lg:text-3xl text-xl font-accent text-black">Reset Password </span>
                </div>

                <form className="flex flex-col relative gap-2 px-10 animate-fade-up  w-full">

                    {!ForgetPas ? (
                        <>
                            {!Verified && (
                                <>
                                    <label htmlFor="CurrPass" className="text-[14px] tracking-wider">Current Password</label>
                                    <input value={CurrPass} onChange={(e) => setCurrPass(e.target.value)} required={true} id="CurrPass" type={ShowPass.curr ? "text" : "password"} className="input-primary bg-wh border border-gray-700/30" />
                                    <button
                                        type="button"
                                        onClick={() => toggle("curr")}
                                        className="absolute right-15 top-11 text-gray-500 hover:text-black cursor-pointer"
                                    >
                                        {ShowPass.curr ? <FaEyeSlash /> : <FaEye />}
                                    </button>

                                    <div className="flex justify-end">
                                        <button type="button" onClick={() => setForgetPass(true)} className="text-black font-bold cursor-pointer">Forget Password?</button>
                                    </div>
                                </>
                            )}

                            {/* New pass */}

                            <label htmlFor="NewPass" className="text-[14px] tracking-wider">New Password:</label>
                            <input value={NewPass} onChange={(e) => setNewPass(e.target.value)} required={true} id="NewPass" type={ShowPass.new ? "text" : "password"} className="input-primary bg-wh border border-gray-700/30" />
                            <button
                                type="button"
                                onClick={() => toggle("new")}
                                className="absolute right-15 top-41 text-gray-500 hover:text-black cursor-pointer"
                            >
                                {ShowPass.new ? <FaEyeSlash /> : <FaEye />}
                            </button>

                            {/* Confirm Pass */}

                            <label htmlFor="ConfirmPass" className="text-[14px] tracking-wider">Confirm Password:</label>
                            <input value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} required={true} id="ConfirmPass" type={ShowPass.confirm ? "text" : "password"} className="input-primary bg-wh border border-gray-700/30" />
                            <button
                                type="button"
                                onClick={() => toggle("confirm")}
                                className="absolute right-15 top-63 text-gray-500 hover:text-black cursor-pointer"
                            >
                                {ShowPass.confirm ? <FaEyeSlash /> : <FaEye />}
                            </button>

                            {/* Submit + cancel */}

                            <div className="w-full flex justify-between items-center py-5">
                                <button type="submit"
                                    onClick={HandleResetPassword}
                                    disabled={Loading}
                                    className={`btn-primary w-full py-2 ${Loading && "bg-black/60"}`}
                                >{Loading ? "Saving" : "Save"}</button>
                            </div>
                        </>
                    ) : (

                        <ForgetPassword setMenu={setMenu} setVerified={setVerified} setForgetPass={setForgetPass} />
                    )}

                </form>




            </div>


        </div>


    )
}
