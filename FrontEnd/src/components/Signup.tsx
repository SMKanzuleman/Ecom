import axios from "axios";
import React, { useState } from "react";
import GoogleIcon from "../assets/Google_Symbol_1.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {

    const [SignEmail, setSignEmail] = useState("");
    const [SignPass, setSignPass] = useState("");
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [ShowPass, SetShowPass] = useState(false);
    const {  setToken } = useAuth();
    const Navigate = useNavigate()
    const Location = useLocation()
    const redirect = Location.state?.from || "/"
    const [SuccMsg, SetSuccMsg] = useState("");


    const HandleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:2026/auth/register", {
                FName: Fname,
                LName: Lname,
                Email: SignEmail,
                Password: SignPass,
            }, {withCredentials: true});
            if (res) {
                SetSuccMsg("Account Craeted successfully");
                console.log(res);
                setToken(res.data.token)
                setFname("");
                setLname("");
                setSignEmail("");
                setSignPass("");

                Navigate(redirect, { replace: true })

                setTimeout(() => {
                    SetSuccMsg("");
                    // sl(true); // 👈 Switches tab AFTER 2 seconds!
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
      <div className="w-full max-w-sm h-150 lg:h-125 lg:max-w-lg px-10 lg:px-0 py-16 border border-gray-400/20 rounded-2xl bg-white flex flex-col items-center justify-center animate-fade-up duration-500">

          {SuccMsg && (
              <div className="w-[80%] bg-emerald-100 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg text-sm font-medium mb-4 text-center">
                  {SuccMsg}
              </div>
          )}

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
                          required={true}
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
                  <button className="bg-black mt-2.5 w-[calc(100%-150px)] lg:w-[calc(100%-250px)] text-wh font-heading p-1.5 py-3 cursor-pointer rounded-full  hover:scale-[1.02]  transition-transform duration-200">
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
                  className="w-[70%] lg:w-[60%] flex justify-center items-center bg-black text-white font-heading py-3 px-2 gap-2 rounded-full  cursor-pointer hover:scale-[1.02] transition-transform duration-200"
              >
                  <img src={GoogleIcon} className="w-5 h-5" alt="" />
                  <span>SignUp with Google </span>
              </button>
          </div>

      </div>
  )
}

export default Signup