import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MakiPi from "./MakePi";
import InvoiceInfo from "./InvoiceInfo";
import Table from "../../LayoutAdmin/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { createProformaInvoice } from "../../../../actions/proformaInvoice";
import SuccessPage from "../../LayoutAdmin/SuccessPage/SuccessPage";
import { emptyCart } from "../../../../store/cartSlice";
import { clearFilters } from "../../../../store/filtersSlice";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastType } from "../../Enum/Constants";
import { showToastMessage } from "../../shared/Toaster/Toaster";
import { clearPi, setIsPI } from "../../../../store/piSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const steps = ["Select Products", "Select PI Information", "Make and Download PI"];

export default function ProductsStepper() {
  const navigate = useNavigate();
  const piInfo = useSelector((state) => state.pi.piInfo);
  const piProducts = useSelector((state) => state.pi.piProducts);
  const cart = useSelector((state) => state.cart.cart);

  const isLoading = useSelector((state) => state.show.isLoading);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const dispatch = useDispatch();
  const pi = useSelector((state) => state.pi);
  const [canNext, setCanNext] = React.useState(false);
  useEffect(() => {
    if (
      piInfo.exporter &&
      piInfo.buyerAdress &&
      piInfo.consignee &&
      piInfo.finalDistination &&
      piInfo.partyOfDischarge &&
      piInfo.notifyParty &&
      piInfo.terms.length >= 1 &&
      piInfo.bankDetails.length >= 1 &&
      piInfo.phoneNumber.length >= 1 &&
      piProducts.every((product) => product.qty > 0)
    ) {
      setCanNext(true);
    }
  }, [
    canNext,
    piInfo.bankDetails,
    piInfo.buyerAdress,
    piInfo.consignee,
    piInfo.exporter,
    piInfo.finalDistination,
    piInfo.notifyParty,
    piInfo.partyOfDischarge,
    piInfo.phoneNumber,
    piInfo.terms.length,
    piProducts,
  ]);

  // piProducts.map((product) => {
  //   if (product.qty <= 0) setCanNext(false);
  // });

  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep === 2) {
      dispatch(createProformaInvoice(pi));
      dispatch(clearPi());
      dispatch(emptyCart());
      dispatch(clearFilters());
      showToastMessage("Add PO Succesfully", ToastType.Success);
      // setTimeout(() => {
      //   navigate('/user/piadmin')
      // }, 2000);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    dispatch(clearPi());
    dispatch(emptyCart());
    dispatch(clearFilters());
    setActiveStep(0);
  };
  useEffect(() => {
    dispatch(setIsPI(true));
  }, [dispatch]);
  return (
    <>
      <Box sx={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "25px" }}>
        {activeStep === steps.length ? (
          <React.Fragment>
            <div className="success_container" style={{ display: "flex", justifyContent: "center" }}>
              {!isLoading ? (
                <div className="success_card">
                  <div className="success_div">
                    <i className="success_i">✓</i>
                  </div>
                  <h1 className="success_h1">Success</h1>
                  <p className="success_p">
                    Your Purchase Order Send Successfuly
                    <br />
                  </p>
                  <p className="success_p" style={{ textAlign: "center", paddingTop: "40px" }}>
                    Keep refreshing your orders page{" "}
                  </p>

                  <div className="text-center btn-orders">
                    <span className="ags-btn-sucess-fill">
                      <Link to="/user/orders"> Orders</Link>
                    </span>
                  </div>
                </div>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2, paddingBottom: "20px", alignItems: "flex-end" }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {activeStep === steps.length - 1 ? (
                    <Button disabled={!canNext} variant="contained" onClick={handleNext}>
                      {" "}
                      Send
                    </Button>
                  ) : (
                    <Button variant="contained" disabled={cart.length === 0} onClick={handleNext}>
                      {" "}
                      Next
                    </Button>
                  )}
                </Box>
                <MakiPi />
              </>
            )}
            {activeStep === 1 && (
              <>
                <InvoiceInfo />
                <Table />
                <div className="buttons-add-pi">
                  <button className="ags-btn-main" onClick={handleBack}>
                    {" "}
                    Back{" "}
                  </button>
                  {activeStep === steps.length - 1 ? (
                    <Button disabled={!canNext} variant="contained" onClick={handleNext}>
                      {" "}
                      Send
                    </Button>
                  ) : (
                    <button className="ags-btn-main-fill" onClick={handleNext}>
                      {" "}
                      Next{" "}
                    </button>
                  )}
                </div>
              </>
            )}
            {activeStep === 2 && (
              <>
                <SuccessPage />
                <div className="buttons-add-pi">
                  <button className="ags-btn-main" disabled={activeStep === 0} onClick={handleBack}>
                    {" "}
                    Back{" "}
                  </button>
                  {activeStep === steps.length - 1 && (
                    <button
                      className="ags-btn-main-fill"
                      disabled={
                        !(
                          piInfo.exporter &&
                          piInfo.buyerAdress &&
                          piInfo.consignee &&
                          piInfo.finalDistination &&
                          piInfo.partyOfDischarge &&
                          piInfo.notifyParty &&
                          piInfo.terms.length >= 1 &&
                          piInfo.bankDetails.length >= 1 &&
                          piInfo.phoneNumber.length >= 1 &&
                          piProducts.every((product) => product.qty > 0)
                        )
                      }
                      onClick={handleNext}
                    ></button>
                  )}
                </div>
              </>
            )}
          </React.Fragment>
        )}
      </Box>
    </>
  );
}
