import { useState } from "react";

const ForgetPassword = () => {
    
    const [ForgetPassword, setForgetPassword] = useState(false);
    const [Verified, setVerified] = useState(false);
    const [CodeSent, setCodeSent] = useState(false);

    const [Email, setEmail] = useState("");
    const [OTP, setOTP] = useState("");
    const [CurrPass, setCurrPass] = useState("");
    const [NewPass, setNewPass] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");


    return (
        <div className="w-full flex flex-col">

            {/*Header Row*/}
            <div className="w-full flex justify-between p-5">
                <span className="font-bold lg:text-3xl text-xl font-accent text-black">Change Password </span>
            </div>

            <form className="flex flex-col gap-2 px-5 animate-fade-up lg:w-1/2 w-full">
                {!ForgetPassword ? (
                    <>
                        {!Verified && (<>
                            <label htmlFor="CurrPass" className="text-[14px] tracking-wider">Current Password</label>
                            <input value={CurrPass} onChange={(e)=>setCurrPass(e.target.value)} required={true} id="CurrPass" type="text" className="input-primary bg-wh border border-gray-700/30" />
                            <div className="flex justify-end">
                                <button type="button" onClick={() => setForgetPassword(true)} className="text-black font-bold cursor-pointer">Forget Password?</button>
                            </div>

                        </>)}
                        <label htmlFor="NewPass" className="text-[14px] tracking-wider">New Password:</label>
                        <input value={NewPass} onChange={(e)=>setNewPass(e.target.value)} required={true} id="NewPass" type="number" className="input-primary bg-wh border border-gray-700/30" />
                        <label htmlFor="ConfirmPass" className="text-[14px] tracking-wider">Confirm Password:</label>
                        <input value={ConfirmPass} onChange={(e)=>setConfirmPass(e.target.value)} required={true} id="ConfirmPass" type="number" className="input-primary bg-wh border border-gray-700/30" />
                        <div className="w-full flex justify-between items-center py-2">
                            <button type="button" className="btn-primary py-2  text-wh bg-red-600">cancel</button>
                            <button type="button" className="btn-primary py-2">save</button>
                        </div>
                    </>
                ) : (
                    <>
                        <label htmlFor="email" className="text-[14px] tracking-wider">Enter Email</label>
                        <input value={Email} onChange={(e)=>setEmail(e.target.value)} required={true} id="email" type="text" className="input-primary bg-wh border border-gray-700/30" />
                        <div className="flex justify-end">
                            <button type="button" onClick={() => setCodeSent(!CodeSent)} className="btn-primary">Send OTP </button>
                        </div>
                        {CodeSent && (
                            <>
                                <label htmlFor="otp" className="text-[14px] tracking-wider">Enter OTP</label>
                                <input value={OTP} onChange={(e)=>setOTP(e.target.value)} required={true} id="otp" type="text" className="input-primary bg-wh border border-gray-700/30" />
                                <div className="w-full flex justify-end items-center py-2">
                                    <button type="button" onClick={() => {
                                        setVerified(true)
                                        setForgetPassword(!ForgetPassword)
                                    }} className="btn-primary py-2">Verify</button>
                                </div>
                            </>


                        )}

                    </>
                )}

            </form>




        </div>
    )
}

export default ForgetPassword