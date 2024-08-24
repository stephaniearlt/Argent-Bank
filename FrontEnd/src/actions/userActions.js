import axios from "axios";

// Définition des types d'action
export const ACTION_TYPES = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
};

// Création des actions
const createAction = (type, payload) => ({ type, payload });

// Actions pour la connexion de l'utilisateur
export const loginRequest = () => createAction(ACTION_TYPES.LOGIN_REQUEST);
export const loginSuccess = (token) => createAction(ACTION_TYPES.LOGIN_SUCCESS, token);
export const loginFailure = (error) => createAction(ACTION_TYPES.LOGIN_FAILURE, error);

// Action pour la déconnexion de l'utilisateur
export const logout = () => createAction(ACTION_TYPES.LOGOUT);

// Configuration d'axios pour communiquer avec l'API
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour se connecter
export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data: { body: { token } } } = await apiClient.post("/user/login", credentials);
    if (token) {
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token));
      return token;
    } else {
      dispatch(loginFailure("No token received"));
      throw new Error("No token received");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Invalid email or password";
    dispatch(loginFailure(errorMessage));
    throw error;
  }
};

// Fonction pour se déconnecter
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};
