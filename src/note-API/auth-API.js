import axios from "axios";

const loginAPI = async (user) => {
  return axios.post("/api/auth/login", user);
}

const signUpAPI = (user) => {
  return axios.post("/api/auth/signup", user);
};

export {
  loginAPI,
  signUpAPI
};