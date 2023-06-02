import React from "react";
import Sidebar from "../../SharedComponents/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import "./Admin.css";

const Admin = ({ children }) => {
  return (
    <div className="admin-dashboard-parent">
      <div className="admin-sidebar-div">
        <Sidebar />
      </div>
      <div className="admin-dashboard-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
