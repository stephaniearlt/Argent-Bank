import axios from "axios";

// Création d'une instance Axios avec configuration de base
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour se connecter
export const login = async ({ email, password }) => {
  const response = await apiClient.post("/user/login", { email, password });
  return response.data;
};

// Fonction pour s'inscrire
export const register = async (body) => {
  const response = await apiClient.post("/user/signup", body);
  return response.data;
};

// Fonction pour obtenir le profil de l'utilisateur
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

// Fonction pour mettre à jour le profil de l'utilisateur
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
