import { IoMdTrendingUp } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import HeroImg from "../assets/HeroImg-remove-bg-io (3).webp";

import { Link } from "react-router-dom";
import { motion } from "motion/react"
import Button from "../animated components/Button";


const HeroSection = () => {
    return (
        <div
            id="HeroSection"
            className="w-full lg:min-h-[80vh] min-h-fit  bg-wh   flex flex-col lg:flex-row "
        >
            <div
                id="left"
                className="lg:w-[55%] w-full flex flex-col items-left justify-center lg:px-32 px-6 gap-6"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)", scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                    transition={{
                        duration: 0.9,
                        delay: 0.2,
                        ease: [0.22, 1, 0.36, 1], // Smooth deceleration curve
                    }}
                    className="text-6xl font-CF font-extrabold tracking-tight"
                >
                    Clothes that match your style.
                </motion.h1>
                <p className="text-justify text-lg">
                    Browse through our diverse range of meticulously crafted garments,
                    designed to bring out your individuality and cater to your sense of
                    style.
                </p>
                <div className="flex lg:gap-4 gap-2">
                    <Link to={"/shop"} className="w-45 lg:w-[30%]" >
                        <Button className={""}>
                            < FaCartShopping />
                            Shop
                        </Button>

                    </Link>
                    <Link to={"/shop"} className="w-45 lg:w-[30%]">
                        <button className="btn-primary w-full ">
                            <IoMdTrendingUp />
                            Trending
                        </button>

                    </Link>
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

    )
}

export default HeroSection