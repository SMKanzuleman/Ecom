import { useEffect, useState } from 'react'
import heroimg from '../assets/Stickman_shop.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaChevronUp } from "react-icons/fa";
import Pagination from '../components/Pagination';
import { VscChevronRightCompact } from "react-icons/vsc";
import { FaChevronDown } from "react-icons/fa6";
import API from '../Utils/API';
import { ProductImage } from '../Utils/ProductImage';
import Button from '../animated components/Button';
import { motion } from "motion/react";
import { fadeInDown, productcards, staggerContainer } from '../Utils/Motion';


const Shop = () => {

  const [Loading, setLoading] = useState(false);

  const { name, type } = useParams()
  const navigate = useNavigate()

  const MIN = 0;
  const MAX = 10000;
  const [MinPrice, setMinPrice] = useState(MIN)
  const [MaxPrice, setMaxPrice] = useState(MAX)
  const MinPos = ((MinPrice - MIN) / (MAX - MIN) * 100)
  const MaxPos = ((MaxPrice - MIN) / (MAX - MIN) * 100)

  const [Products, setProducts] = useState<any>([])


  const [Categories, setCategories] = useState<any>([]);
  const [Colors, setColors] = useState<any>([]);
  const [Styles, setStyles] = useState<{ Name: string, Categories: string[] }[]>([]);

  const [SelectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [SelectedColor, setSelectedColors] = useState<string | null>(null);
  const [SelectedStyle, setSelectedStyle] = useState<{ Name: string, Categories: string[] }>();

  const FilteredProducts = Products.filter((p: any) => {

    const MatchCategory = SelectedCategory ? p.Category === SelectedCategory : true;
    const MatchColor = SelectedColor ? p.Colors.includes(SelectedColor) : true;
    const MatchStyle = SelectedStyle ? SelectedStyle.Categories.includes(p.Category) : true;
    const MatchPrice = p.Price >= MinPrice && p.Price <= MaxPrice

    return (MatchCategory && MatchColor && MatchPrice && MatchStyle)


  })

  const [CurrentPage, setCurrentPage] = useState(1)
  const [PostPerPage, setPostPerPage] = useState(50)
  const LastIndex = CurrentPage * PostPerPage;
  const FirstIndex = LastIndex - PostPerPage

  const [PriceToggle, setPriceToggle] = useState(false)
  const [StyleToggle, setStyleToggle] = useState(false)
  const [ColorToggle, setColorToggle] = useState(false)


  const FetchProducts = async () => {
    try {
      setLoading(true)


      const res = await API.get("/products", {
        params: {
          category: SelectedCategory,
          color: SelectedColor,
          style: SelectedStyle ? SelectedStyle.Categories.join(",") : undefined,
          MinPrice,
          MaxPrice
        }
      })

      if (res.data.AllProducts) {
        let allProds = res.data.AllProducts || []

        if (type === "category" && name) {
          allProds = allProds.filter((p: any) => p.Category?.toLowerCase() === name.toLowerCase());
        }
        if (type === "style" && name) {
          allProds = allProds.filter((p: any) => p.Style?.toLowerCase() === name.toLowerCase());
        }
        setProducts(allProds)
      }

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }

  }
  const FetchFilterData = async () => {
    try {
      const res = await API.get("/products/FilterData")
      const { Categories, Colors, Styles } = res.data.data || res.data;
      if (res.data) {
        setCategories(Categories)
        setColors(Colors)
        setStyles(Styles)
      }
      console.log(res.data);

    } catch (err) {
      console.error(err)
    }
  }

  const ClearAllFilters = () => {
    setSelectedCategory(null)
    setSelectedColors(null)
    setSelectedStyle(null)
    setMinPrice(MIN)
    setMaxPrice(MAX)
    setCurrentPage(1)

    if (name || type) {
      navigate("/shop");
    }

  }
  const hasActiveFilters =
    SelectedCategory !== null ||
    SelectedColor !== null ||
    SelectedStyle !== null ||
    MinPrice !== MIN ||
    MaxPrice !== MAX;




  useEffect(() => {
    FetchProducts()
    FetchFilterData()
  }, [SelectedCategory, SelectedColor, SelectedStyle, MinPrice, MaxPrice, name, type])

  return (
    <motion.div
      variants={staggerContainer(0.08, 0.1)}
      initial={"hidden"}
      animate={"visible"}
      className="w-full bg-wh  flex flex-col">
      {/*Header*/}
      <motion.div
        variants={fadeInDown}
        className='w-full bg-black px-20 h-[200px] flex justify-between items-center relative'>
        <div className='flex justify-center items-center w-full'>
          <h1 className='font-accent text-4xl font-semibold text-wh'>{name ? name : "Shop"}</h1>
        </div>
        <div className='absolute lg:right-28 right-3 lg:top-7 top-24'>
          <img src={heroimg} alt="" className='lg:w-52 w-32' />
        </div>
      </motion.div>
      {/*Body*/}
      <div className="w-full flex flex-col lg:flex-row lg:px-10 py-32">

        {/*Left sidebar*/}

        <motion.div variants={fadeInDown} className='lg:w-[20%] w-full rounded-4xl  bg-bg flex flex-col px-10 py-5 h-fit'>

          <div className='w-full flex justify-between items-center py-5 border-b-2 border-gray-400/30'>
            <div className='text-black text-xl font-semibold'>Filters</div>
            {hasActiveFilters || name && <Button className='py-2 w-auto rounded-full bg-red-600' onClick={() => ClearAllFilters()}>clear</Button>}
          </div>

          {/* categories */}
          <div className='w-full flex flex-col  py-5 gap-5 border-b-2 border-gray-400/30'>

            {Categories.slice(10, 15).map((cat, index) => (
              <Link to={`/category/${cat}`} target="_blank" rel="noopener noreferrer" key={index} className='w-full flex justify-between  cursor-pointer' onClick={() => setSelectedCategory(cat)}>
                <div className='text-text hover:text-black'>{cat}</div>
                <div className=' hover:text-black'><VscChevronRightCompact /></div>
              </Link>

            ))}


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
          {/* Colors */}
          {ColorToggle && (
            <div className='w-full animate-fade-up flex flex-wrap gap-2 justify-start items-center px-2'>
              {Colors.slice(0, 10).map((c: any) => (
                <div onClick={() => setSelectedColors(c)} style={{ background: c }} className={`cursor-pointer w-10 h-10 rounded-full `}></div>

              ))}

            </div>
          )}

          <div className='w-full flex justify-between items-center py-5'>
            <div className='text-black text-xl font-semibold'>Dress Style</div>
            <div className='text-black font-body text-2xl cursor-pointer' onClick={() => setStyleToggle(!StyleToggle)}>{StyleToggle ? <FaChevronUp className='text-[16px]' /> : <FaChevronDown className='text-[16px]' />}</div>
          </div>

          {/* Dress Style */}
          {StyleToggle && (
            <div className='w-full flex flex-col pb-5 gap-4 border-b-2 border-gray-400/30 animate-fade-up'>

              {Styles.map((s, index) => (
                <Link to={`/styles/${s.Name}`} onClick={() => setSelectedStyle(s)} key={index} className='w-full flex justify-between  cursor-pointer'>
                  <div className='text-text hover:text-black'>{s.Name}</div>
                  <div className=' hover:text-black'><VscChevronRightCompact /></div>
                </Link>

              ))}
            </div>

          )}


        </motion.div>

        {/*Right sidebar*/}
        <div className='lg:w-[80%] w-full rounded-4xl flex flex-col'>
          <motion.div
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden"
            whileInView="visible"
            key={Products.length > 0 ? "loaded" : "loading"}
            className=" grid grid-cols-2 lg:grid-cols-4 px-2  lg:gap-3  justify-items-center">

            {Loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
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

              Products.slice(FirstIndex, LastIndex).map((item: any) => {
                return (
                  <Link to={`/product/${item._id}`} key={item._id} >
                    <motion.div
                      variants={productcards}
                      initial="hidden"
                      whileInView="visible"                     // 👈 Jab ye card scroll mein aayega TAB chalega
                      viewport={{once:true, amount: 0.2 }}     // 👈 Card ka 20% samne aate hi trigger hoga
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      whileHover={{
                        rotateX: 10,       // 👈 3D Tilt upar/neeche
                        rotateY: 10,      // 👈 3D Tilt left/right
                        scale: 1.05,       // 👈 Halka sa zoom
                        y: -8              // 👈 Halka sa lift
                      }}
                      key={item._id} className="lg:w-62.5 w-50 py-3 lg:py-0 h-auto  cursor-pointer ">
                      <ProductImage src={item.Images[0]} alt='No Image' className='aspect-4/5' />
                      <p className="font-heading text-left text-black text-lg pt-2 px-3">{item.Name}</p>
                      <div className="flex justify-between px-3 py-1">
                        <p className="font-heading text-left text-black text-xl font-semibold py-0"><span className="font-heading">Rs.</span>{item.Price}</p>
                      </div>
                    </motion.div>
                  </Link>
                )
              })

            )}

          </motion.div>

          <Pagination
            Products={FilteredProducts}
            PostPerPage={PostPerPage}
            setCurrentPage={setCurrentPage}
            CurrentPage={CurrentPage} />
        </div>
      </div>



    </motion.div>
  )
}

export default Shop