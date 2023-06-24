import React from 'react'
import './LayoutAdmin.scss'
import { Link, Outlet } from 'react-router-dom';
export const LayoutAdmin = () => {
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
      <Link to="/admin/makepo">Make PO</Link>
    </a>
     <a href="">
      <Link to="/admin/editItems">Edit Items</Link>
    </a>
       <a href="">
      <Link to="/admin/editstock">Edit Stock</Link>
    </a>
  <a href="">
      <Link to="/admin/orders">Orders</Link>
    </a>

  </div>
  <div className='toggle'>
     <button className='btn-toggle' onClick={() => openNav()}><i class="uil uil-angle-right-b"></i></button>
  </div>
  <Outlet/>
</>
  )
}
export default LayoutAdmin