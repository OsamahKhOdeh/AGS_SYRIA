import axios from "axios";
// export const BASE_URL = "http://10.255.254.43:5000";
export const BASE_URL = "http://172.105.88.250:5000";
const API = axios.create({ baseURL: BASE_URL });
// http://143.42.61.215:5000
//"http://localhost:5000"

export const login = ({ username, password }) =>
  API.post("/auth", { username, password });

export const fetchUsersApi = () => API.get("/users");

export const updateUser = (id, { ...updatedUser }) =>
  API.patch(`/users/${id}`, updatedUser);

export const createUser = (newUser) => API.post("/users", newUser);

export const deleteUser = (id) => API.delete(`/users/${id}`);
