import React from 'react'
import AdminHeader from '../../components/Admin/Layout/AdminHeader'
import AdminSidebar from '../../components/Admin/Layout/AdminSidebar'
import AdminProducts from "../../components/Admin/AdminProducts";

const AdminDashboardProductsPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={5} />
        </div>
        <AdminProducts />
      </div>
    </div>
  )
}

export default AdminDashboardProductsPage