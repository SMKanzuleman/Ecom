import { useCart } from "../context/CartContext";
import { MdDelete } from "react-icons/md";
import logo from '../assets/logo.svg'
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { showErrorToast } from "../Utils/toast";
import API from "../Utils/API";


const Cart = () => {

  const { Cart, setCart, setIsCartOpen, IsCartOpen, CartPrice, UpdateQuantity } = useCart();

  const { Token, Name } = useAuth()

  const Remove = async (id: string, size: string, color: string, quantity: number) => {
    try {
      setCart((prev: any) => (
        prev.filter((item: any) =>
          !(item._id === id && item.Color === color && item.Size === size && item.Quantity === quantity)
        )))
      showErrorToast("Deleted from Frontend",)
      const res = await API.delete(`/cart/${id}`, {data: { Quantity: quantity, Sizes: size, Colors: color } })
      if (res.data) {
        showErrorToast("Dleted from DB also")
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-200 ${IsCartOpen ? "opacity-100 pointer-events-auto " : "opacity-0 pointer-events-none"
          }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[30%] bg-bg z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${IsCartOpen ? "translate-x-0" : "translate-x-full"
          }`}>


        <div className="w-full h-[10%] bg-amber-00 flex justify-between items-center px-10 border-b-2 border-gray-700/10">
          <div className="w-[40%] bg-amber-0 ">
            <p className="text-3xl text-black font-heading">👋 {Name}</p>
          </div>
          <button onClick={() => setIsCartOpen(!IsCartOpen)} className="btn-primary px-5 py-1">X</button>
        </div>

        <div className="flex-1 overflow-y-auto bg-amb00 relative bg-wh flex gap-5 flex-col justify-start py-10 px-10">

          {Cart.map((item) => {
            return (
              <div key={item._id} className="w-full bg-bg backdrop-blur-xs border border-gray-400/30 rounded-full p-3.5 flex items-center justify-between gap-2 shadow-xs hover:border-gray-400/60 transition-all">

                <div className="w-[20%] aspect-square flex items-center justify-center">
                 
                  <img
                    src={item.Imges?.[0]}
                    alt="Product"
                    className="w-full h-full aspect-square object-contain rounded-full"
                  />
                </div>

                <div className="w-[70%] flex flex-col items-start text-black">
                  <p>{item.Name}</p>

                  <div className="w-full flex items-center justify-start gap-15 px-2">

                    <div className="flex items-center gap-2">

                      <p className="text-wh px-2 text-xs flex justify-center items-center p-1  rounded-full bg-black">{item.Size}</p>
                      <p className={`w-7 h-7 rounded-full`}
                        style={{ backgroundColor: item.Color }}></p>
                    </div>

                    <div className=" bg-black rounded-full flex items-center justify-between overflow-hidden gap-3 px-3">
                      <button onClick={() => {
                        UpdateQuantity(item._id, item.Size, item.Color, item.Quantity - 1)

                      }}
                        className=" w-[30%] py-1 cursor-pointer font-bold hover:scale-150 duration-100 text-wh">
                        -
                      </button>
                      <div className="w-[40%] py-1 text-wh text-center">{item.Quantity}</div>
                      <button onClick={() => {
                        UpdateQuantity(item._id, item.Size, item.Color, item.Quantity + 1)
                      }}
                        className="w-[30%] text-wh py-1 cursor-pointer font-bold hover:scale-150 duration-100">
                        +
                      </button>
                    </div>

                  </div>
                </div>

                <div className="w-[10%] flex items-center justify-center gap-2">
                  <div className="text-black cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => { Remove(item._id, item.Size, item.Color, item.Quantity) }}>
                    <MdDelete className="text-xl" />
                  </div>
                </div>

              </div>
            )
          })}

        </div>

        <div className="w-full h-[15%]  gap-5 flex flex-col items-center justify-center border-t-2 border-gray-700/10">

          <div className="w-full px-10 flex justify-between items-center font-accent text-xl text-black">
            <p>Subtotal:</p>
            <p>Rs.{CartPrice}</p>
          </div>
          <Link to={`/checkout`} className="w-full flex justify-center items-center" onClick={() => setIsCartOpen(false)}>
            <button className="btn-primary w-[90%]">Proceed to CheckOut</button>
          </Link>
        </div>
      </div >
    </>
  );
};

export default Cart;