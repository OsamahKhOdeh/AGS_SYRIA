import axios from "axios";
// export const BASE_URL = "http://10.255.254.43:5000";
export const BASE_URL = "http://172.105.88.250:5000";
const API = axios.create({ baseURL: BASE_URL });
