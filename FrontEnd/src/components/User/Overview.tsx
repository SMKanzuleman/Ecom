import { HiMiniCurrencyDollar } from "react-icons/hi2";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";


const Overview = () => {

  const { Name } = useAuth()

  const hardcodedOrders = [
    {
      _id: "ORD-896456",
      createdAt: "2026-08-25T12:00:00.000Z",
      OrderStatus: "processing",
      OrderPrice: 158400,
      OrderItems: [
        {
          _id: "item1",
          Name: "Essential Black Tee",
          Quantity: 2,
          PriceAtPurchase: 2500,
          Size: "L",
          Color: "#000000",
          Images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500"]
        },
        {
          _id: "item2",
          Name: "Raw Denim Jeans",
          Quantity: 1,
          PriceAtPurchase: 4500,
          Size: "32",
          Color: "#1e3a8a",
          Images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500"]
        },

        {
          _id: "item4",
          Name: "Leather Sneakers",
          Quantity: 1,
          PriceAtPurchase: 7000,
          Size: "42",
          Color: "#ffffff",
          Images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"]
        },
        {
          _id: "item5",
          Name: "Oversized Cotton Hoodie",
          Quantity: 2,
          PriceAtPurchase: 6500,
          Size: "XL",
          Color: "#374151",
          Images: ["https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500"]
        },
        {
          _id: "item6",
          Name: "Classic Leather Bomber Jacket",
          Quantity: 1,
          PriceAtPurchase: 18500,
          Size: "L",
          Color: "#451a03",
          Images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"]
        },
        {
          _id: "item7",
          Name: "Minimalist Chronograph Watch",
          Quantity: 1,
          PriceAtPurchase: 12000,
          Size: "40mm",
          Color: "#111827",
          Images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500"]
        },
        {
          _id: "item8",
          Name: "Vintage Canvas Backpack",
          Quantity: 1,
          PriceAtPurchase: 5500,
          Size: "Medium",
          Color: "#78350f",
          Images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"]
        },
        {
          _id: "item9",
          Name: "Retro Wayfarer Sunglasses",
          Quantity: 1,
          PriceAtPurchase: 3200,
          Size: "One Size",
          Color: "#000000",
          Images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"]
        },
        {
          _id: "item10",
          Name: "Knit Wool Beanie",
          Quantity: 1,
          PriceAtPurchase: 1800,
          Size: "Free Size",
          Color: "#1f2937",
          Images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500"]
        },
        {
          _id: "item11",
          Name: "Tailored Slim Fit Suit Blazer",
          Quantity: 1,
          PriceAtPurchase: 22000,
          Size: "40R",
          Color: "#1e1b4b",
          Images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500"]
        },
        {
          _id: "item12",
          Name: "Casual Linen Shirt",
          Quantity: 2,
          PriceAtPurchase: 3800,
          Size: "M",
          Color: "#ffffff",
          Images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"]
        },
        {
          _id: "item13",
          Name: "Urban Cargo Trousers",
          Quantity: 1,
          PriceAtPurchase: 4800,
          Size: "32",
          Color: "#365314",
          Images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"]
        },
        {
          _id: "item14",
          Name: "Running Performance Shorts",
          Quantity: 2,
          PriceAtPurchase: 2200,
          Size: "M",
          Color: "#000000",
          Images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"]
        },
        {
          _id: "item15",
          Name: "Suede Chelsea Boots",
          Quantity: 1,
          PriceAtPurchase: 14500,
          Size: "43",
          Color: "#a16207",
          Images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500"]
        },
        {
          _id: "item16",
          Name: "Patterned Silk Pocket Square",
          Quantity: 1,
          PriceAtPurchase: 1200,
          Size: "Standard",
          Color: "#991b1b",
          Images: ["https://images.unsplash.com/photo-1589756823695-278bc923f962?w=500"]
        },
        {
          _id: "item17",
          Name: "Heavyweight Fleece Sweatpants",
          Quantity: 1,
          PriceAtPurchase: 4200,
          Size: "L",
          Color: "#6b7280",
          Images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500"]
        },

        {
          _id: "item19",
          Name: "Genuine Leather Belt",
          Quantity: 1,
          PriceAtPurchase: 2800,
          Size: "34",
          Color: "#78350f",
          Images: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500"]
        },
        {
          _id: "item20",
          Name: "Sport Gym Duffle Bag",
          Quantity: 1,
          PriceAtPurchase: 6200,
          Size: "35L",
          Color: "#111827",
          Images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"]
        }
      ]
    }
  ];

  const [Expend, setExpend] = useState<boolean>(false);

  const recentOrder = hardcodedOrders[0]

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

      <div className="w-full grid lg:grid-cols-3 grid-cols-1 justify-center lg:px-0 px-5  gap-5">
        {/*KPI */}

        <div className=" bg-wh px-10 flex justify-between rounded-lg py-5 gap-0.5 relative">

          <div className="flex flex-col justify-center items gap-1">
            <span className="font-accent text-xs tracking-wider  text-text">Total Orders</span>
            <div className="font-heading text-5xl text-black font-">10</div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <GiShoppingBag className="text-lg" />
          </div>


        </div>

        <div className=" bg-wh px-10 flex justify-between rounded-lg py-5 gap-0.5 relative">

          <div className="flex flex-col justify-center items gap-1">
            <span className="font-accent text-xs tracking-wider  text-text">In Progress</span>
            <div className="font-heading text-5xl text-black">10</div>
          </div>
          <div className="w-10 h-10 bg-bg rounded-full flex justify-center items-center text-black">
            <GiShoppingBag className="text-lg" />
          </div>


        </div>

        <div className=" bg-wh px-10 flex justify-between rounded-lg py-7 gap-0.5 relative ">

          <div className="flex flex-col justify-center items gap-1">
            <span className="font-accent text-xs tracking-wider  text-text">Total Spent</span>
            <div className="font-heading text-5xl text-black">10,000</div>
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

      <div className="w-full bg-wh rounded-lg shadow-xs border-2 border-gray-700/5 p-5 ">

        {/* Header */}

        <div className="w-full flex justify-between items-center">

          <div className="flex flex-col justify-center items-start">
            <div className="text-xl font-semibold text-black font-accent" >Order :#ORD-896456</div>
            <div className=" text-[14px]" >Placed on 25 April,2025 at 12:00</div>
          </div>

          <div className="px-5 bg-black text-wh rounded-full">Shipped</div>
        </div>

        {/* Content */}

        <div className=" py-5">
          {/* Left */}
          <div className="grid grid-cols-2 lg:grid-cols-5 flex-wrap gap-5 ">

            {!Expend ?
              <>
                {
                  recentOrder.OrderItems.slice(0, 1).map((item, index) => (
                    <div key={index} className="lg:w-50 w-40 flex flex-col  bg-bg p-1 gap-0 rounded-lg animate-fade-up">
                      <img src={item.Images[0]} alt="" className="aspect-square object-cover rounded-lg" />
                      <div className="text-lg text-black  truncate  ">{item.Name}</div>
                      <div className="text-md font-b">Quantity:{item.Quantity}</div>
                    </div>

                  ))}

                <div className="bg-bg rounded-lg flex flex-col gap-2 lg:col-span-1   p-5 justify-between h-full">
                  <div className="flex flex-col">

                    <div className="font-accent text-xl font-semibold text-black">Summary</div>
                    <div>Items: <span>18</span></div>
                    <div>Price: <span>RS.2500</span></div>
                  </div>
                  <div onClick={() => setExpend(!Expend)} className="w-full cursor-pointer border-2 border-black  rounded-full text-black flex items-center justify-center">
                    {recentOrder.OrderItems.length - 2}+ items

                  </div>

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







    </div >
  )
}

export default Overview