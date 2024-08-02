import { createSelector } from 'reselect';

// Sélecteur de base pour accéder à la partie `user` du state
const selectUserState = (state) => state.user;

// Sélecteurs spécifiques pour extraire des parties spécifiques du state
export const selectUserToken = createSelector(
  [selectUserState],
  (user) => user.token
);

export const selectUserStatus = createSelector(
  [selectUserState],
  (user) => user.status
);

export const selectUserError = createSelector(
  [selectUserState],
  (user) => user.error
);

export const selectUser = createSelector(
  [selectUserState],
  (user) => user.user
);
