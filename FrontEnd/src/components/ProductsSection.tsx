import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";


type ProductProp = {
    title: String;
    tag: string;
    products: any[];
}

const ProductsSection = ({ title, tag, products }: ProductProp) => {
    const [ShowAll, SetShowAll] = useState(false)
    return (
        <div className="w-full bg-wh min-h-[60vh] flex flex-col gap-5">
            <div className="w-full font-heading text-4xl uppercase text-black font-bold lg:pt-20 lg:pb-20 pt-20 pb-10 text-center">{title}</div>

            <div className="grid grid-cols-2 lg:grid-cols-4 px-2 bg-amber-00 lg:px-16 justify-items-center">

                {products.filter((item: any) => item.Tags.includes(tag)).slice(0, ShowAll ? products.length : 4).map((item: any) => {
                    return (
                        <Link to={`/product/${item._id}`} key={item._id} >
                            <div key={item._id} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
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

                <button className={`btn-primary w-[30%] lg:w-[10%] ${products.length <= 4 ? "hidden" : "block"} `} onClick={() => {
                    SetShowAll(!ShowAll)
                }}>{ShowAll ? "Show less" : "Show All"}</button>
            </div>
        </div>
    )
}

export default ProductsSection