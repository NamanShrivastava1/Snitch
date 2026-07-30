import axios from "axios";

const authApiInstance = axios.create({
  // baseURL: "/api/auth", // For Proxy We use this, but only in Development. (http://localhost:5173/api/auth/api_name)
  baseURL: "https://snitch-niw4.onrender.com/api/auth",
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

export async function getMe() {
  const response = await authApiInstance.get("/me");
  return response.data;
}
