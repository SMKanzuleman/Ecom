import { FaCartShopping } from "react-icons/fa6";
import { IoMdTrendingUp } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { FaHamburger } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import logo from '../assets/logo.svg'

import HeroImg from "../assets/HeroImg-remove-bg-io (3).webp";
import { useState } from "react";
import { DiVim } from "react-icons/di";
const Home = () => {

    const [SearcchOpen, setSearchOpen] = useState(false)
    const [HamBOpen, setHamBOpen] = useState(false)
    const [Closing, setClosing] = useState(false)

    return (
        <div>

            <div className="w-full bg-wh flex min-h-[10vh]">

                <div className="lg:w-[20%] w-[40%] flex items-center lg:justify-end justify-center gap-5 px-1 bg-amber-00">
                    <GiHamburgerMenu className="text-black text-3xl lg:hidden " onClick={() => {
                        setHamBOpen(!HamBOpen)
                        console.log("CLicked");

                    }} />
                    <img src={logo} alt="Logo" className="h-9 w-auto cursor-pointer" />
                </div>

                {HamBOpen && (
                    <div className={`fixed top-0 left-0 w-[70%] bg-bg min-h-screen z-10 ${Closing? "animate-slide-out" : "animate-slide-in"}`}>
                        <div className="w-full flex min-h-[100px]">

                            <div className="w-[70%] bg-amber-00 flex items-center pl-14">
                                <img src={logo} alt="Logo" className="h-9 w-auto cursor-pointer" />

                            </div>
                            <div className="w-[30%] bg-amber-00 flex justify-center items-center">
                                <MdClear className="text-4xl font-bold text-black" onClick={() => {
                                    setClosing(true)
                                    setTimeout(() => {
                                        setClosing(false)
                                        setHamBOpen(!setHamBOpen)
                                    }, 300);
                                }} />

                            </div>

                        </div>
                        <div className="w-full flex flex-col justify-center items-start pl-24 pt-20 gap-8 text-black text-2xl  font-heading ">
                            <a href="#" className=" hover:text-text transition-transform duration-1000 ">Shop</a>
                            <a href="#" className=" hover:text-text transition-transform duration-1000 ">OnSale</a>
                            <a href="#" className=" hover:text-text transition-transform duration-1000 ">New Arrival</a>
                            <a href="#" className=" hover:text-text transition-transform duration-1000 ">Brands</a>
                        </div>

                        <div className="absolute bottom-8 left-0 w-full px-6 flex items-center justify-center">
                            <span className="text-xs font-body text-black uppercase tracking-wider pt-4 w-full text-center">
                                <span className="font-heading text-3xl text-black font-semibold tracking-tight lowercase">Shop</span> with confidence
                            </span>
                        </div>



                    </div>
                )}

                <div id="navlinks" className="w-[15%] lg:w-[40%] hidden sm:flex ">

                    <div className="w-full flex justify-center items-center gap-8 text-black font-heading ">
                        <a href="#" className="hover:text-text transition-transform duration-1000 ">Shop</a>
                        <a href="#" className="hover:text-text transition-transform duration-1000 ">OnSale</a>
                        <a href="#" className="hover:text-text transition-transform duration-1000 ">New Arrival</a>
                        <a href="#" className="hover:text-text transition-transform duration-1000 ">Brands</a>
                    </div>


                </div>

                <div className="hidden sm:flex w-[15%] lg:w-[20%]  items-center">
                    <div className="w-full relative">
                        <HiOutlineSearch className="absolute left-4 top-3 text-black" />
                        <input type="text" placeholder="Search for Products" className=" w-full px-10 py-2 rounded-4xl outline-none  bg-bg" />
                    </div>
                </div>

                {SearcchOpen ? <div className=" w-[60%]  lg:w-[20%] flex items-center justify-center gap-5 px-5 bg-amber-00 relative">
                    <div className="w-full relative">
                        <HiOutlineSearch className="absolute left-4 top-3 text-black" />
                        <MdClear className="absolute top-2 right-4 text-2xl text-red-600" onClick={() => { setSearchOpen(!setSearchOpen) }} />
                        <input type="text" placeholder="Search..." className=" w-full px-10 py-2 rounded-4xl outline-none  bg-bg" />
                    </div>

                </div> : <div className=" w-[60%] lg:w-[20%] flex items-center justify-center gap-5 pl-16 bg-amber-00 relative">
                    <HiOutlineSearch onClick={() => { setSearchOpen(!SearcchOpen) }} className=" text-black text-3xl font-bold lg:hidden" />
                    <RiAccountPinCircleFill className="text-3xl text-black cursor-pointer hover:scale-120 transition-transform duration-200" />
                    <FaCartShopping className="text-black text-3xl cursor-pointer hover:scale-120 transition-transform duration-200" />

                </div>}



            </div>














            
            <div
                id="HeroSection"
                className="w-full lg:min-h-[80vh] min-h-fit  bg-wh   flex flex-col lg:flex-row "
            >
                <div
                    id="left"
                    className="lg:w-[55%] w-full flex flex-col items-left justify-center lg:px-32 px-6 gap-6"
                >
                    <h1 className="text-6xl font-CF font-extrabold tracking-tight">
                        Clothes that match your stylee.
                    </h1>
                    <p className="text-justify">
                        Browse through our diverse range of meticulously crafted garments,
                        designed to bring out your individuality and cater to your sense of
                        style.
                    </p>
                    <div className="flex lg:gap-4 gap-2">
                        <button className="btn-primary w-45 lg:w-[30%]">
                            <FaCartShopping />
                            Shop
                        </button>
                        <button className="btn-primary w-45 lg:w-[30%]">
                            <IoMdTrendingUp />
                            Trending
                        </button>
                    </div>
                </div>
                <div
                    id="right"
                    className="relative lg:w-[45%] w-full  flex flex-col justify-end"
                >
                    <img src={HeroImg} alt="" className="w-full" />
                    <RiGeminiFill className="absolute lg:top-24 top-16 lg:right-36 right-70 text-black text-6xl" />
                </div>
            </div>


        </div>
    );
};

export default Home;
