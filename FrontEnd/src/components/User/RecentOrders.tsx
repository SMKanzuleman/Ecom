import { useState } from 'react'

const RecentOrders = ({ MyOrders }) => {

  const [SelectOrders, setSelectOrders] = useState("All");


  const FilteredOrders = SelectOrders === "All" ? MyOrders : MyOrders.filter((item) => item.OrderStatus === SelectOrders);

  const [ExpendId, setExpendId] = useState<string | null>(null);

  const PLACEHOLDER_IMG = "https://placehold.co/400x400/f4f4f5/71717a/png?text=📦+No+Image+Found&font=inter";

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-600 text-white";
      case "processing":
        return "bg-amber-500 text-white ";
      case "shipped":
        return "bg-blue-600 text-white";
      case "cancelled":
        return "bg-red-600 text-white ";
      default:
        return "bg-black text-white  ";
    }
  };



  return (
    <div className='w-full flex flex-col gap-5'>

      {/* Header */}

      <div className="w-full flex lg:flex-row flex-col lg:justify-between py-5  items-center gap-5 overflow-hidden">

        <div className="font-accent text-black flex flex-col gap-1.5">
          <span className="font-bold text-4xl lg:text-4xl">My Orders</span>
          <span className="text-[14px] tracking text-text lg:block hidden font-heading">Here's a quick overview of your orders.</span>
        </div>

        <div className='bg-wh rounded-full flex  justify-between lg:gap-3 lg:text-[14px]  text-xs h-fit p-1 w-fit overflow-hidden'>
          <button onClick={() => setSelectOrders("All")} className={`btn-primary py-2  ${SelectOrders === "All" ? "bg-black  text-wh" : " bg-wh text-text"}`}>All</button>
          <button onClick={() => setSelectOrders("processing")} className={`btn-primary py-1 ${SelectOrders === "processing" ? "bg-amber-500  text-wh" : " bg-wh text-text"}`}>Processing</button>
          <button onClick={() => setSelectOrders("shipped")} className={`btn-primary py-1 ${SelectOrders === "shipped" ? "bg-blue-600  text-wh" : " bg-wh text-text"}`}>Shipped</button>
          <button onClick={() => setSelectOrders("delivered")} className={`btn-primary py-1 ${SelectOrders === "delivered" ? "bg-green-600 text-wh" : " bg-wh text-text"}`}>Delivered</button>
          <button onClick={() => setSelectOrders("cancelled")} className={`btn-primary py-1 ${SelectOrders === "cancelled" ? "bg-red-600  text-wh" : " bg-wh text-text"}`}>Cancelled</button>
        </div>

      </div>

      {/* Orders */}

      <div className='grid lg:grid-cols-3 gap-5 items-start'>

        {FilteredOrders.map((o, index) => {

          const Expend = ExpendId === o._id

          return (

            <div className="w-full flex flex-col  justify-between  bg-wh rounded-lg shadow-xs border-2 border-gray-700/5 p-5 ">

              {/* Header */}

              <div className="w-full flex justify-between items-center">

                <div className="flex flex-col justify-center items-start">
                  <div className="text-xl font-semibold text-black font-accent" >OrderId: {o._id.slice(0, 9)}</div>
                  <div className=" text-[14px]" >Placed {o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-US",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                    :
                    "Recently"
                  }
                  </div>
                </div>
                <div className={`px-5 rounded-full ${getStatusBadge(o.OrderStatus)}`}>{o.OrderStatus}</div>
              </div>

              {/* Content */}

              <div className={`flex flex-col  ${Expend ? "justify-start gap-5" : "justify-between gap-30"} h-full  pt-5 `}>

                {!Expend ?
                  <>
                    {
                      o.OrderItems.slice(0, 1).map((item, index) => (
                        <div key={index} className=" flex items-center justify-between bg-wh p-1 gap-2 rounded-lg animate-fade-up">
                          <div className='flex gap-5 items-center'>
                            <img src={item.ProductId?.Images[0] || PLACEHOLDER_IMG} alt="" className="w-20 h-20 object-cover rounded-lg" />
                            <div className='flex flex-col gap-0'>
                              <div className="text-lg font-semibold text-black  truncate  ">{item.Name}</div>
                              <div className="text-md font-b">Quantity:{item.Quantity}</div>
                            </div>
                          </div>
                          {o.OrderItems.length !== 1 && (
                            <div onClick={(e) => {
                              e.stopPropagation()
                              setExpendId(o._id)
                            }} className="w-fit px-5 cursor-pointer border-2 border-black  rounded-full text-black flex items-center justify-center">
                              {o.OrderItems.length - 1}+

                            </div>
                          )}
                        </div>

                      ))}


                    <div className="flex flex-col justify-end">
                      <div className="bg-bg rounded-lg  h-fit flex flex-col gap  p-5">
                        <div className="font-accent text-xl font-semibold text-black">Summary</div>
                        <div className='text-md'>Items: <span>{o.OrderItems.length}</span></div>
                        <div className='text-md'>Price: <span>Rs.{Math.round(o.OrderPrice)}</span></div>
                      </div>



                    </div>

                  </>
                  :
                  <>
                    {
                      o.OrderItems.map((item, index) => (
                        <div key={index} className=" flex items-center justify bg-wh p-1 gap-2 rounded-lg animate-fade-up">
                          <div className='flex gap-5 items-center'>
                            <img src={item.ProductId?.Images[0] || PLACEHOLDER_IMG} alt="" className="w-20 h-20 object-cover rounded-lg" />
                            <div className='flex flex-col gap-0'>
                              <div className="text-lg font-semibold text-black  truncate  ">{item.Name}</div>
                              <div className="text-md font-b">Quantity:{item.Quantity}</div>
                            </div>
                          </div>

                        </div>

                      ))}

                    <div onClick={() => setExpendId(null)} className="w-full cursor-pointer  rounded-lg flex items-center justify-center">
                      <div className="border-2 border-black rounded-full px-5 text-black font-semibold">Show Less</div>

                    </div>

                  </>
                }

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default RecentOrders