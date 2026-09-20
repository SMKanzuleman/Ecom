import { useEffect, useRef, useState } from 'react'
import { HiOutlineSearch } from "react-icons/hi";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API, { APIERROR } from '../Utils/API';
import { ProductImage } from '../Utils/ProductImage';

const Navbar = () => {
    const [SearcchOpen, setSearchOpen] = useState(false)
    const { setIsCartOpen } = useCart()
    const [HamBOpen, setHamBOpen] = useState(false)
    const [Closing, setClosing] = useState(false)
    const { Cart } = useCart()

    const [SearchQuery, setSearchQuery] = useState("");
    const [Results, setResults] = useState<any[]>([]);

    const SearchRef = useRef<HTMLDivElement>(null)

    const [ExploreLinks, setExploreLinks] = useState<any[]>([])

    const FetchNavLinks = async () => {
        try {
            const res = await API.get("/site/footer");
            if (res.data?.Footer) {
                const f = res.data.Footer;
                if (f.ExplorePagesLinks) {
                    setExploreLinks(f.ExplorePagesLinks);
                }
            }
        } catch (error) {
            APIERROR(error, "Error in Fetching Footer Config")
        }
    };


    useEffect(() => {
        FetchNavLinks()

        const HandleOutside = (event: MouseEvent) => {
            if (SearchRef.current && !SearchRef.current.contains(event?.target as Node)) {
                setSearchQuery("");
                setResults([])
            }
        }

        document.addEventListener("mousedown", HandleOutside)
        //cleanup
        return () => document.removeEventListener("mousedown", HandleOutside)


    }, [])

    useEffect(() => {
        if (!SearchQuery.trim()) {
            setResults([])
            return
        }
        //Debounce
        const timer = setTimeout(async () => {
            try {
                const res = await API.get(`/products/search?q=${encodeURIComponent(SearchQuery)}`)
                if (res.data?.FoundedProducts) {
                    setResults(res.data.FoundedProducts)
                }
            } catch (error) {
                console.error(error)
            }

        }, 300);
        //before returning
        return () => clearTimeout(timer)
    }, [SearchQuery])


    return (
        <div className="w-full flex min-h-[10vh] bg-wh sticky top-0 z-10">

            <div
                onClick={() => {
                    setHamBOpen(!HamBOpen)
                }}

                className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden ${HamBOpen && !Closing
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                    }`}
            />

            <div className="lg:w-[20%] w-[40%] flex items-center lg:justify-end justify-center gap-5 px-1 bg-amber-00">
                <GiHamburgerMenu className="text-black text-3xl lg:hidden " onClick={() => {
                    setHamBOpen(!HamBOpen)
                    console.log("CLicked");

                }} />
                <Link to={"/"} >
                    <img src={logo} alt="Logo" className="h-9 w-auto cursor-pointer" />
                </Link>
            </div>

            {HamBOpen && (
                <div className={`fixed top-0 left-0 w-[70%] bg-bg min-h-screen z-50 ${Closing ? "animate-slide-out" : "animate-slide-in"}`}>

                    <div className="w-full flex min-h-25">
                        {/* Logo */}
                        <div className="w-[70%] bg-amber-00 flex items-center pl-14">
                            <img src={logo} alt="Logo" className="h-9 w-auto cursor-pointer" />
                        </div>
                        {/* Close */}
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

                    {/* NavLiks */}

                    <div className="w-full flex flex-col justify-center items-start pl-24 pt-20 gap-8 text-black text-2xl  font-heading ">
                        <Link to={"/shop"} className='hover:text-text transition-transform duration-1000'>Shop</Link>
                        {ExploreLinks.map((link, index) => (
                            <Link to={"/shop"} className='hover:text-text transition-transform duration-1000'>Shop</Link>
                        ))}
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
                    {/* <a href="#" className="hover:text-text transition-transform duration-1000 ">Shop</a> */}
                    <Link to={"/shop"} className='hover:text-text transition-transform duration-1000'>Shop</Link>
                    {ExploreLinks.map((link, index) => (
                        <Link to={`${link.Url}`} className='hover:text-text transition-transform duration-1000'>{link.Label}</Link>
                    ))}
                </div>


            </div>
            {/* Input on PC */}
            <div ref={SearchRef} className="hidden sm:flex w-[15%] lg:w-[20%]  items-center">
                <div className="w-full relative">
                    <HiOutlineSearch className="absolute left-4 top-3 text-black" />
                    <input
                        type="text"
                        value={SearchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Products"
                        className=" w-full px-10 py-2 rounded-4xl outline-none  bg-bg" />
                    {/* Results */}
                    {SearchQuery.trim() && (
                        <div className="absolute flex flex-col gap-2  w-full mt-2 bg-wh rounded-lg shadow-xl border border-gray-200/80 p-2 z-50 max-h-80 overflow-y-auto no-scrollbar animate-fade-up">
                            {Results.length === 0 ? (
                                <div className="text-center py-4 text-xs text-gray-400">
                                    No products found
                                </div>
                            ) : (
                                Results.map((item: any) => (
                                    <Link
                                        key={item._id}
                                        to={`/product/${item._id}`}
                                        onClick={() => {
                                            setSearchQuery('');
                                            setResults([]);
                                        }}
                                        className="flex bg-bg  items-center gap-3 py-1 hover:bg-bg rounded-xl transition-colors"
                                    >
                                        <img
                                            src={item.Images?.[0] || 'https://placehold.co/100/000000/FFF?text=No+Images'}
                                            alt={item.Name}
                                            className="w-15 h-15 object-cover rounded-lg bg-bg shrink-0"
                                        />
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-[14px] font-semibold text-black truncate">{item.Name}</span>
                                            <span className="text-[10px]">{item.Category}</span>
                                        </div>
                                        <div className="flex flex-col justify-center  min-w-0">
                                            <span className="text-xs font-accent font-bold text-black shrink-0 mr-2">
                                                Rs.{item.Price}
                                            </span>
                                            <span className="text-[10px]">Stock:{item.Stock}</span>
                                        </div>


                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

            </div>

            {/* Input on Mobile */}
            {SearcchOpen ? <div className=" w-[60%]  lg:w-[20%] flex items-center justify-center gap-5 px-5 bg-amber-00 relative">
                <div className="w-full relative">
                    <HiOutlineSearch className="absolute left-4 top-3 text-black" />
                    <MdClear className="absolute top-2 right-4 text-2xl text-red-600" onClick={() => { setSearchOpen(!setSearchOpen) }} />
                    <input
                        type="text"
                        value={SearchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className=" w-full px-10 py-2 rounded-4xl outline-none  bg-bg" />

                    {/* Results */}
                    {SearchQuery.trim() && (
                        <div className="absolute flex flex-col gap-2  w-full mt-2 bg-wh rounded-lg shadow-xl border border-gray-200/80 p-2 z-50 max-h-80 overflow-y-auto no-scrollbar animate-fade-up">
                            {Results.length === 0 ? (
                                <div className="text-center py-4 text-xs text-gray-400">
                                    No products found
                                </div>
                            ) : (
                                Results.map((item: any) => (
                                    <Link
                                        key={item._id}
                                        to={`/product/${item._id}`}
                                        onClick={() => {
                                            setSearchQuery('');
                                            setResults([]);
                                        }}
                                        className="flex bg-bg  items-center gap-3 py-1 hover:bg-bg rounded-xl transition-colors"
                                    >
                                         <img
                                            src={item.Images?.[0] || 'https://placehold.co/100/000000/FFF?text=No+Images'}
                                            alt={item.Name}
                                            className="w-15 h-15 object-cover rounded-lg bg-bg shrink-0"
                                        /> 
                                      
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="text-[14px] font-semibold text-black truncate">{item.Name}</span>
                                            <span className="text-[10px]">{item.Category}</span>
                                        </div>
                                        <div className="flex flex-col justify-center  min-w-0">
                                            <span className="text-xs font-accent font-bold text-black shrink-0 mr-2">
                                                Rs.{item.Price}
                                            </span>
                                            <span className="text-[10px]">Stock:{item.Stock}</span>
                                        </div>


                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

            </div> :
                <div className=" w-[60%] lg:w-[20%] flex items-center justify-center gap-5 pl-16 bg-amber-00 relative">
                    <HiOutlineSearch onClick={() => { setSearchOpen(!SearcchOpen) }} className=" text-black text-3xl font-bold lg:hidden" />
                    <Link to={"/dashboard"}>
                        <RiAccountPinCircleFill className="text-3xl text-black cursor-pointer hover:scale-120 transition-transform duration-200" />
                    </Link>
                    <div className="relative">
                        <FaCartShopping className="text-black w-full text-3xl cursor-pointer hover:scale-120 transition-transform duration-200" onClick={() => setIsCartOpen(true)} />
                        <div className={` ${Cart.length === 0 ? "hidden" : "absolute -top-2 -right-4 w-5 h-5 font-heading  rounded-full bg-red-600 text-black text-[12px] flex items-center justify-center text-center"}`}>{Cart.length}</div>

                    </div>

                </div>}



        </div>
    )
}

export default Navbar