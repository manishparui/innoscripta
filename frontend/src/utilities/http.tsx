import Axios from "axios";
import { store } from "../store/store";

const http = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
})

http.interceptors.request.use((config: any) => {
  const token = store.getState().user.token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

export default http;