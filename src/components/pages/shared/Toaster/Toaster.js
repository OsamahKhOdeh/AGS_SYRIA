import { toast } from "react-toastify";
import { ToastType } from "../../Enum/Constants";

export const showToastMessage = (msg ,status) => {
  const toastType = ToastType
    if(status === toastType.Success) {
    toast.success(`${msg} `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
  }
  else if(status === toastType.Erorr) {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  else if(status === toastType.Warning) {
    toast.warning(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  };