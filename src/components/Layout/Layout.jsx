import React from "react";
import Navbar from "../pages/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};
export default Layout;
