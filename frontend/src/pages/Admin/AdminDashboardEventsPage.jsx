import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar'
import AdminEvents from "../../components/Admin/AdminEvents";

const AdminDashboardEventsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={6} />
        </div>
        <AdminEvents />
      </div>
    </div>
  )
}

export default AdminDashboardEventsPage