import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// State initial
const initialState = {
  token: null,
  loading: false,
  error: null,
};

// Création du slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // Reducers pour les actions synchrones
  reducers: {
    // Action pour déconnecter l'utilisateur
    logout(state) {
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  // ExtraReducers pour les actions asynchrones
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// Export des actions synchrones
export const { logout } = userSlice.actions;

// Export des selectors et du reducer
export const selectUserToken = (state) => state.user.token;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;

// Configuration de l'instance d'axios
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thunk asynchrone pour gérer la connexion de l'utilisateur
export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const {
        data: {
          body: { token },
        },
      } = await apiClient.post("/user/login", credentials);
      if (token) {
        localStorage.setItem("token", token);
        return token;
      } else {
        return rejectWithValue("No token received");
      }
    } catch ({ response }) {
      const errorMessage =
        response?.data?.message || "Invalid email or password";
      return rejectWithValue(errorMessage);
    }
  }
);

// Thunk synchrone pour gérer la déconnexion de l'utilisateur
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    dispatch(logout());
  }
);
