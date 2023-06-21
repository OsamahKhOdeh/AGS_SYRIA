import React, { useEffect } from "react";
import Navbar from "../pages/Navbar/Navbar";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Roles } from "../pages/Enum/Constants";

export const Layout = () => {
  const roles = useAuth().roles;
  // if (roles.includes(Roles.Admin)) {
  //   return redirect("/history");
  // }u
  const navigate = useNavigate();
  useEffect(() => {
    if (roles.includes(Roles.Admin)) {
      navigate("/history");
    } else if (roles.includes(Roles.Logistic)) {
      navigate("/add-case");
    } else if (roles.includes(Roles.Archiver)) {
      navigate("/cases");
    } else if (roles.includes(Roles.Accounter)) {
      navigate("/under-process");
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      {/* {roles.includes(Roles.Admin)
        ? redirect("/history")
        : redirect("/add-case")} */}
      <Outlet />
    </>
  );
};
export default Layout;
