import { MdVerified } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = ({ setMenu }: any) => {

  const [EditPersonal, setEditPersonal] = useState(false);
  const [EditAddress, setEditAddress] = useState(false);

  return (
    <div className="w-full flex flex-col gap-5 px-32">

      {/* Header */}
      <div className="flex justify-start items-center  gap-5 py-10 border-b-2 border-gray-700/10 py">
        <div className="w-30 h-30 rounded-full bg-wh flex justify-center items-center text-5xl border-2 border-gray-700/20">K</div>
        <div className="flex flex-col">
          <div className="font-accent font-bold text-black text-5xl">Kan</div>
          <div className="flex items-center gap-0.5 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full border border-gray-700/20 ">
            <MdVerified className="text-sm text-blue-600" />
            <span className="font-accent leading-none">Verified</span>
          </div>
        </div>
      </div>



      {/* COntent Area */}
      <div className="grid grid-cols-[1fr_1fr] gap-10 py-5">

        <div className="flex flex-col">

          <div className="text-3xl font-accent font-semibold text-black pb-5 flex justify-between pr-10 items-center">
            <span>Personal Details</span>
            <button onClick={() => setEditPersonal(!EditPersonal)} className="cursor-pointer hover:scale-95"><FaEdit className="text-lg" /></button>
          </div>

          {!EditPersonal ? (
            <div className="flex flex-col gap-1">
              <div className="text-[14px] tracking-wider">Full Name:</div>
              <span className="text-black text-lg font-medium">John Doa</span>
              <div className="text-[14px] tracking-wider flex items-center gap-1.5">
                <span>Email</span>
                <FaLock className="text-xs" />
              </div>
              <span className="text-black text-lg font-medium">johndoa@gmail.com</span>
              <div className="text-[14px] tracking-wider">Phone:</div>
              <span className="text-black text-lg font-medium">+923427822546</span>
            </div>

          ) : (
            <form className="flex flex-col gap-2 px-5 animate-fade-up">
              <label htmlFor="name" className="text-[14px] tracking-wider">Full Name:</label>
              <input placeholder="Steve Smith" required={true} id="name" type="text" className="input-primary bg-wh border border-gray-700/30" />
              <label htmlFor="phone" className="text-[14px] tracking-wider">Phone:</label>
              <input placeholder="+923457867987" required={true} id="phone" type="number" className="input-primary bg-wh border border-gray-700/30" />
              <div className="w-full flex justify-between items-center py-2">
                <button onClick={() => setEditPersonal(false)} className="btn-primary py-2  text-wh bg-red-600">cancel</button>
                <button className="btn-primary py-2">save</button>
              </div>
            </form>
          )}



          <div className="text-3xl font-accent font-semibold text-black py-5 flex justify-between pr-10 items-center">
            <span>Password</span>
            <button onClick={()=>setMenu("Password")} className="cursor-pointer hover:scale-95"><FaArrowUpRightFromSquare className="text-lg" /></button>
          </div>

        </div>


        <div className="flex flex-col ">

          <div className="text-3xl font-accent font-semibold text-black pb-5 flex justify-between pr-10 items-center">
            <span>Address</span>
            <button onClick={() => setEditAddress(!EditAddress)} className="cursor-pointer hover:scale-95"><FaEdit className="text-lg" /></button>
          </div>

          {!EditAddress ? (
            <>
              <span className="text-wh rounded-full px-3 bg-black  w-fit">Default</span>

              <div className="text-black text-lg font-medium">Jane Doe <br />

                123 Fashion Ave,<br /> Suite 4B

                New York,<br /> NY 10001

                United States

              </div>

            </>

          ) : (
            <form className="flex flex-col gap-2 px-5 animate-fade-up">
              <label htmlFor="name" className="text-[14px] tracking-wider">Full Name:</label>
              <input placeholder="Steve Smith" required={true} id="name" type="text" className="input-primary bg-wh border border-gray-700/30" />
              <label htmlFor="phone" className="text-[14px] tracking-wider">Phone:</label>
              <input placeholder="+923457867987" required={true} id="phone" type="number" className="input-primary bg-wh border border-gray-700/30" />
              <div className="w-full flex justify-between items-center py-2">
                <button onClick={() => setEditAddress(false)} className="btn-primary py-2  text-wh bg-red-600">cancel</button>
                <button className="btn-primary py-2">save</button>
              </div>
            </form>

          )}



        </div>
      </div>




    </div>
  )
}

export default Profile