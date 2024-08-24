import axios from "axios";

// Définition des types d'action
export const ACTION_TYPES = {
  PROFILE_REQUEST: "PROFILE_REQUEST",
  PROFILE_SUCCESS: "PROFILE_SUCCESS",
  PROFILE_FAILURE: "PROFILE_FAILURE",
  UPDATE_PROFILE_REQUEST: "UPDATE_PROFILE_REQUEST",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILURE: "UPDATE_PROFILE_FAILURE",
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
};

// Création des actions
const createAction = (type, payload) => ({ type, payload });

// Actions pour le profil utilisateur
export const fetchProfileRequest = () => createAction(ACTION_TYPES.PROFILE_REQUEST);
export const fetchProfileSuccess = (data) => createAction(ACTION_TYPES.PROFILE_SUCCESS, data);
export const fetchProfileFailure = (error) => createAction(ACTION_TYPES.PROFILE_FAILURE, error);

// Actions pour mettre à jour le profil utilisateur
export const updateProfileRequest = () => createAction(ACTION_TYPES.UPDATE_PROFILE_REQUEST);
export const updateProfileSuccess = (data) => createAction(ACTION_TYPES.UPDATE_PROFILE_SUCCESS, data);
export const updateProfileFailure = (error) => createAction(ACTION_TYPES.UPDATE_PROFILE_FAILURE, error);

// Actions pour l'inscription d'un nouvel utilisateur
export const registerRequest = () => createAction(ACTION_TYPES.REGISTER_REQUEST);
export const registerSuccess = (data) => createAction(ACTION_TYPES.REGISTER_SUCCESS, data);
export const registerFailure = (error) => createAction(ACTION_TYPES.REGISTER_FAILURE, error);

// Configuration d'axios pour communiquer avec l'API
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour obtenir le profil utilisateur
export const getProfile = async (token) => {
  const response = await apiClient.post("/user/profile", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fonction pour mettre à jour le profil utilisateur
export const updateProfile = async ({ userName, token }) => {
  const response = await apiClient.put("/user/profile", { userName }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fonction pour créer un nouvel utilisateur
export const register = async (body) => {
  const response = await apiClient.post("/user/signup", body);
  return response.data;
};

// Thunk pour récupérer le profil utilisateur
export const fetchProfile = () => async (dispatch) => {
  dispatch(fetchProfileRequest());
  try {
    const token = localStorage.getItem("token");
    const data = await getProfile(token);
    if (!data || !data.body) {
      throw new Error("Profile data is missing or invalid");
    }
    dispatch(fetchProfileSuccess(data.body));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    dispatch(fetchProfileFailure(errorMessage));
  }
};

// Thunk pour mettre à jour le profil utilisateur
export const updateProfileData = (userName) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const token = localStorage.getItem("token");
    const data = await updateProfile({ userName, token });
    if (!data || !data.body) {
      throw new Error("Profile data is missing or invalid");
    }
    dispatch(updateProfileSuccess(data.body));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    dispatch(updateProfileFailure(errorMessage));
  }
};

// Thunk pour enregistrer un nouvel utilisateur
export const registerUser = (body) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const data = await register(body);
    dispatch(registerSuccess(data.body));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    dispatch(registerFailure(errorMessage));
  }
};
