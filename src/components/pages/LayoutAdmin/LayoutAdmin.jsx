import React from 'react'
import './LayoutAdmin.scss'
import { Link, Outlet } from 'react-router-dom';
import { Roles } from '../Enum/Constants';
import useAuth from '../../../hooks/useAuth';
export const LayoutAdmin = () => {
  const { roles, username } = useAuth();
  console.log(roles);
     const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
   const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }
  return (
    <>
  <div id="mySidenav" class="sidenav">
    <a  class="closebtn" onClick={closeNav}>
      <div className='btn-toggle'>
        <i class="uil uil-angle-left-b"></i>
      </div>
    </a>
   
    <a href="">
      <Link to="/user/makepo">Make PO</Link>
    </a>
    <a href="">
      <Link to="/user/orders">Orders</Link>
    </a>
      <a href="">
       <Link to="/user/editItems">Products</Link>
      </a>
          {roles.includes(Roles.Admin || Roles.Financial || Roles.SalesManager) &&  (
      <a href="">
      <Link to="/user/pis">Show PI(s)</Link>
    </a>
    )}
    {roles.includes(Roles.Admin ) &&  (
      <>
          <a href="">
          <Link to="/user/editstock">Edit Stock</Link>
        </a>
      </>
    )}
      {/* <a href="">
      <Link to="/admin/finance">Finance</Link>
    </a> */}
  </div>
  <div className='toggle'>
     <button className='btn-toggle' onClick={() => openNav()}><i class="uil uil-angle-right-b"></i></button>
  </div>
  <Outlet/>
</>
  )
}
export default LayoutAdmin