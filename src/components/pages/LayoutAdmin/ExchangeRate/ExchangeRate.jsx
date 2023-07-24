import React, { useEffect, useState } from "react";
import "./ExchangeRate.scss";
import axios from "axios";
import { BASE_URL } from "../../../../api/index";
import { showToastMessage } from "../../shared/Toaster/Toaster";
import { ToastType } from "../../Enum/Constants";
export const ExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState({
    addition_on_exchange_rate: 0,
    exchange_rate_mode: "auto",
    exchange_rate_to_usd_aleppo: 0,
    exchange_rate_to_usd_manual: 0,
    last_updated: new Date(),
  });
  const [isManual, setIsManual] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setExchangeRate((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  useEffect(() => {
    const getAllExchanges = async () => {
      await axios
        .get(`${BASE_URL}/currency`)
        .then(async (response) => {
          setExchangeRate(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getAllExchanges();
  }, []);
  const changeModeExchangeRate = (mode) => {
    exchangeRate.exchange_rate_mode = mode;
    let buffModel = { ...exchangeRate };
    setExchangeRate(buffModel);
  };
  const updateExchange = () => {
    let model = {
      exchange_rate_mode: exchangeRate.exchange_rate_mode,
      addition_on_exchange_rate: Number(exchangeRate.addition_on_exchange_rate),
      exchange_rate_to_usd_manual: Number(exchangeRate.exchange_rate_to_usd_manual),
    };
    axios
      .patch(`${BASE_URL}/currency/update`, model)
      .then((response) => {
        // console.log(response.data);
        showToastMessage("Change Exchange Successfully", ToastType.Success);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  return (
    <>
      <div className="card">
        <div className="card-tittle">
          <h5>Exchange Rate </h5>
        </div>
        <div className="card-body">
          <form>
            <div className="exchange">
              <div className="exchange-box">
                <div
                  className={`exchange-box-tittle ${exchangeRate.exchange_rate_mode === "auto" ? "active" : "not-active"}`}
                  onClick={() => changeModeExchangeRate("auto")}
                  data-toggle="modal"
                  data-target=".fade"
                >
                  <h6>Automatically Exchange</h6>
                  <span>
                    {exchangeRate.exchange_rate_mode === "auto" && <i class="uil uil-check-circle"></i>}
                    {exchangeRate.exchange_rate_mode === "manual" && <i class="uil uil-circle"></i>}
                  </span>
                </div>
                <div className="exchange-box-content">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exchange_id">Exchange Price</label>
                      <input
                        type="text"
                        readOnly
                        id="exchange_id"
                        name="exchange_rate_to_usd_aleppo"
                        value={exchangeRate?.exchange_rate_to_usd_aleppo}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="additional_price">Additional Exchange Price</label>
                      <input
                        type="text"
                        id="additional_price"
                        name="addition_on_exchange_rate"
                        value={exchangeRate?.addition_on_exchange_rate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="final_exchange">Final Exchange Price</label>
                      <input
                        type="text"
                        readOnly
                        id="final_exchange"
                        value={Number(exchangeRate?.exchange_rate_to_usd_aleppo) + Number(exchangeRate?.addition_on_exchange_rate)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="exchange-box">
                <div
                  className={`exchange-box-tittle ${exchangeRate.exchange_rate_mode === "manual" ? "active" : "not-active"}`}
                  onClick={() => changeModeExchangeRate("manual")}
                  data-toggle="modal"
                  data-target=".fade"
                >
                  <h6>Manual Exchange</h6>
                  <span>
                    {exchangeRate.exchange_rate_mode === "manual" && <i class="uil uil-check-circle"></i>}
                    {exchangeRate.exchange_rate_mode === "auto" && <i class="uil uil-circle"></i>}
                  </span>
                </div>
                <div className="exchange-box-content">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exchange_manual_id">Manual Exchange Price</label>
                      <input
                        type="text"
                        id="exchange_manual_id"
                        name="exchange_rate_to_usd_manual"
                        value={exchangeRate?.exchange_rate_to_usd_manual}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-add-case">
              <button type="button" onClick={() => updateExchange()} className="shark-btn-main">
                Update
              </button>
            </div>
          </form>
          {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">
            Large modal
          </button>

          <div class="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">...</div>
            </div>
          </div>

          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">
            Small modal
          </button> */}
          {/* 
          <div class="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
              <div class="modal-content">...</div>
            </div>
          </div> */}
        </div>
      </div>
      {/* Change Exchange */}
      <div class="modal fade" id="changeExchangeModal" tabIndex="-1" role="dialog" aria-labelledby="changeExchangeModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changeExchangeModal">
                Exchange
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-center">
              <p className="mt-3">Are you sure to change Exchange to {exchangeRate.exchange_rate_mode}</p>
            </div>
            <div class="modal-footer">
              <button type="button" onClick={() => updateExchange()} class="ags-btn-sm-main-outlin" data-dismiss="modal">
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExchangeRate;
