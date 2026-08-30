const ForgetPassword = () => {
    return (
        <div className="w-full flex flex-col">

            {/*Header Row*/}
            <div className="w-full flex justify-between p-5">
                <span className="font-bold lg:text-3xl text-xl font-accent text-black">Forget Password </span>
            </div>

            <form className="flex flex-col gap-2 px-5 animate-fade-up w-1/2">
                <label htmlFor="name" className="text-[14px] tracking-wider">Current Password</label>
                <input  required={true} id="name" type="text" className="input-primary bg-wh border border-gray-700/30" />
                <label htmlFor="phone" className="text-[14px] tracking-wider">New Password:</label>
                <input  required={true} id="phone" type="number" className="input-primary bg-wh border border-gray-700/30" />
                <label htmlFor="phone" className="text-[14px] tracking-wider">Confirm Password:</label>
                <input  required={true} id="phone" type="number" className="input-primary bg-wh border border-gray-700/30" />
                <div className="w-full flex justify-between items-center py-2">
                    <button className="btn-primary py-2  text-wh bg-red-600">cancel</button>
                    <button className="btn-primary py-2">save</button>
                </div>
            </form>




        </div>
    )
}

export default ForgetPassword