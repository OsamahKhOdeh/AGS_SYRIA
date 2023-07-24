import * as api from "../api/index.js";
import { Roles, ToastType } from "../components/pages/Enum/Constants.js";
import { showToastMessage } from "../components/pages/shared/Toaster/Toaster.js";
import useAuth from "../hooks/useAuth.js";
import { setAutherized, setCredentials } from "../store/authSlice.js";

export const login = (formData, navigate) => async (dispatch) => {
  const { username, password } = formData;
  try {
    const { data } = await api.login({ username, password });
    dispatch(setCredentials(data));
    dispatch(setAutherized(true));
    const roles = useAuth().roles;
    if (roles.includes(Roles.Logistic)) {
      navigate("/add-case");
    } else if (roles.includes(Roles.Accounter)) {
      navigate("/under-process");
    } else if (roles.includes(Roles.Archiver)) {
      navigate("/cases");
    } else {
      navigate("/user/products");
    }
    showToastMessage("Logging in Successfully", ToastType.Success);
    // router.push('/');
  } catch (error) {
    if (error.request.status === 401) {
      showToastMessage("Error in user name or password", ToastType.Erorr);
    } else if (error.request.status === 429) {
      showToastMessage("Too many attempts , Please try aftar 5 Minutes", ToastType.Erorr);
    }
    dispatch(setAutherized(false));
  }
};
/*
export const logout = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const refresh = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: AUTH, data });
  
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };*/
