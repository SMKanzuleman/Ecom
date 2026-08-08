import axios from "axios";
import logo from '../assets/logo.svg'
import BR1 from '../assets/HeroImg.png'
import BR2 from '../assets/zara.svg'
import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegEyeSlash } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";



const ProductDetail = () => {
    const { id } = useParams();
    const [Product, setProduct] = useState<any>("")
    const [Thumb, setThumb] = useState<any>(logo)
    const [Size, setSize] = useState<any>("Large")
    const [Quantity, setQuantity] = useState(1)
    const [Color, setColor] = useState("")
    const [ActiveTab, setActiveTab] = useState("Product Details")
    const [OpenIndex, setOpenIndex] = useState<Number | null>(null)



    const faqs = [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days across the country." },
        { q: "What is your return policy?", a: "We offer a 30-day hassle-free return and exchange policy." },
        { q: "Is the material machine washable?", a: "Yes, wash cold inside out with similar colors." },
        { q: "How do I choose the right size?", a: "Check our Size Guide chart above for exact chest and length measurements." }
    ];

    const FetchProduct = async () => {
        try {
            const res = await axios.get("http://localhost:2026/products/" + id)
            setProduct(res.data.FoundedProduct)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        window.scroll(0, 0)
        FetchProduct()
    }, [])

    return (
        <div className="w-full min-h-screen bg-white px-7 lg:px-10 flex flex-col">

            { /*BreadCrumbs*/}
            <div className="w-full flex px-5 py-3 lg:px-50 justify-start text-text lg:text-sm text-[12px] lg:gap-2 gap-1 ">
                <Link to={"/"}>
                    <p className="hover:text-black cursor-pointer transition-all duration-500">Home</p>
                </Link>
                <p className="hover:text-black cursor-pointer transition-all duration-500">&gt;</p>
                <p className="hover:text-black cursor-pointer transition-all duration-500">Shop</p>
                <p className="hover:text-black cursor-pointer transition-all duration-500">&gt;</p>
                <p className="hover:text-black cursor-pointer transition-all duration-500 hidden sm:block">{Product.category || "Clothing"}</p>
                <p className="hover:text-black cursor-pointer transition-all duration-500 hidden sm:block">&gt;</p>
                <p className="hover:text-black cursor-pointer transition-all duration-500">{Product.Name}</p>

            </div>

            { /*Content Container*/}
            <div className="w-full flex lg:flex-row flex-col lg:h-[80vh]">

                { /*Upper/Left*/}
                <div className="w-full lg:w-[55%] flex lg:flex-row-reverse flex-col gap-4">

                    <div className="w-full lg:w-[80%] h-158.75 bg-bg rounded-3xl p-5 lg:p-10 ">
                        <img src={Thumb} alt="" className="w-full h-full object-contain" />
                    </div>

                    <div className="w-full lg:w-[20%]  flex flex-row lg:flex-col gap-4 justify-center ">

                        <div className={`bg-bg p-3 lg:rounded-3xl rounded-2xl w-40 h-40 ${Thumb === logo ? "border-2 border-black" : "border-0"}`} onClick={() => {
                            setThumb(logo)
                        }} >
                            <img src={logo} alt="" className="cursor-pointer h-full w-full object-contain" />
                        </div>

                        <div className={`bg-bg p-3 lg:rounded-3xl rounded-2xl w-40 h-40 ${Thumb === BR1 ? "border-2 border-black" : "border-0"}`} onClick={() => {
                            setThumb(BR1)
                        }} >
                            <img src={BR1} alt="" className="cursor-pointer h-full w-full object-contain" />
                        </div>

                        <div className={`bg-bg p-3 lg:rounded-3xl rounded-2xl w-40 h-40 ${Thumb === BR2 ? "border-2 border-black" : "border-0"}`} onClick={() => {
                            setThumb(BR2)
                        }} >
                            <img src={BR2} alt="" className="cursor-pointer h-full w-full object-contain" />
                        </div>

                    </div>

                </div>
                { /*Bottom/Right*/}
                <div className="w-full lg:w-[45%] bg-wh flex flex-col lg:px-10 lg:py-3 py-10">
                    <div className="text-3xl lg:text-4xl font-accent font-bold text-black">{Product.Name}</div>
                    <div className="flex gap-1.5 items-center  py-2">
                        {[1, 2, 3, 4, 5].map((index) => {
                            if (Product.Rating >= index) {
                                return (<FaStar className="text-yellow-400" />)
                            }
                            else if (Product.Rating >= index - 0.5) {
                                return (<FaStarHalfAlt className="text-yellow-400" />)
                            }
                            else {
                                return (<FaRegStar />)
                            }
                        })}
                        <span className="text-black text-xl">{Product.Rating} / 5</span>
                    </div>

                    <div className="flex items-center gap-5 py-1 font-heading">
                        <span className="text-3xl text-black">Rs.{Product.Price}</span>
                        <span className="text-3xl line-through text-text px-5">Rs.100</span>
                        <span className="w-auto px-4 py-2 h-auto bg-red-300 text-red-600 rounded-full text-center">40%</span>
                    </div>

                    <div className="flex items-center gap-5 py-7 font-heading border-b-2 border-gray-700/10">
                        <span>{Product.Description}</span>
                    </div>

                    <div className="flex flex-col py-7 font-heading border-b-2 border-gray-700/10">
                        <div>Select Colors</div>
                        <div className="flex items-center gap-3 mt-3">

                            <button className={`w-9 h-9 bg-[#4F4631] rounded-full cursor-pointer hover:scale-110 transition-transform ${Color === "#4F4631" ? "border-2 border-black" : "border-2 border-transparent"}`} onClick={() => { setColor("#4F4631") }}></button>
                            <button className={`w-9 h-9 bg-[#314F4A] rounded-full cursor-pointer hover:scale-110 transition-transform ${Color === "#314F4A" ? "border-2 border-black" : "border-2 border-transparent"}`} onClick={() => { setColor("#314F4A") }}></button>
                            <button className={`w-9 h-9 bg-[#31344F] rounded-full cursor-pointer hover:scale-110 transition-transform ${Color === "#31344F" ? "border-2 border-black" : "border-2 border-transparent"}`} onClick={() => { setColor("#31344F") }}></button>
                        </div>

                    </div>

                    <div className="flex flex-col py-7 font-heading border-b-2 border-gray-700/10">
                        <div>Choose Size</div>
                        <div className="flex items-center gap-1 lg:gap-3 mt-3">

                            <button onClick={() => { setSize("Small") }} className={`w-auto px-5   text-sm h-9 ${Size === "Small" ? "bg-black text-white" : "bg-bg"} rounded-full cursor-pointer hover:scale-110 transition-transform`}>Small</button>
                            <button onClick={() => { setSize("Medium") }} className={`w-auto px-5  text-sm h-9 ${Size === "Medium" ? "bg-black text-white" : "bg-bg"} rounded-full cursor-pointer hover:scale-110 transition-transform`}>Medium</button>
                            <button onClick={() => { setSize("Large") }} className={`w-auto px-5   text-sm h-9 ${Size === "Large" ? "bg-black text-white" : "bg-bg"} rounded-full cursor-pointer hover:scale-110 transition-transform`}>Large</button>
                            <button onClick={() => { setSize("X Large") }} className={`w-auto px-5 text-sm h-9 ${Size === "X Large" ? "bg-black text-white" : "bg-bg"} rounded-full cursor-pointer hover:scale-110 transition-transform`}>X Large</button>
                        </div>

                    </div>
                    <div className="w-full flex gap-5 py-7 font-heading  border-gray-700/10">
                        <div className="w-[30%] bg-bg rounded-full py-3 flex gap-4 px-5 items-center justify-between lg:px-10 overflow-hidden">
                            <button onClick={() => {
                                if (Quantity > 1) {
                                    setQuantity(Quantity - 1)
                                }
                                <span className="text-red-600">can't be negetive</span>
                            }}
                                className="cursor-pointer font-bold hover:scale-150 duration-100">
                                -
                            </button>
                            <span className="text-black">{Quantity}</span>
                            <button onClick={() => {
                                if (Quantity < Product.Stock) {
                                    setQuantity(Quantity + 1)
                                }

                            }}
                                className="cursor-pointer font-bold hover:scale-150 duration-100">
                                +
                            </button>
                        </div>
                        <div className="w-[70%]"><button className="btn-primary w-full">Add to Cart <FaCartShopping /></button></div>

                    </div>





                </div>
            </div>


            { /*ProductDetail/Reviews/Faqs*/}

            <div className="w-full h-[100px] bg-wh">
                <div className="w-full h-full px-30 py-2 flex lg:justify-evenly justify-center items-end text-text font-accent border-b-2 border-gray-700/10 lg:text-2xl text-lg lg:gap-0 gap-10">
                    <button className={` cursor-pointer ${ActiveTab === "Product Details" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("Product Details") }}>Product Details</button>
                    <button className={` cursor-pointer ${ActiveTab === "Reviews" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("Reviews") }}>Reviews</button>
                    <button className={` cursor-pointer ${ActiveTab === "FAQ's" ? "text-black font-bold" : "text-text"}`} onClick={() => { setActiveTab("FAQ's") }}>FAQ's</button>
                </div>
            </div>

            <div className="w-full py-5 bg-wh flex justify-center ">
                {ActiveTab === "Product Details" && (
                    <div className="animate-fade-up lg:w-[80%] w-[90%] flex flex-col gap-10 py-8 px-2 lg:px-6 font-body text-zinc-700 animate-fade-in">

                        {/* 1. Overview Paragraph */}
                        <div>
                            <h3 className="text-xl font-bold font-heading text-black uppercase tracking-tight mb-3">
                                Product Overview
                            </h3>
                            <p className="text-sm lg:text-base leading-relaxed text-zinc-600">
                                {Product?.Details || "Crafted from 100% heavy organic ring-spun cotton (240 GSM) engineered for exceptional durability and structure. Features our signature relaxed silhouette with dropped shoulders, twin-needle reinforced hems, and custom silicon-washed softness that prevents pilling and maintains color depth wash after wash."}
                            </p>
                        </div>

                        {/* 2. Key Specifications Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-bg rounded-2xl">
                            <div>
                                <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Material</span>
                                <p className="font-semibold text-black text-sm mt-1">100% Organic Cotton</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Fabric Weight</span>
                                <p className="font-semibold text-black text-sm mt-1">240 GSM (Heavyweight)</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Silhouette</span>
                                <p className="font-semibold text-black text-sm mt-1">Relaxed / Boxy Fit</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Origin</span>
                                <p className="font-semibold text-black text-sm mt-1">Crafted in Portugal</p>
                            </div>
                        </div>

                        {/* 3. Two-Column Detailed Breakdown (Features & Care) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left: Design Highlights */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-black text-base uppercase tracking-tight">
                                    Design &amp; Construction Highlights
                                </h4>
                                <ul className="flex flex-col gap-2.5 text-sm text-zinc-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Pre-shrunk fabric to minimize shrinkage after laundering
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        1-inch high-density ribbed collar that retains shape
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Tonal coverstitch along shoulder and neckline seams
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Breathable natural fiber suitable for all seasons
                                    </li>
                                </ul>
                            </div>

                            {/* Right: Care & Washing Instructions */}
                            <div className="flex flex-col gap-3">
                                <h4 className="font-bold text-black text-base uppercase tracking-tight">
                                    Care &amp; Maintenance
                                </h4>
                                <ul className="flex flex-col gap-2.5 text-sm text-zinc-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Machine wash cold inside out with like colors (30°C max)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Do not bleach or use fabric softeners
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Hang dry in the shade to preserve garment shape &amp; color
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                        Iron on reverse side using low to medium heat
                                    </li>
                                </ul>
                            </div>

                        </div>

                        {/* 4. Model / Sizing Note */}
                        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-500">
                            <span className="font-semibold text-black">Model Sizing Note: </span>
                            Male model is 6&apos;1&quot; (185 cm) wearing size Large. Female model is 5&apos;8&quot; (173 cm) wearing size Medium.
                        </div>

                    </div>
                )}
                {ActiveTab === "Reviews" && (
                    <div className="w-full h-auto columns-1 lg:columns-3  py-8 px-6 animate-fade-up">
                        <div className="w-full break-inside-avoid mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>
                        <div className="w-full break-inside-avoid mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>
                        <div className="w-full break-inside-avoid mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>
                        <div className="w-full break-inside-avoid mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>
                        <div className="w-full mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full break-inside-avoid  font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>
                        <div className="w-full  mb-6 bg-bg rounded-2xl flex flex-col">
                            <div className="w-full break-inside-avoid  font-body flex items-center justify-between border-b-2 border-gray-700/10 text-black text-sm font-bold py-0 px-5  tracking-wider bg-amber-00">
                                <div>MR.Ali</div>
                                <div className="flex gap-1.5 items-center  py-2">
                                    {[1, 2, 3, 4, 5].map((index) => {
                                        if (Product.Rating >= index) {
                                            return (<FaStar className="text-yellow-400" />)
                                        }
                                        else if (Product.Rating >= index - 0.5) {
                                            return (<FaStarHalfAlt className="text-yellow-400" />)
                                        }
                                        else {
                                            return (<FaRegStar />)
                                        }
                                    })}
                                    <span className="text-black text-xl">{Product.Rating}</span>
                                </div>
                            </div>
                            <div className="font-body text-text px-5 text-sm py-2 overflow-hidden border-b-2 border-gray-700/10">
                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!                                This Producst i raaluy amazing i used it multipletimes and now it is my 50th purchase of this website very good porduct and really recommended for new customers,Thankyou!!!
                            </div>
                            <div className="w-full text-text font-accent py-2 px-5 text-sm text-right">
                                Published at 2024-12-9
                            </div>

                        </div>


                    </div>
                )}
                {ActiveTab === "FAQ's" && (
                    <div className="w-full px-2 py-5 animate-fade-up flex flex-col items-center gap-4">


                        {faqs.map((faq,index) => {
                            return (

                                <div key={index} className="w-[90%] lg:w-[60%] bg-bg py-5 px-3 rounded-md flex flex-col justify-between">
                                    <div className="w-full flex items-center justify-between" >
                                        <div className="text-black" >{faq.q }</div>
                                        <div onClick={() => { OpenIndex === index? setOpenIndex(null) : setOpenIndex(index)  }} className="text-black text-lg px-5 hover:scale-125 duration-300 cursor-pointer"><IoIosArrowDropdownCircle /></div>
                                    </div>
                                    {OpenIndex ===index && (
                                        <div className="text-text" >{faq.a}</div>
                                        
                                    )}
                                </div>
                                
                            )
                        })}

                   

                    </div>
                )}
                 
            </div>

        </div>
    );
};

export default ProductDetail;
