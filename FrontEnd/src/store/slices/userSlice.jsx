import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Requête asynchrone vers l'API pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password }
      );
      console.log("Response from API:", response.data);
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Requête asynchrone pour obtenir les détails de l'utilisateur
export const profileUser = createAsyncThunk(
  "user/profileUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Défini et gère l'état de l'utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // L'action asynchrone a été déclenchée et est en cours.
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })

      // L'action asynchrone s'est terminée avec succès.
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { token: action.payload.token };
      })
      // L'action asynchrone a échoué.
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // L'action pour ajouter les détails du profil à l'état s'est terminée avec succès.
      .addCase(profileUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })
      // L'action pour ajouter les détails du profil à l'état a échoué.
      .addCase(profileUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
