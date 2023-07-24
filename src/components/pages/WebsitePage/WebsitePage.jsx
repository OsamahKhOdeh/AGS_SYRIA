import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./WebsitePage.css";
import { useState } from "react";
import SearchBox from "./SearchBox";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_DOMAIN } from "../../../api/index";
import Products from "./Products/Products";
import { getProducts } from "../../../actions/products";
import LoadingSpinner from "../LayoutAdmin/LoadingSpinner/LoadingSpinner";
const WebsitePage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {}, [location]);
  const showNav = location.pathname === "/website";

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.show.isLoading);
  // const poProucts = useSelector((state) => state.po.products);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const handleSearchBoxChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };
  return isLoading ? (
    <div className="spinner_container">
      <div style={{ width: "200px", height: "200px", margin: "auto" }}>
        <LoadingSpinner />
      </div>
    </div>
  ) : (
    <>
      {showNav && (
        // <Navbar />
        <div className="alsharak-header-deadline">
          <h3 onClick={() => navigate("/user/makepo")}>AlShark Inc</h3>
          {/* <div className="menus-items">
            <a href="https://agsdubai.com/">Home</a>
            <a href={`${BASE_DOMAIN}/website`}>Products</a>
            <a href="https://agsdubai.com/supplier">Suppliers</a>
            <a href="https://agsdubai.com/news">News</a>
            <a href="http://ags-sales.com/check">Check Inverter</a>
            <a href="https://agsdubai.com/contact.html">Contact Us</a>
          </div> */}
          {/* 
          <div className="menus-items-mobile">
            <button class="nav_link" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <a class="invoice">
                <i class="uil uil-bars"></i>
              </a>
            </button>
            <div class="dropdown-menu dropdown-menu-right dropdown-invoice">
              <a href="https://agsdubai.com/" className="dropdown-item">
                {" "}
                Home{" "}
              </a>
              <a href={`${BASE_DOMAIN}/website`} className="dropdown-item">
                {" "}
                Products{" "}
              </a>
              <a href="https://agsdubai.com/supplier" className="dropdown-item">
                {" "}
                Suppliers{" "}
              </a>
              <a href="https://agsdubai.com/news" className="dropdown-item">
                {" "}
                News{" "}
              </a>{" "}
              <a href="http://ags-sales.com/check" className="dropdown-item">
                {" "}
                Check Inverter{" "}
              </a>
              <a href="https://agsdubai.com/contact.html" className="dropdown-item">
                {" "}
                Contact Us{" "}
              </a>
            </div>
          </div> */}
        </div>
      )}
      <div className="po_page_container">
        {/* <div className="po_filters"> */}
        <SearchBox onChange={handleSearchBoxChange} onCategoeyChange={handleCategoryChange} />
        {/* </div> */}
        <Products searchQuery={searchQuery} category={category} />
      </div>
    </>
  );
};

export default WebsitePage;
