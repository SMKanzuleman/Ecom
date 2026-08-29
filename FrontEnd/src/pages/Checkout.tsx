import { useCart } from "../context/CartContext"
import logo from '../assets/logo.svg'
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "../Utils/toast";
import API from "../Utils/API";
import { Navigate, useNavigate } from "react-router-dom";


const Checkout = () => {

  const standard = 250;
  const express = 350;
  const { Cart, setCart, CartPrice } = useCart()
  const { Token } = useAuth()

  const [Menu, setMenu] = useState("Shipping")

  const {ClearCart}=useCart()
  const Navigate=useNavigate()


  const [Payment, setPayment] = useState<"cod" | "bank">("cod")
  const [DeliveryMethod, setDeliveryMethod] = useState("standard");

  const [ShippingAddress, setShippingAddress] = useState({ Phone: "", RFName: "", RLName: "", Address: "", LandMark: "", City: "", State: "", Zip: "" });

  const [PaymentDetail, setPaymentDetail] = useState<{ Type: "cod" | "bank"; CardNumber: string; CVV: string; MMYY: string; }>({ Type: "cod", CardNumber: "", CVV: "", MMYY: "", });




  const DeliveryPrice = DeliveryMethod === "standard" ? standard : express

  const PlaceOrder = async (e:React.FormEvent) => {
    try {
      e.preventDefault()
      const res=await API.post("/order",{Address:ShippingAddress,Payment:PaymentDetail})
      if(res.data){
        showSuccessToast("🥳Congratulation.🎉")
        await ClearCart()
        Navigate("/")
      }

    } catch (error: any) {
      console.error(error)
      const message = error.response?.data?.message || error.message || "Something went wrong!";
      showErrorToast(message)

    }
  }



  const Remove = async (id: string, size: string, color: string, quantity: number) => {
    try {
      setCart((prev: any) => (
        prev.filter((item: any) =>
          !(item._id === id && item.Color === color && item.Size === size, item.Quantity === quantity)
        )))
      showSuccessToast("Deleted from Frontend",)
      const res = await API.delete(`/cart/${id}`,{ data: { Quantity: quantity, Sizes: size, Colors: color } })
      if (res.data) {
        showSuccessToast("Dleted from DB also")
      }
    } catch (error) {
      console.error(error)
      console.error(error)
    }
  }



  return (
    <div className="w-full flex lg:flex-row flex-col bg-bg lg:h-[90vh]">

      <div className="w-full lg:w-[70%] h-full lg:px-20 px-10 py-5 overflow-y-auto no-scrollbar">

        {/*Header*/}
        <div className="w-full flex items-center justify-between py-5">
          <div className="w-auto flex flex-col items-center gap-2">
            <div className="w-20 h-10 rounded-full bg-black text-wh flex justify-center items-center">✔︎</div>
            <div className="w-full text-sm text-center font-heading">{Menu}</div>
          </div>

          <div className="flex-1 border-t-2 border-gray-700/30 border-dashed mx-2 mb-6"></div>

          <div className="w-auto flex flex-col items-center gap-2">
            <div className="w-20 h-10 rounded-full bg-black text-wh flex justify-center items-center"><FaCartShopping /></div>
            <div className="w-full text-sm font-heading text-center">{Menu}</div>
          </div>
          <div className="flex-1 border-t-2 border-gray-700/30 border-dashed mx-2 mb-6"></div>
          <div className="w-auto flex flex-col items-center gap-2">
            <div className="w-20 h-10 rounded-full bg-black text-wh flex justify-center items-center"><MdOutlinePayment /></div>
            <div className="w-full font-heading text-center text-sm">{Menu}</div>
          </div>
        </div>
        {/*Shipping Address*/}

        <div className="w-full">
          <div className="w-full font-accent text-black text-2xl font-semibold py-2" >
            Shipping Address
          </div>
          <form action=""
            className="w-full flex flex-col gap-2">

            <div className="w-full">
              <input required={true} value={ShippingAddress.Phone} onChange={(e) => setShippingAddress({ ...ShippingAddress, Phone: e.target.value })} type="number" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Phone" />
            </div>
            <div className="w-full flex items-center gap-3  justify-between">
              <input required={true} value={ShippingAddress.RFName} onChange={(e) => setShippingAddress({ ...ShippingAddress, RFName: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Recipient's First Name" />
              <input required={true} value={ShippingAddress.RLName} onChange={(e) => setShippingAddress({ ...ShippingAddress, RLName: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Recipient's Last Name" />
            </div>
            <div className="w-full">
              <input required={true} value={ShippingAddress.Address} onChange={(e) => setShippingAddress({ ...ShippingAddress, Address: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Address" />
            </div>
            <div className="w-full">
              <input required={true} value={ShippingAddress.LandMark} onChange={(e) => setShippingAddress({ ...ShippingAddress, LandMark: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Apartment, suit, etc,(optional)" />
            </div>
            <div className="w-full flex items-center gap-3  justify-between">
              <input required={true} value={ShippingAddress.City} onChange={(e) => setShippingAddress({ ...ShippingAddress, City: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="City" />
              <input required={true} value={ShippingAddress.State} onChange={(e) => setShippingAddress({ ...ShippingAddress, State: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="State" />
              <input required={true} value={ShippingAddress.Zip} onChange={(e) => setShippingAddress({ ...ShippingAddress, Zip: e.target.value })} type="text" className="w-full rounded-full px-5 bg-wh border-2 border-gray-400/40 focus:outline-none text-black py-3" placeholder="Zipcode" />
            </div>

            {/*Shipping Methood*/}

            <div className="w-full lg:py-10 py-5">

              <div className="w-full font-accent text-black text-2xl font-semibold py-2" >
                Shipping Methood
              </div>
              <form action=""
                className="w-full flex flex-col bg-wh rounded-2xl border-2 border-gray-400/40">

                <label htmlFor="standard" className=" cursor-pointer py-3 px-10 w-full flex justify-between items-center border-b-2 border-gray-400/40" onClick={() => { setDeliveryMethod("standard") }}>
                  <div className=" flex gap-3.5 items-center">
                    <input type="radio" id="standard" name="sm" defaultChecked className="w-4 h-4 accent-black" />
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-black">Standard shipping</div>
                      <p className="text-sm">3 to 5 days</p>
                    </div>
                  </div>
                  <div className="font-accent text-black text-xl">Rs.{standard}</div>
                </label>

                <label htmlFor="express" className="cursor-pointer py-3 px-10 w-full flex justify-between items-center" onClick={() => { setDeliveryMethod("express") }}>
                  <div className="flex gap-3.5 items-center">
                    <input type="radio" id="express" name="sm" className="w-4 h-4 accent-black" />
                    <div className="flex flex-col items-start justify-center">
                      <div className="text-black">Express shipping</div>
                      <p className="text-sm">2 days</p>
                    </div>
                  </div>
                  <div className="font-accent text-xl text-black">Rs.{express}</div>
                </label>
              </form>
            </div>

            {/*Payment Methood*/}


            <div className="w-full py-10">

              <div className="w-full font-accent text-black text-2xl font-semibold py-2" >
                Payment Methood
              </div>
              <form className="w-full flex flex-col bg-white rounded-2xl border-2 border-gray-400/40 overflow-hidden">

                <label
                  htmlFor="cod"
                  className="cursor-pointer py-3.5 px-10 w-full flex justify-start gap-3.5 items-center border-b-2 border-gray-400/40"
                >
                  <input
                    type="radio"
                    id="cod"
                    name="pm"
                    // checked={Payment === "cod"}
                    value={PaymentDetail.Type}
                    onChange={(e) => setPaymentDetail({ ...PaymentDetail, Type: "cod" })}
                    className="cursor-pointer accent-black w-4 h-4"
                  />
                  <div className="text-black font-medium">Cash on Delivery</div>
                </label>

                <label
                  htmlFor="bank"
                  className="cursor-pointer gap-3.5 py-3.5 px-10 w-full flex justify-start items-center hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    id="bank"
                    name="pm"
                    value={PaymentDetail.Type}
                    onChange={(e) => setPaymentDetail({ ...PaymentDetail, Type: "bank" })}
                    className="cursor-pointer accent-black w-4 h-4"
                  />
                  <div className="text-black font-medium">Bank Transfer VISA card</div>
                </label>

                {PaymentDetail.Type === "bank" && (
                  <div className="w-full py-5 flex flex-col gap-3.5 px-10 bg-gray-50/70 border-t border-gray-200">
                    <div className="w-full">
                      <input
                        required={true}
                        value={PaymentDetail.CardNumber}
                        onChange={(e) => setPaymentDetail({ ...PaymentDetail, CardNumber: e.target.value })}

                        type="text"
                        className="w-full rounded-full px-5 bg-white border-2 border-gray-400/40 focus:outline-none text-black py-3 text-sm"
                        placeholder="Card Number (16 digits)"
                      />
                    </div>
                    <div className="w-full flex justify-between gap-3">
                      <input
                        required={true}
                        value={PaymentDetail.MMYY}
                        onChange={(e) => setPaymentDetail({ ...PaymentDetail, MMYY: e.target.value })}
                        type="text"
                        className="w-full rounded-full px-5 bg-white border-2 border-gray-400/40 focus:outline-none text-black py-3 text-sm"
                        placeholder="MM / YY"
                      />
                      <input
                        required={true}
                        value={PaymentDetail.CVV}
                        onChange={(e) => setPaymentDetail({ ...PaymentDetail, CVV: e.target.value })}
                        type="text"
                        className="w-full rounded-full px-5 bg-white border-2 border-gray-400/40 focus:outline-none text-black py-3 text-sm"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                )}

              </form>



            </div>

            {/*SUbmit Button*/}
            <div className="w-full  flex justify-end">
              <button className="btn-primary lg:w-[20%] w-full" onClick={(e)=>PlaceOrder(e)}>
                Place order
              </button>

            </div>





          </form>
        </div>






      </div>

      <div className="w-full lg:w-[30%] h-full border-l-2 border-gray-400/30 px-10 pt-5 flex flex-col">
        <div className="font-accent text-black text-2xl font-medium">Order summary</div>

        <div className="w-full flex-1 overflow-y-auto space-y-1 py-3 no-scrollbar overflow-hidden px-5 flex flex-col gap-2 ">

          {Cart.map((item) => {
            return (
              <div key={item._id} className="w-full bg-white/70 backdrop-blur-xs border border-gray-400/30 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-gray-400/60 transition-all">

                <div className="w-[10%]  flex items-center h-auto rounded-4xl">
                  <img src={item.Imges?.[0]} alt="Logo" />
                </div>

                <div className="w-[60%] flex flex-col items-start text-black ">
                  <p>{item.Name}</p>
                  <div className="w-full flex items-center justify-start gap-5 px-2">
                    <p className="text-text p-2 bg-black rounded-full w-5 h-5 flex items-center justify-center">{item.Size}</p>
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
              <div className="font-heading t text-black">{DeliveryPrice}</div>
            </div>
            <div className="flex justify-between px-0 py-5 border-t-2 border-gray-400/30">
              <div className="font-body text-[16px]">Total</div>
              <div className="font-accent t text-black text-xl">Rs.{CartPrice + DeliveryPrice}</div>
            </div>

          </div>
        </div>


      </div>


    </div>
  )
}

export default Checkout