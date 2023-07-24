import { setIsLoading } from "../store/showingSlice";

import * as api from "../api/index.js";
import { deleteProductState, fetchAll, fetchFilterd, updateProductStockState, updateStockState } from "../store/productsSlice";

export const createProduct = (newProduct) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(newProduct);
  } catch (error) {
    console.log(error);
  }
};
export const getProducts = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchProducts();
    dispatch(fetchAll(data.data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = (filters) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchFilteredProducts(filters);
    // if (data.data2) {
    //  console.log(data.data2);
    // }
    dispatch(fetchFilterd(data.data));

    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(id, product);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};
export const updateProductPrices = (id, prices) => async (dispatch) => {
  try {
    const { data } = await api.updateProductPrices(id, prices);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};
export const updateProductStock = (id, newStock) => async (dispatch) => {
  try {
    const { data } = await api.updateProductStock(id, newStock);
    dispatch(updateProductStockState(id, newStock)); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const updateStock = (id, newStock) => async (dispatch) => {
  // try {
  //   const { data } = await api.updateStock(id, newStock);
  //   console.log(data);
  //   dispatch(updateStockState({ id, data })); //instant change
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const { data } = await api.newStockItem(id, newStock);
    // dispatch(updateStockState({ id, data })); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const updateProductWarehouseBlQty = (id, newStock) => async (dispatch) => {
  try {
    const { data } = await api.updateProductWarehouseBlQty(id, newStock);
    // dispatch(updateStockState({ id, data })); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const updateProductMoveToAvailable = (id, newStock) => async (dispatch) => {
  try {
    const { data } = await api.updateProductMoveToAvailable(id, newStock);
    dispatch(updateStockState({ id, data })); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const updateProductMoveToComing = (id, newStock) => async (dispatch) => {
  try {
    const { data } = await api.updateProductMoveToComing(id, newStock);
    dispatch(updateStockState({ id, data })); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const updateProductWarehouseBlBookedQty = (id, newStock) => async (dispatch) => {
  try {
    const { data } = await api.updateProductWarehouseBlBookedQty(id, newStock);
    dispatch(updateStockState({ id, data })); //instant change
  } catch (error) {
    console.log(error);
  }
};

export const uploadDatasheet = async (datasheet) => {
  try {
    const { data } = await api.uploadDatasheet(datasheet);
    //  dispatch({ type: UPDATE, payload: data });
    //instant change
  } catch (error) {
    console.log(error);
  }
};

export const downloadDatasheet = async (id, fileName) => {
  try {
    // using Java Script method to get PDF file
    fetch(api.BASE_URL_DUBAI + "/download/" + id).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = `${fileName.trim()}.pdf`;
        alink.click();
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteProduct(id);
    // dispatch(deleteProductState(id))
    //dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
