import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar'
import AdminSellers from "../../components/Admin/AdminSellers";

const AdminDashboardSellersPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={3} />
        </div>
        <AdminSellers />
      </div>
    </div>
  )
}

export default AdminDashboardSellersPage