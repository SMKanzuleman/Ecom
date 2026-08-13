import { useCart } from "../context/CartContext";
import { MdDelete } from "react-icons/md";
import logo from '../assets/logo.svg'
import axios from "axios";
import { useAuth } from "../context/AuthContext";



const Cart = () => {
  const { Cart, setCart, setIsCartOpen, IsCartOpen, CartPrice, UpdateQuantity } = useCart();
  const { Token,Name } = useAuth()

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

        <div className="flex-1 overflow-y-auto bg-amb00 relative bg-wh flex gap-2 flex-col justify-start py-10">

          {Cart.map((item) => {
            return (
              <div key={item._id} className="w-full flex py border-b-2 border-gray-700/20 gap-3.5 px-5 lg:py-5 py-2">

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

                  <div className="w-[80%] bg-bg rounded-full flex  items-center justify-between overflow-hidden px-2">
                    <button onClick={() => {
                      UpdateQuantity(item._id, item.Size, item.Color, item.Quantity - 1)

                    }}
                      className=" w-[30%] py-2 cursor-pointer font-bold hover:scale-150 duration-100">
                      -
                    </button>
                    <div className="w-[40%] py-2 text-black text-center">{item.Quantity}</div>
                    <button onClick={() => {
                      UpdateQuantity(item._id, item.Size, item.Color, item.Quantity + 1)
                    }}
                      className="w-[30%] py-2 cursor-pointer font-bold hover:scale-150 duration-100">
                      +
                    </button>
                  </div>
                  <div className="text-black cursor-pointer hover:scale-110 transition-transform duration-300" onClick={() => { Remove(item._id, item.Size, item.Color, item.Quantity) }}>
                    <MdDelete />
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
          <button className="btn-primary w-[90%]">Proceed to CheckOut</button>
        </div>
      </div >
    </>
  );
};

export default Cart;