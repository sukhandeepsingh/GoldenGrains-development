import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminDashboardContents from "../../components/Admin/AdminDashboardContents";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={1} />
        </div>
        <AdminDashboardContents />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
