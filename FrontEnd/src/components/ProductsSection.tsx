import { useState } from 'react'
import { Link } from 'react-router-dom';
import { PlaceholderImage } from '../Utils/PlaceholderImage';
import { ProductImage } from '../Utils/ProductImage';



type ProductProp = {
    title: String;
    tag: string;
    products: any[];
    ProductsLoading: any
}

export const ProductPlaceholder = () => (
    <div className="w-full h-full aspect-square bg-gray-100 rounded-4xl flex flex-col items-center justify-center text-gray-400">
        <svg className="w-12 h-12 stroke-[1.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase mt-2 text-gray-400">No Image</span>
    </div>
);

const ProductsSection = ({ title, tag, products, ProductsLoading }: ProductProp) => {



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
            <div className="w-full font-accent text-4xl uppercase text-black font-bold lg:pt-20 lg:pb-20 pt-20 pb-10 text-center">{title}</div>

            <div className="grid grid-cols-2 lg:grid-cols-4 px-2 bg-amber-00 lg:px-16 gap-2 justify-items-center">

                {ProductsLoading ? (

                    [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <div key={n} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto animate-pulse flex flex-col gap-3">
                            {/* Image placeholder */}
                            <div className="w-full bg-gray-300 rounded-4xl aspect-square" />
                            {/* Title line placeholder */}
                            <div className="h-5 bg-gray-300 rounded-md w-3/4 mx-3" />
                            {/* Price line placeholder */}
                            <div className="h-6 bg-gray-300 rounded-md w-1/3 mx-3" />
                        </div>
                    ))

                ) : (

                    FilterProducts().slice(0, ShowAll ? products.length : 8).map((item: any) => {
                        return (
                            <Link to={`/product/${item._id}`} key={item._id} >
                                <div key={item._id} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto animate-fade-up hover:scale-101 transition-transform duration-300 cursor-pointer ">
                                  <ProductImage src={item.Images[0]} alt='No image Found' />
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
                    })

                )}

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

