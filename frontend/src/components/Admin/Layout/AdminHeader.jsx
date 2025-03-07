import React from 'react'
import { AiOutlineGift } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { backend_url } from '../../../server'

const AdminHeader = () => {
    const {user} = useSelector((state) => state.user);

  return (
    <div className="w-full h-[70px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img
            // src="https://i.ibb.co/Pg24SHR/weblogo.png"
            src="https://i.ibb.co/fzB2JRpC/weblogo.png"
            alt=""
            className="w-[100px] h-auto"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#222"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#222"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#222"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#222" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <BiMessageSquareDetail
              color="#222"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
            <img
              src={`${backend_url}${user?.avatar}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
        </div>
      </div>
    </div>
  )
}

export default AdminHeader