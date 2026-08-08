import { FaCartShopping } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";

import br1 from '../assets/zara.svg'
import br3 from '../assets/prada-logo-1 1.svg'
import br4 from '../assets/Group (2).svg'
import br5 from '../assets/Group (1).svg'
import logo from '../assets/logo.svg'


import HeroImg from "../assets/HeroImg-remove-bg-io (3).webp";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ImInsertTemplate } from "react-icons/im";
const Home = () => {


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
        <div className="">


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

            <div className="w-full bg-wh min-h-[60vh] flex flex-col gap-5">
                <div className="w-full font-heading text-4xl uppercase text-black font-bold lg:pt-32 lg:pb-20 pt-20 pb-10 text-center">New arrivals</div>

                <div className="grid grid-cols-2 lg:grid-cols-4 px-2 lg:px-4 bg-amber-00 lg:px-16 justify-items-center">

                    {Products.filter((item: any) => item.Tags.includes("new_arrival")).slice(0, ShowAll ? Products.length : 4).map((item: any) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id} >
                                <div key={item._id} className="lg:w-[250px] w-[200px] py-3 lg:py-0 h-auto animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
                                    <img src={logo} alt="" className="w-full bg-bg p-5 rounded-4xl " />
                                    <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                                    <div className="flex justify-between px-3 py-1">
                                        <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                                        <div className="flex lg:gap-1.5 gap-0.5">
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

                    <button className={`btn-primary w-[30%] lg:w-[10%] ${Products.length <= 4 ? "hidden" : "block"} `} onClick={() => {
                        SetShowAll(!ShowAll)
                    }}>{ShowAll ? "Show less" : "Show All"}</button>
                </div>
            </div>

            <div className="w-full bg-wh min-h-[60vh] flex flex-col gap-5">
                <div className="w-full font-heading text-4xl uppercase text-black font-bold lg:pt-32 lg:pb-20 pt-20 pb-10 text-center">Top Selling</div>

                <div className="grid grid-cols-2 lg:grid-cols-4 px-2 lg:px-4 bg-amber-00 lg:px-16 justify-items-center">

                    {Products.filter((item: any) => item.Tags.includes("top_selling")).slice(0, ShowAll ? Products.length : 4).map((item: any) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id} >
                                <div key={item._id} className="lg:w-[250px] w-[200px] py-3 lg:py-0 h-auto animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
                                    <img src={logo} alt="" className="w-full bg-bg p-5 rounded-4xl " />
                                    <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                                    <div className="flex justify-between px-3 py-1">
                                        <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                                        <div className="flex lg:gap-1.5 gap-0.5">
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

                    <button className={`btn-primary w-[30%] lg:w-[10%] ${Products.length <= 4 ? "hidden" : "block"} `} onClick={() => {
                        SetShowAll(!ShowAll)
                    }}>{ShowAll ? "Show less" : "Show All"}</button>
                </div>
            </div>
            
            <div className="py-5 bg-wh"></div>

            <div className="w-full h-auto px-10 py-5 bg-wh flex  justify-center">
                <div className="w-full lg:w-[90%] bg-black rounded-4xl flex lg:flex-row flex-col justify-between items-center py-10 lg:py-0">
                    <div className="w-full lg:w-[60%] font-accent uppercase font-bold lg:text-5xl text-3xl text-wh py-5 px-10 h-40 lg:h-48 flex items-center">
                        Stay uptodate to our latest stock
                    </div>
                    <div className="w-full lg:w-[40%]  text-wh py-5 px-10 flex flex-col justify-center items-center gap-3">
                        <input type="email" className="btn-primary bg-wh text-black outline-none w-full lg:w-[80%]" placeholder="yormail@provider.com" />
                        <button className="btn-primary bg-wh text-black w-full lg:w-[80%]">Subscribe</button>
                    </div>

                </div>

            </div>



        </div>
    );
};

export default Home;
