import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar'
import AdminWithdrawRequests from "../../components/Admin/AdminWithdrawRequests";

const AdminDashboardWithdrawPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={7} />
        </div>
        <AdminWithdrawRequests />
      </div>
    </div>
  )
}

export default AdminDashboardWithdrawPage