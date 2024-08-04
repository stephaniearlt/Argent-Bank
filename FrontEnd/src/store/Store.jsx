import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

// Configuration du store Redux
export const store = configureStore({
  reducer: {
    // Le réducteur pour l'état utilisateur est associé à la clé 'user'
    user: userReducer,
  },
});

export default store;
