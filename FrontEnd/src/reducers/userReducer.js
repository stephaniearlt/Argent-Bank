import { ACTION_TYPES } from '../actions/userActions';

// Définition de l'état initial
const initialState = {
  token: null,
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
  token: action.payload,
  error: null,
});

// Fonction pour gérer les états d'échec
const handleFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.payload,
});

// Réducteur pour gérer les actions liées à l'utilisateur
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return handleRequest(state);
    case ACTION_TYPES.LOGIN_SUCCESS:
      return handleSuccess(state, action);
    case ACTION_TYPES.LOGIN_FAILURE:
      return handleFailure(state, action);
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Sélecteurs pour accéder aux parties spécifiques de l'état
export const selectUserToken = (state) => state.user.token;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export default userReducer;
