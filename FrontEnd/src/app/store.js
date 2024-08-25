import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;
