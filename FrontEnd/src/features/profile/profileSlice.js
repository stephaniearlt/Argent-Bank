import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Gestion des requêtes HTTP
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Appel à l'API pour obtenir les données du profil
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await apiClient.post(
        "/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  }
);

// Appel à l'API pour mettre à jour les données du profil
export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async ({ userName }, { getState, rejectWithValue }) => {
    const token = getState().user.token;
    try {
      const response = await apiClient.put(
        "/user/profile",
        { userName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  }
);

// Appel à l'API pour enregistrer un nouvel utilisateur
export const registerUser = createAsyncThunk(
  "profile/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/signup", credentials);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  }
);

// Logique de mise à jour du state global
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Sélecteurs pour récupérer des morceaux spécifiques du state
export const selectProfile = (state) => state.profile.profile;
export const selectUserName = (state) => state.profile.profile?.userName;
export const selectProfileStatus = (state) => state.profile.status;
export const selectProfileError = (state) => state.profile.error;

export default profileSlice.reducer;
