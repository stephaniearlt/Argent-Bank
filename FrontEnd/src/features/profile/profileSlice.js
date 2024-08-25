import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// State initial
const initialState = {
  profile: null,
  loading: false,
  error: null,
  success: false,
};

// Création du slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
        state.error = null;
      })
      .addCase(updateProfileData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

// Export des selectors et du reducer
export const selectProfile = (state) => state.profile.profile;
export const selectUserName = (state) => state.profile.profile?.userName;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;
export const selectProfileSuccess = (state) => state.profile.success;

export default profileSlice.reducer;

// Configuration de l'instance d'axios
const apiClient = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thunks asynchrones pour communiquer avec l'API
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const {
        data: { body },
      } = await apiClient.post(
        "/user/profile",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return body;
    } catch ({ response }) {
      const errorMessage =
        response?.data?.message || "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/updateProfileData",
  async (userName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const {
        data: { body },
      } = await apiClient.put(
        "/user/profile",
        { userName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return body;
    } catch ({ response }) {
      const errorMessage =
        response?.data?.message || "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk(
  "profile/registerUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/signup", body);
      return response.data.body;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      return rejectWithValue(errorMessage);
    }
  }
);
