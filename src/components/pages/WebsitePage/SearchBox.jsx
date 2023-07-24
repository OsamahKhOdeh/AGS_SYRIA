import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./WebsitePage.css";
import { set } from "lodash";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { setIsWholesale } from "../../../store/filtersSlice";
import { useDispatch, useSelector } from "react-redux";

const SearchBox = ({ onChange, onCategoeyChange }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const handleFilterClick = (filter) => {
    onCategoeyChange(filter);
    setCategory(filter);
  };
  const [checked, setChecked] = useState(useSelector((state) => state.filters.isWh));
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  const changePrices = () => {
    dispatch(setIsWholesale(!checked));
    setChecked((prev) => !prev);
  };
  return (
    <>
      {" "}
      <div className="header-website">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <input type="text" placeholder="Search.." name="search2" onChange={onChange} />
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="group-buttons">
              <span
                className={`ags-btn-main-fill ${category === "all" ? "chosen_cat" : ""}`}
                onClick={() => {
                  handleFilterClick("all");
                }}
              >
                All
              </span>
              <span
                className={`ags-btn-main-fill ${category === "battery" ? "chosen_cat" : ""}`}
                onClick={() => {
                  handleFilterClick("battery");
                }}
              >
                Battery
              </span>
              <span
                className={`ags-btn-main-fill ${category === "solar" ? "chosen_cat" : ""}`}
                onClick={() => {
                  handleFilterClick("solar");
                }}
              >
                Solar
              </span>
              <span
                className={`ags-btn-main-fill ${category === "inverter" ? "chosen_cat" : ""}`}
                onClick={() => {
                  handleFilterClick("inverter");
                }}
              >
                Inverter
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <span className="switch">
          <Stack direction="row" spacing={1} alignItems="center">
            <AntSwitch checked={checked} inputProps={{ "aria-label": "ant design" }} onChange={() => changePrices()} />
            <Typography>Wholesale</Typography>
          </Stack>
        </span>
      </div>
    </>

    // <div className="search_div_po">
    //   <input className="search_box_po" type="text" placeholder="Search.." name="search2" onChange={onChange} />
    //   <div className="filter_div">
    //     <div
    //       onClick={() => {
    //         handleFilterClick("battery");
    //       }}
    //       className={`filter_but ${category === "battery" ? "chosen_cat" : ""}`}
    //     >
    //       Battery
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("solar");
    //       }}
    //       className={`filter_but ${category === "solar" ? "chosen_cat" : ""}`}
    //     >
    //       Solar
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("inverter");
    //       }}
    //       className={`filter_but ${category === "inverter" ? "chosen_cat" : ""}`}
    //     >
    //       Inverter
    //     </div>
    //     <div
    //       onClick={() => {
    //         handleFilterClick("all");
    //       }}
    //       className={`filter_but ${category === "all" ? "chosen_cat" : ""}`}
    //     >
    //       All
    //     </div>
    //   </div>
    // </div>
  );
};

export default SearchBox;
