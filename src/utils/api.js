import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  // baseURL: `http://todo-pcy-env.eba-c2q7tutr.ap-northeast-2.elasticbeanstalk.com/api`,
  // baseURL: `${process.env.REACT_APP_BACKEND_URI}/api`,

  // baseURL: `${process.env.REACT_APP_BACKEND_Devlop_URI}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization : "Bearer " + sessionStorage.getItem("token"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
