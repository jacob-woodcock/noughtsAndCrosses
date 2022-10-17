import axios from "axios";
import store from "./store";

//set api
const axiosClient = axios.create({
    baseURL: "http://localhost:8000/api",
});

//set interceptors with auth bearer token from store state
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});

export default axiosClient;
