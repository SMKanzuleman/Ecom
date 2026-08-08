import { FaCartShopping } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import logo from '../assets/logo.svg'
import br1 from '../assets/zara.svg'
import br3 from '../assets/prada-logo-1 1.svg'
import br4 from '../assets/Group (2).svg'
import br5 from '../assets/Group (1).svg'

import HeroImg from "../assets/HeroImg-remove-bg-io (3).webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImInsertTemplate } from "react-icons/im";
const Home = () => {

    const [SearcchOpen, setSearchOpen] = useState(false)
    const [HamBOpen, setHamBOpen] = useState(false)
    const [Closing, setClosing] = useState(false)
    const [Products, setProducts] = useState<any>([])
    const [ShowAll, SetShowAll] = useState(false)

    const FetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:2026/products")
            if (res.data.AllProducts) {
                setProducts(res.data.AllProducts)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        FetchProducts()
    }, [])

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
                    <div className={`fixed top-0 left-0 w-[70%] bg-bg min-h-screen z-10 ${Closing ? "animate-slide-out" : "animate-slide-in"}`}>
                        <div className="w-full flex min-h-25">

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

            <div className="w-full bg-black py-8 overflow-hidden flex items-center">

                <div className="animate-marquee  flex items-center gap-16 lg:gap-32 shrink-0">


                    <img src={br1} alt="Zara" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br3} alt="Prada" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br4} alt="Calvin Klein" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br5} alt="Versace" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br1} alt="Zara" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br3} alt="Prada" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br4} alt="Calvin Klein" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br5} alt="Versace" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br1} alt="Zara" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br3} alt="Prada" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br4} alt="Calvin Klein" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br5} alt="Versace" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br1} alt="Zara" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br3} alt="Prada" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br4} alt="Calvin Klein" className="h-6 lg:h-8 w-auto object-contain" />
                    <img src={br5} alt="Versace" className="h-6 lg:h-8 w-auto object-contain" />

                </div>
            </div>

            <div className="w-full bg-wh min-h-[60vh] flex flex-col">
                <div className="w-full font-heading text-4xl uppercase text-black font-bold pt-32 pb-20 text-center">New arrivals</div>

                <div className="grid grid-cols-1 lg:grid-cols-4 px-6 lg:px-16 justify-items-center">

                    {Products.filter((item: any) => item.Tags.includes("new_arrival")).slice(0, ShowAll ? Products.length : 4).map((item: any) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id} >
                                <div key={item._id} className="w-[250px] h-96 animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
                                    <img src={logo} alt="" className="w-full bg-bg p-5 rounded-4xl " />
                                    <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                                    <div className="flex justify-between px-3 py-1">
                                        <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map((index) => {
                                                if (item.Rating >= index) {
                                                    return (<FaStar className="text-yellow-400" />)
                                                }
                                                else if (item.Rating >= index - 0.5) {
                                                    return (<FaStarHalfAlt className="text-yellow-400" />)
                                                }
                                                else {
                                                    return (<FaRegStar />)
                                                }
                                            })}

                                        </div>
                                    </div>
                                </div>



                            </Link>

                        )
                    })}


                </div>
                <div className="w-full flex justify-center">

                    <button className={`btn-primary w-[10%] ${Products.length <= 4 ? "hidden" : "block"} `} onClick={() => {
                        SetShowAll(!ShowAll)
                    }}>{ShowAll ? "Show less" : "Show All"}</button>
                </div>
            </div>

            <div className="w-full bg-wh min-h-[50vh] flex flex-col">
                <div className="w-full font-heading text-4xl uppercase text-black font-bold p-20 text-center">Top Selling</div>

                <div className="grid grid-cols-1 lg:grid-cols-4 px-6 lg:px-16 justify-items-center">



                    {Products.filter((item: any) => item.Tags.includes("top_selling")).slice(0, ShowAll ? Products.length : 4).map((item: any) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id}>
                                <div key={item._id} className="w-[250px] h-96 animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
                                    <img src={logo} alt="" className="w-full bg-bg p-5 rounded-4xl " />
                                    <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                                    <div className="flex justify-between px-3 py-1">
                                        <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4, 5].map((index) => {
                                                if (item.Rating >= index) {
                                                    return (<FaStar className="text-yellow-400" />)
                                                }
                                                else if (item.Rating >= index - 0.5) {
                                                    return (<FaStarHalfAlt className="text-yellow-400" />)
                                                }
                                                else {
                                                    return (<FaRegStar />)
                                                }
                                            })}

                                        </div>
                                    </div>
                                </div>

                            </Link>

                        )
                    })}


                </div>
                <div className="w-full flex justify-center">

                    <button className={`btn-primary w-[10%] ${Products.length <= 4 ? "hidden" : "block"}`} onClick={() => {
                        SetShowAll(!ShowAll)
                    }}>{ShowAll ? "Show less" : "Show All"}</button>
                </div>
            </div>


        </div>
    );
};

export default Home;
