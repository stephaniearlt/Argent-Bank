import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async ({ email, password }) => {
  const response = await apiClient.post("/user/login", { email, password });
  return response.data;
};

export const register = async (body) => {
  const response = await apiClient.post("/user/signup", body);
  return response.data;
};

export const getProfile = async (token) => {
  const response = await apiClient.post(
    "/user/profile",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateProfile = async ({ token, userName }) => {
  const response = await apiClient.put(
    "/user/profile",
    { userName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
