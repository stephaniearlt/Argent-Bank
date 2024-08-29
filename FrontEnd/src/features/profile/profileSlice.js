import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Configuration de l'instance d'axios
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// State initial
const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
};

// Actions pour gérer les états de chargement
// En attente
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
  state.success = false;
};
// En réussie
const handleFulfilled = (state, { payload }) => {
  state.loading = false;
  state.profile = payload;
  state.error = null;
  state.success = true;
};
// En échec
const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
  state.success = false;
};

// Création du slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, handlePending)
      .addCase(fetchProfile.fulfilled, handleFulfilled)
      .addCase(fetchProfile.rejected, handleRejected)
      .addCase(updateProfileData.pending, handlePending)
      .addCase(updateProfileData.fulfilled, handleFulfilled)
      .addCase(updateProfileData.rejected, handleRejected)
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleFulfilled)
      .addCase(registerUser.rejected, handleRejected);
  },
});

// Export des selectors et du reducer
export const selectProfile = (state) => state.profile.profile;
export const selectUserName = (state) => state.profile.profile?.userName;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectProfileSuccess = (state) => state.profile.success;

export default profileSlice.reducer;

// Thunks asynchrones pour communiquer avec l'API
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data: { body } } = await apiClient.post("/user/profile", {}, getAuthHeaders());
      return body;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (userName, { rejectWithValue }) => {
    try {
      const { data: { body } } = await apiClient.put("/user/profile", { userName }, getAuthHeaders());
      return body;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "profile/registerUser",
  async (body, { rejectWithValue }) => {
    try {
      const { data: { body: userData } } = await apiClient.post("/user/signup", body);
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An unexpected error occurred.");
    }
  }
);
