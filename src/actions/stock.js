import { setIsLoading } from "../store/showingSlice";
import * as api from "../api/index.js";
import { fetchAll } from "../store/stockSlice";

export const fetchStock = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const data = await api.fetchStock();
    dispatch(fetchAll(data.data));
    dispatch(setIsLoading(false));
  } catch (error) {
    console.log(error);
  }
};
