import axios from "axios";
// export const BASE_URL = "https://wibxc.xyz/api";
export const BASE_URL = "http://10.255.254.34:5000";
// export const BASE_URL_DUBAI = "http://143.42.61.215:5000";
export const BASE_URL_DUBAI = "https://agints.vip/api";
// export const BASE_URL = "https://wibxc.xyz/api";
const API = axios.create({ baseURL: BASE_URL });
const API1 = axios.create({ baseURL: BASE_URL_DUBAI });
// const API = axios.create({ baseURL: BASE_URL_DUBAI });
// http://143.42.61.215:5000
//"http://localhost:5000"
export const login = ({ username, password }) =>
  // username === "shark" && password === "shark@admin" ?
  //   API.post("/auth", { username, password }):
  API.post("/auth", { username, password });
export const createProduct = (newProduct) => {
  console.log(newProduct);
  API.post("/products", newProduct);
};
export const fetchProducts = () => API.get(`/products?limit=1000`);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const updateProductPrices = (id, prices) =>
  API.patch(`/products/price/${id}`, { netPrice: prices.netPrice, retailPrice: prices.retailPrice, wholesalePrice: prices.wholesalePrice });
export const uploadDatasheet = (datasheet) => API.post("/upload", datasheet);

export const fetchFilteredProducts = (filters) => API1.get("/products");
export const updateProductWarehouseBlQty = (id, newStock) => API.patch(`/stock/update/${id}?stock=${newStock}`);

export const updateProductMoveToAvailable = (id, newStock) => API.patch(`/products/productmoveavailable/${id}`, newStock);
export const getSignedProformaInvoices = (id) => API.get(`/pi/pisigned`);

export const updateProductMoveToComing = (id, newStock) => API.patch(`/products/productmovecoming/${id}`, newStock);

export const updateProductWarehouseBlBookedQty = (id, newStock) => API.patch(`/products/productbookedqty/${id}`, newStock);

export const updateProductStock = (id, newStock) => API.patch(`/products/stock/${id}`, newStock);

export const updateStock = (id, newStock) => API.patch(`/products/stockall/${id}`, newStock);

export const newStockItem = (id, newStock) => API.post(`/stock/${id}`, newStock);

export const fetchStock = () => API.get(`/stock`);

export const createProformaInvoice = (newProformaInvoice) => API1.post("/pi/syria", newProformaInvoice);

export const deleteProformaInvoice = (id) => API1.delete(`/pi/syria/${id}`);

export const createPurchaseOrder = (newPurchaseOrder) => API.post("/purchaseorder", newPurchaseOrder);

export const getPurchaseOrders = () => API.get(`/purchaseorder`);

export const getEmployeePurchaseOrders = (empolyee_name) => API.get(`/purchaseorder/employee?employeename=${empolyee_name}`);

export const updatePurchaseOrderStatus = ({ id, newStatus, managerMessage, manager }) => API.patch(`/purchaseorder/${id}`, { newStatus, managerMessage, manager });

export const deletePurchaseOrder = (id) => API.delete(`/purchaseOrder/${id}`);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const getLastPiNo = () => API1.get("/pi/last");

export const getProformaInvoices = (id) => API1.get(`/pi/syria`);

export const getEmployeeProformaInvoices = (empolyee_name) => API1.get(`/pi/syria/employee?employeename=${empolyee_name}`);

export const updateProformaInvoiceStatus = (data) => API1.patch(`/pi/syria/${data.id}`, data);
export const getSignedEmployeeProformaInvoices = (empolyee_name) => API.get(`/pi/pisigned/employee/${empolyee_name}`);
export const updateProformaInvoice = (id, updatedProformaInvoice) => API.patch(`/pi/update/${id}`, updatedProformaInvoice);
