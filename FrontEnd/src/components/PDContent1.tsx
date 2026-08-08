import  { useState } from 'react'
import logo from '../assets/logo.svg'
import BR1 from '../assets/HeroImg.png'
import BR2 from '../assets/zara.svg'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";

type ProductProp = {
    Product: any
}

const PDContent = ({Product }:ProductProp) => {

    const [Thumb, setThumb] = useState<any>(logo)
    const [Size, setSize] = useState<any>("Large")
    const [Quantity, setQuantity] = useState(1)
    const [Color, setColor] = useState("")

  return (
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
  )
}

export default PDContent