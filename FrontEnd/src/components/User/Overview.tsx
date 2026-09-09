import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


const Overview = ({ TotalOrders, TotalInProgress, TotalUserSpending, CancelledOrders, recentOrder }) => {

  const { Name } = useAuth()

  const [Expend, setExpend] = useState<boolean>(false);

  return (


    <div className='w-full lg:p-5 p-0 flex flex-col gap-5 animate-fade-up'>

      {/*Header Row*/}

      <div className="w-full flex justify-between py-5 px-7">
        <div className="lg:w-[80%] w-full font-accent text-black flex flex-col gap-1.5">
          <span className="font-bold text-4xl lg:text-4xl">Hey,{Name}👋</span>
          <span className="text-[14px] tracking text-text lg:block hidden font-heading">Here's a quick overview of your acounts.</span>
        </div>
      </div>

      {/* KPI Row */}

      <div className="w-full grid lg:grid-cols-4 grid-cols-4 justify-center lg:px-0 px-5  gap-4">
        {/*KPI */}



        <div className=" bg-wh  flex justify-between rounded-lg p-5 gap-0.5 relative">

          <div className="flex flex-col justify-between items gap-1">
            <span className="font-accent tracking-wider  text-text">Total Orders</span>
            <div className="font-heading text-5xl font-semibold text-black font-">{TotalOrders}</div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <GiShoppingBag className="text-lg" />
          </div>


        </div>

        <div className=" bg-wh  flex justify-between rounded-lg p-5 gap-0.5 relative">

          <div className="flex flex-col justify-between items gap-1">
            <span className="font-accent tracking-wider  text-text">In Progress</span>
            <div className="font-heading text-5xl font-semibold text-black font-">{TotalInProgress}</div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <GiShoppingBag className="text-lg" />
          </div>


        </div>

        <div className=" bg-wh  flex justify-between rounded-lg p-5 gap-0.5 relative">

          <div className="flex flex-col justify-between items gap-1">
            <span className="font-accent tracking-wider  text-text">Cancelled Orders</span>
            <div className="font-heading text-5xl font-semibold text-black font-">{CancelledOrders}</div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <GiShoppingBag className="text-lg" />
          </div>


        </div>

        <div className=" bg-wh  flex justify-between rounded-lg p-5 gap-0.5 relative ">

          <div className="flex flex-col justify-between items gap-1">
            <span className="font-accent text- tracking-wider  text-text">Total Spent</span>
            <div className="font-heading font-semibold text-5xl text-black">{TotalUserSpending}<span className="text-xs text-text font-accent uppercase tracking-widest">pkr</span> </div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <HiMiniCurrencyDollar className="text-3xl" />
          </div>


        </div>


      </div>

      {/*Heading  */}

      <div className="w-full text-3xl px-5 font-accent text-black font-bold  pt-10 border-b-2 border-gray-700/10 ">
        Most Recent Order
      </div>

      {/* Recent order */}

      {recentOrder ? (
        <div className="w-full bg-wh rounded-lg shadow-xs border-2 border-gray-700/5 p-5 ">

          {/* Header */}

          <div className="w-full flex justify-between items-center">

            <div className="flex flex-col justify-center items-start">
              <div className="text-xl font-semibold text-black font-accent" >OrderId :{recentOrder._id}</div>
              <div className=" text-[14px]" >Placed on {recentOrder?.createdAt
                ? new Date(recentOrder.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
                : "Recently"}</div>
            </div>

            <div className="px-3 py-1 bg-black text-wh rounded-full">{recentOrder.OrderStatus}</div>
          </div>

          {/* Content */}

          <div className=" py-5">
            {/* Left */}
            <div className="grid grid-cols-2 lg:grid-cols-5 flex-wrap gap-5 ">

              {!Expend ?
                <>
                  {
                    recentOrder?.OrderItems?.slice(0, 1).map((item, index) => (
                      <div key={index} className="lg:w-50 w-40 flex flex-col  bg-bg p-1 gap-0 rounded-lg animate-fade-up">
                        <img src={item.ProductId?.Images?.[0]} alt="product" className="aspect-square object-cover rounded-lg" />
                        <div className="text-lg text-black  truncate  ">{item.Name}</div>
                        <div className="text-md font-b">Quantity:{item.Quantity}</div>
                      </div>

                    ))}

                  <div className="bg-bg rounded-lg flex flex-col gap-2 lg:col-span-1   p-5 justify-between h-full">
                    <div className="flex flex-col">

                      <div className="font-accent text-xl font-semibold text-black">Summary</div>
                      <div>Items: <span>{recentOrder.OrderItems.length}</span></div>
                      <div>Price: <span>{recentOrder.OrderPrice}</span></div>
                    </div>
                    {recentOrder.OrderItems.length !== 1 && (

                      <div onClick={() => setExpend(!Expend)} className="w-full cursor-pointer border-2 border-black  rounded-full text-black flex items-center justify-center">
                        {recentOrder.OrderItems.length - 1}+ items

                      </div>
                    )}


                  </div>


                </>
                :
                <>
                  {
                    recentOrder.OrderItems.map((item, index) => (
                      <div key={index} className="w-50 flex flex-col bg-bg p-1 rounded-lg animate-fade-up">
                        <img src={item.Images[0]} alt="" className="aspect-square object-cover rounded-lg" />
                        <div className="text-lg text-black font-bold truncate ">{item.Name}</div>
                        <div className="text-md ">Q:{item.Quantity}</div>
                      </div>
                    ))
                  }
                  <div onClick={() => setExpend(!Expend)} className="w-40 cursor-pointer  rounded-lg flex items-center justify-center">
                    <div className="border-2 border-black rounded-full px-5 text-black font-semibold">Show Less</div>

                  </div>

                </>
              }


            </div>


          </div>


        </div>

      ) : (

        <div className="w-full bg-wh rounded-lg p-10 flex flex-col items-center justify-center text-center text-gray-500 border border-dashed border-gray-200">
          <GiShoppingBag className="text-4xl text-gray-300 mb-2" />
          <p className="font-semibold text-base text-gray-700">No orders placed yet</p>
          <p className="text-sm text-gray-400">Once you place an order, it will appear right here.</p>
        </div>
      )}









    </div >
  )
}

export default Overview