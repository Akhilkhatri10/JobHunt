import React from "react";
import Navbar from "./shared/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;