import React from "react";
import "./status_select_styles.css";
import { useDispatch } from "react-redux";

import { orderStatusFinance } from "../../../../config/piOrderStatus";
import { changeSignedProformaInvoiceStatus } from "../../../../store/proformaInvoicesSlice";
import { updateSignedProformaInvoiceStatus } from "../../../../actions/proformaInvoice";

const StatusSelect = ({ pi }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(changeSignedProformaInvoiceStatus({ id: pi.pi_id, status: value }));
    dispatch(updateSignedProformaInvoiceStatus({ id: pi.pi_id, status: value }));
    //setInputs(values => ({...values, [name]: value}))
  };

  const handleNextStage = () => {
    dispatch(updateSignedProformaInvoiceStatus({ id: pi.pi_id }));
    dispatch(changeSignedProformaInvoiceStatus({ id: pi.pi_id }));
  };

  return (
    <>
      <select className="select____status__class " id="exporter" name="exporter" onChange={handleChange}>
        {orderStatusFinance.map((status) => (
          <option value={status.status}>{status.status}</option>
        ))}
      </select>
    </>
  );
};

export default StatusSelect;
