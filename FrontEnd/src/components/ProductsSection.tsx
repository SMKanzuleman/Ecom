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

    const FilterProducts = () => {
        if (tag === "new_arrival")
            return (
                [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())   //Sort by Descending Order
            )
        else if (tag === "top_selling") {
            return (
                [...products].sort((a, b) => (b.Sold || 0) - (a.Sold || 0))
            )
        }
        else {
            return []
        }

    }





    const [ShowAll, SetShowAll] = useState(false)
    return (
        <div className="w-full bg-wh min-h-[60vh] flex flex-col gap-5">
            <div className="w-full font-heading text-4xl uppercase text-black font-bold lg:pt-20 lg:pb-20 pt-20 pb-10 text-center">{title}</div>

            <div className="grid grid-cols-2 lg:grid-cols-4 px-2 bg-amber-00 lg:px-16 justify-items-center">

                {FilterProducts().slice(0, ShowAll ? products.length : 4).map((item: any) => {
                    return (
                        <Link to={`/product/${item._id}`} key={item._id} >
                            <div key={item._id} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto animate-fade-up hover:scale-110 transition-transform duration-300 cursor-pointer ">
                                <img src={item.Images[0]} alt="" className="w-full bg-bg p-2 rounded-4xl  aspect-square object-cover " />
                                <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                                <div className="flex justify-between px-3 py-1">
                                    <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                                    {tag === "top_selling" && (
                                        <div className="flex items-center gap-1.5 bg-bg text-black text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200 shadow-2xs">
                                            <span className="text-gray-500 font-medium">Sold:</span>
                                            <span className="font-bold text-black">{item.Sold || 0}</span>
                                        </div>
                                    )}
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