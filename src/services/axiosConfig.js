import axios from "axios";
// import Cookies from 'js-cookie';
const baseURL = process.env.REACT_APP_BASE_URL;
const instance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("userToken"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: false,
});
axios.defaults.withCredentials = false;
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (
        status === 401
        // || status === 403
      ) {
        //  Cookies.remove('userToken');
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPhone");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
