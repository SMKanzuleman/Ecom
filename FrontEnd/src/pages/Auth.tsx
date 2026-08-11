
import { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

export const Auth = () => {
    
    const [isLogin, setLogin] = useState(true); 

    return (
        <div className="w-full h-[90vh] flex flex-col items-center justify-center">

            <div className="relative w-full max-w-50 bg-wh shadow-2xl border-gray-700/80 rounded-lg mb-16 flex justify-evenly p-1">
                    <div
                        className={`absolute w-[calc(50%-4px)] left-1 top-1 bottom-1 bg-black rounded-lg transition-transform animate-fade-up py-2 ${isLogin ? "translate-x-0" : "translate-x-full"}`}
                    ></div>
                    <button
                        onClick={() => {
                            setLogin(true);
                        }}
                        className={`z-10 w-1/2 py-2 cursor-pointer font-heading  ${isLogin ? "text-white" : "text-black animate-fade-up"}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            setLogin(false);
                        }}
                        className={`z-10 w-1/2 py-2 cursor-pointer font-heading  ${isLogin ? "text-black" : "text-white animate-fade-up"}`}
                    >
                        SignUp
                    </button>
            </div>
                
             {isLogin ? (<Login />) : (<Signup/>)}
        </div>
    );
};
