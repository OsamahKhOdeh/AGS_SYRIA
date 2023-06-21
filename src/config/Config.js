import axios from "axios";
export const BASE_URL = "https://wibxc.xyz/api";
// export const BASE_URL = "https://10.255.254.16:5000";
const API = axios.create({ baseURL: BASE_URL });
