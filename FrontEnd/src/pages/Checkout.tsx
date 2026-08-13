import { useCart } from "../context/CartContext"
import logo from '../assets/logo.svg'
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


const Checkout = () => {

  const { Cart,setCart,CartPrice } = useCart()
  const {Token} =useAuth()

    const Remove = async (id: string, size: string, color: string, quantity: number) => {
    try {
      setCart((prev: any) => (
        prev.filter((item: any) =>
          !(item._id === id && item.Color === color && item.Size === size, item.Quantity === quantity)
        )))
      console.log("Deleted from Frontend",)
      const res = await axios.delete(`http://localhost:2026/cart/${id}`, { headers: { Authorization: `Bearer ${Token}` }, data: { Quantity: quantity, Size: size, Color: color }, })
      if (res.data) {
        console.log("Dleted from DB also")
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="w-full flex bg-bg h-[90vh]">
      <div className="w-[70%] h-full">

        <h1 className="text-heading text-8xl">Mian bundi hon
          Mian bundi hon.Mian bundi hon.Mian bundi hon.vMian bundi hon.Mian bundi hon.Mian bundi hon
        </h1>

      </div>

      <div className="w-[30%] h-full border-l-2 border-gray-400/30 px-10 pt-5 flex flex-col">
        <div className="font-accent text-black text-2xl font-medium">Order summary</div>

        <div className="w-full flex-1 overflow-y-auto space-y-1 py-3 no-scrollbar overflow-hidden px-5 flex flex-col gap-2 ">

          {Cart.map((item) => {
            return (
              <div key={item._id} className="w-full bg-white/70 backdrop-blur-xs border border-gray-400/30 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-gray-400/60 transition-all">

                <div className="w-[10%]  flex items-center h-auto rounded-4xl">
                  <img src={logo} alt="Logo" />
                </div>

                <div className="w-[60%] flex flex-col items-start text-black">
                  <p>{item.Name}</p>
                  <div className="w-full flex items-center justify-start gap-5">
                    <p className="text-text">{item.Size}</p>
                    <p className={`w-5 h-5 rounded-full`}
                      style={{ backgroundColor: item.Color }}></p>
                  </div>
                </div>

                <div className="w-[30%] flex items-center justify-between gap-2">
                  <div className="w-full py-2 text-black text-center font-accent">Rs.{item.Price}</div>
                  <div className="text-black cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => { Remove(item._id, item.Size, item.Color, item.Quantity) }}>
                    <MdDelete />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t-2 bg-amber-00 border-gray-400/30 flex flex-col gap-5">
          <div className="w-full flex justify-between px-0">
            <input type="text" className="btn-primary w-[70%] bg-wh border-2 border-gray-700/30 focus:outline-none cursor-auto text-black py-2" placeholder="promo code" />
            <button className="btn-primary py-2">Apply</button>
          </div>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between px-0 py-0">
              <div className="font-body text-[16px]">Subtotal</div>
              <div className="font-accent  text-black">Rs.{CartPrice}</div>
            </div>
            <div className="flex justify-between px-0 pb-5">
              <div className="font-body text-[16px]">Shipping</div>
              <div className="font-heading t text-black">Not Selected yet</div>
            </div>
            <div className="flex justify-between px-0 py-5 border-t-2 border-gray-400/30">
              <div className="font-body text-[16px]">Total</div>
              <div className="font-accent t text-black text-xl">Rs.{CartPrice}</div>
            </div>

          </div>
        </div>


      </div>


    </div>
  )
}

export default Checkout