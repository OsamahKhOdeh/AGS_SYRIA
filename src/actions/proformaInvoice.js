import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { setPiNo } from "../store/piSlice";
import { changeProformaInvoiceStatus, changeSignedProformaInvoiceStatus, fetchAllProformaInvoices } from "../store/proformaInvoicesSlice";
import { deleteProductState } from "../store/productsSlice";
import { Branches } from "../components/pages/Enum/Constants";

export const createProformaInvoice = (newProformaInvoice) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    // newProformaInvoice = [...newProformaInvoice.piInfo, { branch: Branches.Syria }];
    let buffer = Object.assign({}, newProformaInvoice.piInfo);
    const { data } = await api.createProformaInvoice(newProformaInvoice);
    dispatch(setIsLoading(false, { status: "success", msg: data.pi_no }));
  } catch (error) {
    console.log(error);
    dispatch(setIsLoading(false, { status: "success", msg: error }));
  }
};

export const getLastPiNo = () => async (dispatch) => {
  const lastPiNo = await api.getLastPiNo();

  dispatch(setPiNo(lastPiNo.data));
};

export const updateProformaInvoiceStatus = (data) => async (dispatch) => {
  try {
    const { res_data } = await api.updateProformaInvoiceStatus(data);
    dispatch(changeProformaInvoiceStatus(data));
  } catch (error) {
    console.log(error);
  }
};

export const getProformaInvoicesAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getProformaInvoices();
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getEmployeeProformaInvoicesAction = (employee) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getEmployeeProformaInvoices(employee);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProformaInvoice = (id, pi) => async (dispatch) => {
  try {
    const { data } = await api.updateProformaInvoice(id, pi);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};

export const getSignedProformaInvoicesAction = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getSignedProformaInvoices();
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getSignedEmployeeProformaInvoicesAction = (employee) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const { data } = await api.getSignedEmployeeProformaInvoices(employee);
    dispatch(fetchAllProformaInvoices(data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};
export const updateSignedProformaInvoiceStatus =
  ({ id, status, currentStage, doneStages, stageNumber }) =>
  async (dispatch) => {
    try {
      dispatch(changeSignedProformaInvoiceStatus({ id, status }));

      /*  const { data } = await api.updateSignedProformaInvoiceStatus({
        id,
        status,
      }); */

      //  dispatch({ type: UPDATE, payload: data });
      //instant change
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProformaInvoice = (id) => async (dispatch) => {
  try {
    await api.deleteProformaInvoice(id);
    dispatch(deleteProductState(id));
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
