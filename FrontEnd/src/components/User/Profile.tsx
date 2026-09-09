import { MdVerified } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import API from "../../Utils/API";
import { showSuccessToast } from "../../Utils/toast";
import { BiPhone } from "react-icons/bi";

type ShippingAddressType = {
  Location: string, LandMark: string, State: string, City: string, Zip: string, Phone: string
}


const Profile = ({ setMenu, UserName, UserEmail, DefaultAddress, setDefaultAddress }: any) => {

  const HandleAddAdress = async () => {
    try {
      const res = await API.post("user/dashboard/add/adress", { UserAddress: Address })
      if (res.data) {
        setDefaultAddress(Address)
        showSuccessToast("Default Address Updated")
        console.log(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }


  const [EditAddress, setEditAddress] = useState(false);
  const [Saving, setSaving] = useState(false);

  const [SavedAddress, setSavedAddress] = useState<ShippingAddressType>({ Location: "Your address", LandMark: "Landmark", State: "State", City: "City", Zip: "567", Phone: "923456789012" });

  const [Address, setAddress] = useState<ShippingAddressType>({ Location: "", LandMark: "", State: "", City: "", Zip: "", Phone: "" });

  return (
    <div className="w-full flex flex-col gap-5 lg:px-32 px-5">

      {/* Header */}
      <div className="flex justify-start items-center  gap-5 py-10 border-b-2 border-gray-700/10 py">
        <div className="w-30 h-30 rounded-full bg-wh flex justify-center items-center text-5xl border-2 border-gray-700/20">{UserName[0]}</div>
        <div className="flex flex-col">
          <div className="font-accent flex items-center font-bold text-black text-5xl gap-2"> <div>{UserName}</div> <MdVerified className="text-2xl text-blue-600" /> </div>
          {/* <div className="flex items-center gap-0.5 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full border border-gray-700/20 ">
            <MdVerified className="text-sm text-blue-600" />
            <span className="font-accent leading-none">Verified</span>
          </div> */}
        </div>
      </div>



      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 py-5">

        <div className="flex flex-col bg-wh rounded-lg p-10">

          <div className="lg:text-3xl text-2xl font-accent font-semibold text-black pb-5 flex justify-between pr-10 items-center">
            <span>Personal Details</span>
          </div>


          <div className="flex flex-col gap-1 ">
            <div className="text-[14px] tracking-wider">Full Name: </div>
            <span className="text-black text-lg font-medium">{UserName ? UserName : "NotFound"}</span>
            <div className="text-[14px] tracking-wider flex items-center gap-1.5">
              <span>Email</span>
              <FaLock className="text-xs" />
            </div>
            <span className="text-black text-lg font-medium">{UserEmail ? UserEmail : "NotFound"}</span>
            <div className="text-[14px] tracking-wider">Phone:</div>
            <span className="text-black text-lg font-medium">+{DefaultAddress.Phone? DefaultAddress.Phone : "Not added yet"}</span>
          </div>








        </div>


        <div className="flex flex-col w-full bg-wh rounded-lg p-10  ">

          <div className="lg:text-3xl text-2xl font-accent font-semibold text-black pb-5 flex justify-between items-center">
            <span> Default Address</span>
            <button onClick={() => setEditAddress(!EditAddress)} className="cursor-pointer hover:scale-95"><FaEdit className="text-lg" /></button>
          </div>

          {!EditAddress ? (
            <>
              <span className="text-wh rounded-full px-3 my-2 bg-black  w-fit">Default</span>
              <div className=" text-lg font animate-fade-up">{DefaultAddress.Location}, {DefaultAddress.LandMark},<br /> {DefaultAddress.City},{DefaultAddress.State},{String(SavedAddress.Zip)}
                <br />{String(DefaultAddress.Phone)}
              </div>

            </>

          ) : (
            <form className="flex flex-col gap-2 lg:px-5 animate-fade-up">

              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="streetAddress" className="text-[14px] tracking-wider">Address</label>
                  <input value={Address.Location} onChange={(e) => setAddress({ ...Address, Location: e.target.value })} placeholder="House # 123, Street 4, Sector G" required={true} id="streetAddress" type="text" className="w-full min-w-0 input-primary bg-wh border border-gray-700/30" />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="phone" className="text-[14px] tracking-wider">Phone:</label>
                  <input value={Address.Phone} onChange={(e) => setAddress({ ...Address, Phone: e.target.value })} placeholder="+92 345 7867987" required={true} id="phone" type="text" className="w-full min-w-0 input-primary bg-wh border border-gray-700/30" />
                </div>
              </div>


              <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="landmark" className="text-[14px] tracking-wider">Landmark:</label>
                  <input value={Address.LandMark} onChange={(e) => setAddress({ ...Address, LandMark: e.target.value })} placeholder="Near Central Mosque" required={true} id="landmark" type="text" className="w-full min-w-0  input-primary bg-wh border border-gray-700/30" />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="state" className="text-[14px] tracking-wider">State:</label>
                  <input value={Address.State} onChange={(e) => setAddress({ ...Address, State: e.target.value })} placeholder="Punjab" required={true} id="state" type="text" className="w-full min-w-0  input-primary bg-wh border border-gray-700/30" />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="city" className="text-[14px] tracking-wider">City:</label>
                  <input value={Address.City} onChange={(e) => setAddress({ ...Address, City: e.target.value })} placeholder="Lahore" required={true} id="city" type="text" className="w-full min-w-0 input-primary bg-wh border border-gray-700/30" />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="zip" className="text-[14px] tracking-wider">Zip:</label>
                  <input value={Address.Zip} onChange={(e) => setAddress({ ...Address, Zip: e.target.value })} placeholder="54000" required={true} id="zip" type="text" className="w-full min-w-0  input-primary bg-wh border border-gray-700/30" />
                </div>
              </div>

              <div className="w-full flex justify-between items-center py-2">
                <button onClick={() => setEditAddress(false)} className="btn-primary py-2  text-wh bg-red-600">cancel</button>
                <button onClick={(e) => {
                  e.preventDefault()
                  setSaving(true)
                  setTimeout(() => {
                    setSaving(false)
                    setEditAddress(false)
                    setSavedAddress({ ...Address })
                    HandleAddAdress()

                    setAddress({ Location: "", LandMark: "", State: "", City: "", Zip: "", Phone: "" })
                  }, 2000)

                }} className={`btn-primary py-2 ${Saving ? "opacity-75 cursor-not-allowed" : ""} `}>{Saving ? "Saving..." : "Save"}</button>
              </div>
            </form>

          )}


          <div className="lg:text-3xl text-2xl font-accent font-semibold text-black pt-5 flex justify-between items-center">
            <span>Password</span>
            <button onClick={() => setMenu("Password")} className="cursor-pointer hover:scale-95"><FaArrowUpRightFromSquare className="text-lg" /></button>
          </div>







        </div>


      </div>

    </div>
  )
}

export default Profile