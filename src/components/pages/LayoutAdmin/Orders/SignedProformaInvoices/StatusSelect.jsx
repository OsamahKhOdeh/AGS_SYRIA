import React from "react";
import "./status_select_styles.css";
import { useDispatch } from "react-redux";
import { changeSignedProformaInvoiceStatus } from "../../../store/proformaInvoicesSlice";
import { updateSignedProformaInvoiceStatus } from "../../../actions/proformaInvoice";
import { orderStatus } from "../../../../../config/piOrderStatus";
const statuses = [
  orderStatus.CONFIRMED,
  orderStatus.DEPOSIT_PAID,
  orderStatus.BOOKED,
  orderStatus.FULL_PAYMENT,
  orderStatus.INVOICE_READY,
  orderStatus.PAKINGLIST_READY,
  orderStatus.DONE_DEAL,
];

const StatusSelect = ({ pi }) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(changeSignedProformaInvoiceStatus({ id: pi.pi_id, status: value }));
    //setInputs(values => ({...values, [name]: value}))
  };

  const handleNextStage = () => {
    dispatch(updateSignedProformaInvoiceStatus({ id: pi.pi_id }));
    dispatch(changeSignedProformaInvoiceStatus({ id: pi.pi_id }));
  };

  return (
    <>
      {/*<select className='select____status__class' id="exporter" name="exporter" onChange={handleChange}>
      {
        orderStatus.map((status) =>
        <option  value={status.status}>{status.status}</option>
        )
      }
    </select>*/}
      <button
        disabled={pi.status !== "disabled"}
        class={pi.status !== "disabled" ? "button_edit_pdf button_next_stage_done" : "button_edit_pdf button_next_stage"}
        onClick={handleNextStage}
      >
        Next Stage
      </button>
    </>
  );
};

export default StatusSelect;
