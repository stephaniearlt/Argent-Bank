import { ACTION_TYPES } from "../actions/profileActions";

// Définition de l'état initial
const initialState = {
  profile: null,
  loading: false,
  error: null,
};

// Fonction pour gérer les états de chargement
const handleRequest = (state) => ({
  ...state,
  loading: true,
  error: null,
});

// Fonction pour gérer les états de succès
const handleSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.payload,
});

// Fonction pour gérer les états d'échec
const handleFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

// Réducteur pour gérer les actions liées au profil
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.PROFILE_REQUEST:
    case ACTION_TYPES.UPDATE_PROFILE_REQUEST:
    case ACTION_TYPES.REGISTER_REQUEST:
      return handleRequest(state);
    case ACTION_TYPES.PROFILE_SUCCESS:
    case ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
    case ACTION_TYPES.REGISTER_SUCCESS:
      return handleSuccess(state, action);
    case ACTION_TYPES.PROFILE_FAILURE:
    case ACTION_TYPES.UPDATE_PROFILE_FAILURE:
    case ACTION_TYPES.REGISTER_FAILURE:
      return handleFailure(state, action);
    default:
      return state;
  }
};

// Sélecteurs pour accéder aux parties spécifiques de l'état
export const selectProfile = (state) => state.profile.profile;
export const selectUserName = (state) => state.profile.profile?.userName;
export const selectProfileLoading = (state) => state.profile.loading;
export const selectProfileError = (state) => state.profile.error;

export default profileReducer;