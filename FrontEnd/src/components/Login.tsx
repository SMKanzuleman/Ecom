import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "../assets/Google_Symbol_1.png";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";


const Login = () => {

    const [LoginPass, setLoginPass] = useState("");
    const [LoginEmail, setLoginEmail] = useState("");
    const [ShowPass, SetShowPass] = useState(false);
    const { Token, setToken,setName } = useAuth();

    const Navigate = useNavigate()

    const Location = useLocation()

    const redirect = Location.state?.from || "/"

    const HandleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (LoginEmail != "someone@gmail.com") {
                const responce = await axios.post("http://localhost:2026/auth/login", {
                    Email: LoginEmail,
                    Password: LoginPass,
                }, {withCredentials: true});
                if (responce) {
                    setToken(responce.data.token)
                    console.log("Token",responce.data.token)
                    setName(responce.data.User.FName)
                    console.log("Name",responce.data.User.FName)
                    setLoginEmail("");
                    setLoginPass("");
                    Navigate(redirect, { replace: true })
                }
            }
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

  return (
      <div className="w-full max-w-sm h-100 lg:h-125 py-16 border border-gray-400/20 rounded-2xl bg-white flex flex-col items-center justify-center animate-fade-up duration-500">

          <form
              onSubmit={HandleLogin}
              className="w-full max-w-62.5 flex flex-col justify-center items-center gap-5"
          >
              <div className=" w-full flex flex-col gap-2">
                  <label
                      htmlFor="loginemail"
                      className="text-sm text-black font-body"
                  >
                      Email <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                      onChange={(e) => {
                          setLoginEmail(e.target.value);
                      }}
                      onFocus={() => {
                          if (LoginEmail === "someone@gmail.com") setLoginEmail("");
                      }}
                      value={LoginEmail}
                      type="email"
                      autoComplete="username"
                      id="loginemail"
                      className=" w-full px-4 py-3 rounded-lg border-2 border-gray-950 outline-none focus:border-gray-500/50"
                  />
              </div>

              <div className="flex flex-col gap-2 w-full">
                  <label
                      htmlFor="loginpass"
                      className="text-sm text-black font-body"
                  >
                      Password <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className="relative">
                      <input
                          type={ShowPass ? "text" : "password"}
                          id="loginpass"
                          autoComplete="current-password"
                          value={LoginPass}
                          minLength={8}
                          onChange={(e) => {
                              setLoginPass(e.target.value);
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
  )
}

export default Login