import React from "react";
import "./ProductNew.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { downloadDatasheet } from "../../../../../actions/products";

const ProductNew = ({ product, index }, props) => {
  const isWholesale = useSelector((state) => state.filters.isWholesale);
  const showQuote = useLocation().pathname === "/website";
  const onButtonClick = async (id, downloadedFileName) => {
    downloadDatasheet(id, downloadedFileName);
  };
  document.body.style.paddingLeft = 0;
  const onGetQuoteClick = (id, code, capacity) => {
    const phoneNumber = "971565527684";
    const message = "Hello AGS, I'm looking for more information about " + code + " with capacity " + capacity;
    const messageArabic = "الرجاء ارسال عرض سعر للمنتج " + "\n" + code + capacity;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl);
  };

  const onGetQuoteClick1 = (id, code) => {
    <a href="https://wa.me/1234567890" target="_blank" class="whatsapp-button">
      <i class="fab fa-whatsapp"></i> Contact us on WhatsApp
    </a>;
  };
  // const poProucts = useSelector((state) => state.po.products);
  // const exist = poProucts.some((item) => item._id === product._id);

  return (
    <>
      <div className="website-product">
        <div class="card">
          <div class="imgBox">
            <img
              src={
                product.image[0] !== "https://res.cloudinary.com/dwen6dx2a/image/upload/v1676527391/vhk7vmtc0dtguqoyvc7a.png"
                  ? product.image
                  : process.env.PUBLIC_URL + `images/${product._id}_1.png` || `images/${product._id}_1.jpg` || `images/${product._id}_1.JPG`
              }
              class="mouse"
              alt={product.category}
            />
          </div>

          <div class="contentBox mt-3">
            <h3>{product.brand}</h3>
            <h3 style={{ fontSize: "16px", fontFamily: "monospace", fontWeight: "600", color: "rgb(197 19 19)" }}>{product.code}</h3>
            <div className="price-capacity">
              <h2>
                <span>{product.capacity}</span>
              </h2>
            </div>
            <div className="button_container">
              <h2 class="price">{isWholesale ? product.wholesalePriceSYP : product.retailPriceSYP} SYP</h2>
              {/* <button className="ags-btn-main-fill" onClick={() => onButtonClick(product._id, product.code)}>
            {" "}
            Datasheet
          </button>
          {showQuote && (
            <button className="ags-btn-sucess-fill " onClick={() => onGetQuoteClick(product._id, product.code, product.capacity)}>
              Get Quote
            </button>
          )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductNew;
