import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Gestion des requêtes HTTP
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Appel à l'API pour connexion
export const login = createAsyncThunk(
  "user/login",
  async ({ credentials, rememberMe }) => {
    const response = await apiClient.post("/user/login", credentials);
    if (response.data.body && response.data.body.token) {
      return { token: response.data.body.token, rememberMe };
    } else {
      throw new Error("Invalid response format");
    }
  }
);

// Logique de mise à jour du state global pour la gestion du token et des statuts de connexion
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem('token') || null, 
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      // Si la requête réussie, le token est stocké dans le state et dans localStorage si "Remember Me" est coché
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        if (action.payload.rememberMe) {
          localStorage.setItem('token', action.payload.token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

// Sélecteurs pour récupérer des morceaux spécifiques du state
export const selectUserToken = (state) => state.user.token;
export const selectLoginStatus = (state) => state.user.status;
export const selectLoginError = (state) => state.user.error;
