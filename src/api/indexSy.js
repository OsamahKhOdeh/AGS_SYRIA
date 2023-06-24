import axios from "axios";
// export const BASE_URL = "http://143.42.61.215:5000";
export const BASE_URL = "http://10.255.254.16:5000";
const API = axios.create({ baseURL: BASE_URL });
// http://143.42.61.215:5000
//"http://localhost:5000"
export const login = ({ username, password }) => {
  API.post("/auth", { username, password });
};
