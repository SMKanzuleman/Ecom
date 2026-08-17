import { useEffect, useState } from 'react'
import heroimg from '../assets/Stickman_shop.png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar, FaChevronUp } from "react-icons/fa";
import logo from '../assets/logo.svg'
import Pagination from '../components/Pagination';
import { IoFilterSharp } from "react-icons/io5";
import { VscChevronRightCompact } from "react-icons/vsc";
import { IoChevronUp } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";

const Shop = () => {
  const [Products, setProducts] = useState<any>([])
  const [CurrentPage, setCurrentPage] = useState(1)
  const [PostPerPage, setPostPerPage] = useState(10)

  const MIN = 0;
  const MAX = 10000;

  const [MinPrice, setMinPrice] = useState(2000)
  const [MaxPrice, setMaxPrice] = useState(5000)

  const MinPos = ((MinPrice - MIN) / (MAX - MIN) * 100)
  const MaxPos = ((MaxPrice - MIN) / (MAX - MIN) * 100)

  const [PriceToggle, setPriceToggle] = useState(false)
  const [StyleToggle, setStyleToggle] = useState(false)
  const [ColorToggle, setColorToggle] = useState(false)


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

  const FirstIndex = CurrentPage * PostPerPage;
  const LastIndex = FirstIndex + PostPerPage;

  const CurrentProducts = Products.slice(FirstIndex, LastIndex)
  useEffect(() => {
    FetchProducts()
  }, [])
  return (
    <div className="w-full bg-wh animate-fade-up duration-700 flex flex-col">
      {/*Header*/}
      <div className='w-full bg-black px-20 h-[200px] flex justify-between items-center relative'>
        <div className='flex justify-center items-center w-full'>
          <h1 className='font-accent text-4xl font-semibold text-wh'>Shop</h1>
        </div>
        <div className='absolute lg:right-28 right-3 lg:top-7 top-24'>
          <img src={heroimg} alt="" className='lg:w-52 w-32' />
        </div>
      </div>
      {/*Body*/}
      <div className="w-full flex flex-col lg:flex-row lg:px-10 py-32">
        {/*Left sidebar*/}
        <div className='lg:w-[20%] w-full rounded-4xl  bg-bg flex flex-col px-10 py-5'>

          <div className='w-full flex justify-between items-center py-5 border-b-2 border-gray-400/30'>
            <div className='text-black text-xl font-semibold'>Filters</div>
            <div className='text-text font-body text-2xl'><IoFilterSharp /></div>
          </div>

          <div className='w-full flex flex-col  py-5 gap-5 border-b-2 border-gray-400/30'>

            <div className='w-full flex justify-between'>
              <div className='text-text '>T-Shirt</div>
              <div className='cursor-pointer'><VscChevronRightCompact /></div>
            </div>
            <div className='w-full flex justify-between'>
              <div className='text-text'>T-Shirt</div>
              <div className='cursor-pointer'><VscChevronRightCompact /></div>
            </div>
            <div className='w-full flex justify-between'>
              <div className='text-text'>T-Shirt</div>
              <div className='cursor-pointer'><VscChevronRightCompact /></div>
            </div>
            <div className='w-full flex justify-between'>
              <div className='text-text'>T-Shirt</div>
              <div className='cursor-pointer'><VscChevronRightCompact /></div>
            </div>
            <div className='w-full flex justify-between'>
              <div className='text-text'>T-Shirt</div>
              <div className='cursor-pointer'><VscChevronRightCompact /></div>
            </div>

          </div>

          <div className='w-full flex justify-between items-center py-5'>
            <div className='text-black text-xl font-semibold'>Price</div>
            <div className={`text-black font-body text-2xl cursor-pointer`} onClick={() => setPriceToggle(!PriceToggle)}>{PriceToggle ? <FaChevronUp className='text-[16px]' /> : <FaChevronDown className='text-[16px]' />}</div>
          </div>

          {PriceToggle && (
            <div className='w-full py-2 relative animate-fade-up'>

              <div className='border-t-4 border-gray-500/40 rounded-full'></div>

              <div className='absolute top-2  border-t-4 border-black rounded-full'
                style={{
                  left: `${MinPos}%`,
                  right: `${100 - MaxPos}%`
                }}></div>

              <input type="range"
                className="
                    absolute top-0.5 left-0 w-full
                    appearance-none bg-transparent
                    pointer-events-none
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-black
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:cursor-pointer
                "
                min={MIN}
                max={MAX}
                value={MinPrice}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val < MaxPrice) {
                    setMinPrice(val)
                  }
                }
                } />

              <input type="range"
                className="
                    absolute top-0.5 left-0 w-full
                    appearance-none bg-transparent
                    pointer-events-none

                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-5
                    [&::-webkit-slider-thumb]:h-5
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-black
                    [&::-webkit-slider-thumb]:pointer-events-auto
                    [&::-webkit-slider-thumb]:cursor-pointer
                "
                min={MIN}
                max={MAX}
                value={MaxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val > MinPrice) {
                    setMaxPrice(val)
                  }
                }} />

              <div className='flex justify-between items-center pt-5 font-accent'>
                <div> PKR {MinPrice}</div>
                <div>PKR {MaxPrice}</div>
              </div>


            </div>
          )}

          <div className='w-full flex justify-between items-center py-5'>
            <div className='text-black text-xl font-semibold'>Colors</div>
            <div className='text-black font-body text-2xl cursor-pointer' onClick={() => setColorToggle(!ColorToggle)}>{ColorToggle ? <FaChevronUp className='text-[16px]' /> : <FaChevronDown className='text-[16px]' />}</div>
          </div>

          { ColorToggle && (
            <div className='w-full animate-fade-up flex flex-wrap gap-2 justify-start items-center px-2'>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-400'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-200'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-500'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-600'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-700'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-800'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-green-400'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-400'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-400'></h1>
              <h1 className='cursor-pointer w-10 h-10 rounded-full bg-amber-400'></h1>

            </div>
          )}



          <div className='w-full flex justify-between items-center py-5'>
            <div className='text-black text-xl font-semibold'>Dress Style</div>
            <div className='text-black font-body text-2xl cursor-pointer' onClick={() => setStyleToggle(!StyleToggle)}>{StyleToggle ? <FaChevronUp className='text-[16px]' /> : <FaChevronDown className='text-[16px]' />}</div>
          </div>

          {StyleToggle && (
            <div className='w-full flex flex-col pb-5 gap-4 border-b-2 border-gray-400/30 animate-fade-up'>

              <div className='w-full flex justify-between'>
                <div className='text-text '>T-Shirt</div>
                <div className='cursor-pointer'><VscChevronRightCompact /></div>
              </div>
              <div className='w-full flex justify-between'>
                <div className='text-text'>T-Shirt</div>
                <div className='cursor-pointer'><VscChevronRightCompact /></div>
              </div>
              <div className='w-full flex justify-between'>
                <div className='text-text'>T-Shirt</div>
                <div className='cursor-pointer'><VscChevronRightCompact /></div>
              </div>
              <div className='w-full flex justify-between'>
                <div className='text-text'>T-Shirt</div>
                <div className='cursor-pointer'><VscChevronRightCompact /></div>
              </div>
              <div className='w-full flex justify-between'>
                <div className='text-text'>T-Shirt</div>
                <div className='cursor-pointer'><VscChevronRightCompact /></div>
              </div>

            </div>

          )}





        </div>

        {/*Right sidebar*/}
        <div className='lg:w-[80%] w-full rounded-4xl flex flex-col'>
          <div className=" grid grid-cols-2 lg:grid-cols-4 px-2  lg:px  justify-items-center">

            {CurrentProducts.map((item: any) => {
              return (
                <Link to={`/product/${item._id}`} key={item._id} >
                  <div key={item._id} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto animate-fade-up hover:scale-105 transition-transform duration-300 cursor-pointer ">
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

          <Pagination
            Products={Products}
            PostPerPage={PostPerPage}
            setCurrentPage={setCurrentPage}
            CurrentPage={CurrentPage} />
        </div>
      </div>



    </div>
  )
}

export default Shop