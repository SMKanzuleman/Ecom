import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../animated components/Button';
import { motion } from 'motion/react'
import { fadeInDown, fadeInUp, staggerContainer } from '../Utils/Motion';

const PDContent = ({ productId, Product }: any) => {

    const [Images, setImages] = useState<string>([]);
    const [Thumb, setThumb] = useState<any>(logo)
    const [Size, setSize] = useState<any>("")
    const [Quantity, setQuantity] = useState(1)
    const [Color, setColor] = useState("")
    const { Token } = useAuth()
    const Navigate = useNavigate();
    const Location = useLocation();

    const { AddToCart } = useCart()

    useEffect(() => {
        if (Product) {
            if (Product.Images.length > 0) {
                setThumb(Product.Images[0])
            }
            if (Product.Sizes.length > 0) {
                setSize(Product.Sizes[0])
            }
            if (Product.Colors.length > 0) {
                setColor(Product.Colors[0])
            }

        }

    }, [Product])


    return (
        <motion.div

            className="w-full flex lg:flex-row flex-col lg:h-[80vh]">

            { /*Upper/Left*/}

            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-[55%] flex lg:flex-row-reverse flex-col gap-4">

                <div className="w-full lg:w-[80%] overflow-hidden bg-bg rounded-3xl ">
                    <motion.img
                        key={Thumb}
                        initial={{ opacity: 0.5, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        src={Thumb} alt="" className="w-full h-full object-cover rounded-3xl" />
                </div>

                <div className="w-full lg:w-[20%]  flex flex-row lg:flex-col gap-4 justify-center ">

                    {Product?.Images.map((i: any, index: any) => (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={index}
                            className={`bg-bg p-2 lg:rounded-3xl rounded-2xl w-40 h-40 ${Thumb === i ? "border-2 border-black" : "border-0"}`} onClick={() => {
                                setThumb(i)
                            }} >
                            <img src={i} alt="" className="cursor-pointer h-full w-full object-cover rounded-3xl" />
                        </motion.div>

                    ))}


                </div>

            </motion.div>

            { /*Bottom/Right*/}

            <motion.div

                variants={staggerContainer(0.09, 0.15)}
                initial="hidden"
                animate="visible"
                className="w-full lg:w-[45%] bg-wh flex flex-col lg:px-10 lg:py-3 py-10">
                <div className="text-3xl lg:text-4xl font-accent font-bold text-black">{Product?.Name}</div>

                <motion.div
                variants={fadeInUp}
                className="flex items-center gap-5 py-1 font-heading">
                    <span className="text-3xl text-black">Rs.{Product?.Price}</span>
                    <span className="text-3xl line-through text-text px-5">{Product?.SalePrice}</span>
                    <span className="w-auto px-4 py-2 h-auto bg-red-300 text-red-600 rounded-full text-center">{Math.round(((Product?.SalePrice - Product?.Price) / Product?.SalePrice) * 100)}%</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-5 py-7 font-heading border-b-2 border-gray-700/10">
                    <span>{Product?.Tagline}</span>
                </motion.div>

                <motion.div variants={fadeInUp} className="flex flex-col py-7 font-heading border-b-2 border-gray-700/10">
                    <div>Select Colors</div>
                    <div className="flex items-center gap-3 mt-3">

                        {Product?.Colors.map((c: any, index: any) => (

                            <button key={index} style={{ background: c }} className={`w-9 h-9  rounded-full cursor-pointer hover:scale-110 transition-transform ${Color === c ? "border-2 border-black" : "border-2 border-transparent"}`} onClick={() => { setColor(c) }}></button>
                        ))}

                    </div>

                </motion.div>


                <motion.div variants={fadeInDown} className="flex flex-col py-7 font-heading border-b-2 border-gray-700/10">
                    <div>Choose Size</div>
                    <div className="flex items-center gap-1 lg:gap-3 mt-3">

                        {Product?.Sizes.map((s: any, index) => (
                            <button key={index} onClick={() => { setSize(s) }} className={`w-auto px-5  text-sm h-9 ${Size === s ? "bg-black text-white" : "bg-bg"} rounded-full cursor-pointer hover:scale-110 transition-transform`}>{s}</button>
                        ))}

                    </div>

                </motion.div>
                
                <motion.div variants={fadeInDown} className="w-full flex gap-5 py-7 font-heading  border-gray-700/10">
                    <div className="w-[30%] bg-bg rounded-full py-3 flex gap-4 px-5 items-center justify-between lg:px-10 overflow-hidden">
                        <button onClick={() => {
                            if (Quantity > 1) {
                                setQuantity(Quantity - 1)
                            }
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
                    <div className="w-[70%]">
                        <Button className="btn-primary w-full"
                            onClick={() => {

                                AddToCart(Product, Size, Color, Quantity)
                            }}>
                            Add to Cart <FaCartShopping /></Button>

                    </div>

                </motion.div>





            </motion.div>

        </motion.div >



    )
}

export default PDContent