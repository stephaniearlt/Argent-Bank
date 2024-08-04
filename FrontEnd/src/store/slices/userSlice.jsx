import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, getProfile, updateProfile } from "../../api";
import { saveToken, getToken } from "../../utils/tokenManager";

// Connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });
      const token = response.body.token;
      // Utilise rememberMe pour décider du stockage
      saveToken(token, rememberMe);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Création d'un compte utilisateur
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await register(body);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Détails sur l'utilisateur
export const profileUser = createAsyncThunk(
  "user/profileUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await getProfile(token);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Mise à jour de l'utilisateur
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userName, token }, { rejectWithValue }) => {
    try {
      const response = await updateProfile({ userName, token });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);

// Création du slice pour gérer l'état utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: getToken(),
    status: "idle",
    error: null,
  },
  reducers: {
    // Réducteur pour gérer la déconnexion de l'utilisateur
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Gestion des actions asynchrones avec extraReducers
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(profileUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
