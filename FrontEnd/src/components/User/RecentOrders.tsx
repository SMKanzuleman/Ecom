import {  useState } from 'react'

const RecentOrders = () => {

  const [Orders, setOrders] = useState("All");

  const OrderList = [
    {
      _id: "ORD-896456",
      createdAt: "2026-08-28T12:00:00.000Z",
      OrderStatus: "Shipped", // "Processing" | "Shipped" | "Delivered" | "Cancelled"
      PaymentStatus: "paid",
      PaymentMethod: "COD",
      OrderPrice: 2501,
      Address: {
        Location: "Lahore, KSK",
        City: "Lahore",
        State: "Punjab"
      },
      OrderItems: [
        {
          _id: "item1",
          Name: "Essential Black Tee",
          Quantity: 2,
          PriceAtPurchase: 500,
          Images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"]
        },
        {
          _id: "item2",
          Name: "Raw Denim Jeans",
          Quantity: 1,
          PriceAtPurchase: 1000,
          Images: ["https://images.unsplash.com/photo-1542272604-780c96856592?w=500"]
        },
        {
          _id: "item3",
          Name: "Leather Sneakers",
          Quantity: 1,
          PriceAtPurchase: 700,
          Images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"]
        },
        {
          _id: "item4",
          Name: "Oversized Cotton Hoodie",
          Quantity: 2,
          PriceAtPurchase: 301,
          Images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500"]
        },
        {
          _id: "item5",
          Name: "Silver Minimalist Chain",
          Quantity: 1,
          PriceAtPurchase: 200,
          Images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"]
        }
      ]
    },
    {
      _id: "ORD-896457",
      createdAt: "2026-08-22T09:30:00.000Z",
      OrderStatus: "Processing",
      PaymentStatus: "pending",
      PaymentMethod: "COD",
      OrderPrice: 12500,
      Address: {
        Location: "Model Town, House 42",
        City: "Lahore",
        State: "Punjab"
      },
      OrderItems: [
        {
          _id: "item6",
          Name: "Classic Bomber Jacket",
          Quantity: 1,
          PriceAtPurchase: 12500,
          Images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"]
        }
      ]
    },
    {
      _id: "ORD-896458",
      createdAt: "2026-08-15T16:45:00.000Z",
      OrderStatus: "Delivered",
      PaymentStatus: "paid",
      PaymentMethod: "VISA Card",
      OrderPrice: 18400,
      Address: {
        Location: "DHA Phase 5, Street 12",
        City: "Lahore",
        State: "Punjab"
      },
      OrderItems: [
        {
          _id: "item7",
          Name: "Minimalist Chronograph Watch",
          Quantity: 1,
          PriceAtPurchase: 12000,
          Images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500"]
        },
        {
          _id: "item8",
          Name: "Vintage Canvas Backpack",
          Quantity: 1,
          PriceAtPurchase: 6400,
          Images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"]
        }
      ]
    },
    {
      _id: "ORD-896459",
      createdAt: "2026-08-01T14:15:00.000Z",
      OrderStatus: "Cancelled",
      PaymentStatus: "refunded",
      PaymentMethod: "COD",
      OrderPrice: 3200,
      Address: {
        Location: "Gulberg III, Block B",
        City: "Lahore",
        State: "Punjab"
      },
      OrderItems: [
        {
          _id: "item9",
          Name: "Retro Wayfarer Sunglasses",
          Quantity: 1,
          PriceAtPurchase: 3200,
          Images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"]
        }
      ]
    }
  ];
  const FilteredOrders = Orders === "All" ? OrderList : OrderList.filter((item) => item.OrderStatus === Orders);



  const [Expend, setExpend] = useState<boolean>(false);

  return (
    <div className='w-full flex flex-col gap-5'>
      {/* Header */}
      <div className="w-full flex justify-between py-5 px-7 items-center">
        <div className="lg:w-[80%] w-full font-accent text-black flex flex-col gap-1.5">
          <span className="font-bold text-4xl lg:text-4xl">My Orders</span>
          <span className="text-[14px] tracking text-text lg:block hidden font-heading">Here's a quick overview of your orders.</span>
        </div>
        <div className='bg-wh rounded-full flex gap-3 h-fit p-1'>
          <button onClick={() => setOrders("All")} className={`btn-primary py-1 ${Orders === "All" ? "bg-black  text-wh" : " bg-wh text-text"}`}>All</button>
          <button onClick={() => setOrders("Processing")} className={`btn-primary py-1 ${Orders === "Processing" ? "bg-black  text-wh" : " bg-wh text-text"}`}>Processing</button>
          <button onClick={() => setOrders("Shipped")} className={`btn-primary py-1 ${Orders === "Shipped" ? "bg-black  text-wh" : " bg-wh text-text"}`}>Shipped</button>
          <button onClick={() => setOrders("Delivered")} className={`btn-primary py-1 ${Orders === "Delivered" ? "bg-black  text-wh" : " bg-wh text-text"}`}>Delivered</button>
        </div>
      </div>

      {/* Orders */}

      {FilteredOrders.map((o, index) => (
        <div className="w-full bg-wh rounded-lg shadow-xs border-2 border-gray-700/5 p-5 ">

          {/* Header */}

          <div className="w-full flex justify-between items-center">

            <div className="flex flex-col justify-center items-start">
              <div className="text-xl font-semibold text-black font-accent" >Order :{o._id}</div>
              <div className=" text-[14px]" >Placed ${o.createdAt}</div>
            </div>
            <div className="px-5 bg-black text-wh rounded-full">{o.OrderStatus}</div>
          </div>

          {/* Content */}

          <div className=" py-5">
            {/* Left */}
            <div className="grid grid-cols-5 flex-wrap gap-5 ">

              {!Expend ?
                <>
                  {
                    o.OrderItems.slice(0, 4).map((item, index) => (
                      <div key={index} className="w-50 flex flex-col bg-bg p-1 gap-0 rounded-lg animate-fade-up">
                        <img src={item.Images[0]} alt="" className="aspect-square object-cover rounded-lg" />
                        <div className="text-lg text-black  truncate  ">{item.Name}</div>
                        <div className="text-md font-b">Quantity:{item.Quantity}</div>
                      </div>

                    ))}

                  <div className="bg-bg rounded-lg flex flex-col gap-2  p-5 justify-between h-full">
                    <div className="flex flex-col">

                      <div className="font-accent text-xl font-semibold text-black">Summary</div>
                      <div>Items: <span>18</span></div>
                      <div>Payment: <span>COD</span></div>
                      <div>Status: <span>Shipped</span></div>
                      <div>Address: <span>lahore,KSK</span></div>
                    </div>
                    <div className="bg-black p-1 rounded-full flex items-center justify-center text-wh">Rs.2,501</div>

                    <div onClick={() => setExpend(!Expend)} className="w-full cursor-pointer border-2 border-black  rounded-full text-black flex items-center justify-center">
                      {o.OrderItems.length - 2}+ items

                    </div>

                  </div>


                </>
                :
                <>
                  {
                    o.OrderItems.map((item, index) => (
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
            {/* Right */}

          </div>


        </div>
      ))}

    </div>
  )
}

export default RecentOrders