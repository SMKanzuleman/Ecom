import axios from "axios";
import React, { useState } from "react";

import GoogleIcon from "../assets/Google_Symbol_2.webp";

export const Auth = () => {

    const [isLogin, setLogin] = useState(true);

    const [Email, setEmail] = useState("someone@gmail.com");

    const [Fname, setFname] = useState("Steve");

    const [Lname, setLname] = useState("");

    const [Pass, setPass] = useState("");

    const HandleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const responce = await axios.post("http://localhost:2026/auth/login", {
                Email: Email,
                Password: Pass,
            });
            if (responce) {
                alert("Login successfuly");
                console.log(responce);
            }
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

    const HandleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:2026/auth/register", {
                FName: Fname,
                LName: Lname,
                Email: Email,
                Password: Pass,

            })
            if (res) {
                alert("account created successfully")
                console.log(res);

            }

        } catch (error) {
            console.error(error)

        }
    }


    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">

            <div className="relative w-full max-w-50 bg-wh shadow-2xl border-gray-700/80 rounded-lg mb-16 flex justify-evenly p-1">
                <div
                    className={`absolute w-[calc(50%-4px)] left-1 top-1 bottom-1 bg-black rounded-lg transition-transform duration-300 ease-out py-2 ${isLogin ? "translate-x-0" : "translate-x-full"}`}
                ></div>
                <button
                    onClick={() => {
                        setLogin(true);
                    }}
                    className={`z-10 w-1/2 py-2 cursor-pointer font-heading  ${isLogin ? "text-white" : "text-black"}`}
                >
                    Login
                </button>
                <button
                    onClick={() => {
                        setLogin(false);
                    }}
                    className={`z-10 w-1/2 py-2 cursor-pointer font-heading  ${isLogin ? "text-black" : "text-white"}`}
                >
                    SignUp
                </button>
            </div>

            {isLogin ? (
                <div className="w-full max-w-sm py-16 border border-gray-400/20 rounded-2xl bg-white flex flex-col items-center justify-center">
                    <form
                        onSubmit={HandleLogin}
                        className="w-full max-w-62.5 flex flex-col justify-center items-center gap-5"
                    >
                        <div className=" w-full flex flex-col gap-2">
                            <label htmlFor="e" className="text-sm text-black font-body">
                                Email <span className="text-red-600 font-bold">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                onFocus={() => {
                                    if (Email === "someone@gmail.com") setEmail("");
                                }}
                                value={Email}
                                type="email"
                                id="e"
                                className=" w-full px-4 py-3 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="p" className="text-sm text-black font-body">
                                Password <span className="text-red-600 font-bold">*</span>
                            </label>
                            <input
                                type="password"
                                id="p"
                                value={Pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                className=" w-full px-4 py-3 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="bg-black w-[calc(100%-150px)] text-wh font-heading p-1.5 py-3 cursor-pointer rounded-full  hover:scale-[1.02]  transition-transform duration-200">
                                Login
                            </button>
                        </div>
                    </form>

                    {/*Login with Google*/}

                    <div className="w-full flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "http://localhost:2026/auth/google";
                            }}
                            className="w-[60%] flex justify-center items-center bg-black text-white font-heading py-3 px-2 gap-2 rounded-full  cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                        >
                            <img src={GoogleIcon} className="w-5 h-5" alt="" />
                            <span>Login with Google </span>
                        </button>
                    </div>
                </div>
            ) : (

                <div className="w-full max-w-lg py-16 border border-gray-400/20 rounded-2xl bg-white flex flex-col items-center justify-center">
                    <form
                        onSubmit={HandleSignUp}
                        className="w-full max-w-103 flex flex-col justify-center items-center gap-3.5"
                    >
                        <div className="w-full flex gap-2.5 ">

                            <div className=" w-1/2 flex flex-col gap-2">
                                <label htmlFor="e" className="text-sm text-black font-body">
                                    First Name<span className="text-red-600 font-bold">*</span>
                                </label>

                                <input
                                    onChange={(e) => {
                                        setFname(e.target.value);
                                    }}
                                    onFocus={() => {
                                        if (Fname === "Steve") setFname("");
                                    }}
                                    value={Fname}
                                    id="e"
                                    className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                                />
                            </div>

                            <div className=" w-1/2 flex flex-col gap-2">
                                <label htmlFor="e" className="text-sm text-black font-body">
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
                                    id="e"
                                    className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                                />
                            </div>

                        </div>
                        <div className=" w-full flex flex-col gap-2">
                            <label htmlFor="e" className="text-sm text-black font-body">
                                Email <span className="text-red-600 font-bold">*</span>
                            </label>
                            <input
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                onFocus={() => {
                                    if (Email === "someone@gmail.com") setEmail("");
                                }}
                                value={Email}
                                type="email"
                                id="e"
                                className=" w-full px-2 py-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="p" className="text-sm text-black font-body">
                                Password <span className="text-red-600 font-bold">*</span>
                            </label>
                            <input
                                type="password"
                                id="p"
                                value={Pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                                className=" w-full p-2 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <button className="bg-black mt-2.5 w-[calc(100%-250px)] text-wh font-heading p-1.5 py-3 cursor-pointer rounded-full  hover:scale-[1.02]  transition-transform duration-200">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/*Signup with Google*/}

                    <div className="w-full flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "http://localhost:2026/auth/google";
                            }}
                            className="w-[60%] flex justify-center items-center bg-black text-white font-heading py-3 px-2 gap-2 rounded-full  cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                        >
                            <img src={GoogleIcon} className="w-5 h-5" alt="" />
                            <span>SignUp with Google </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
