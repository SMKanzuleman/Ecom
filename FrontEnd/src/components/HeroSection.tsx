import { IoMdTrendingUp } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import HeroImg from "../assets/HeroImg-remove-bg-io (3).webp";


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

  )
}

export default HeroSection