import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth", // For Proxy We use this, but only in Development. (http://localhost:5173/api/auth/api_name)
  //   baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({
  email,
  contact,
  password,
  fullname,
  isSeller,
}) {
  const response = await authApiInstance.post("/register", {
    email,
    contact,
    password,
    fullname,
    isSeller,
  });
  return response.data;
}

export async function login({ email, password }) {
  const response = await authApiInstance.post("/login", { email, password });
  return response.data;
}
