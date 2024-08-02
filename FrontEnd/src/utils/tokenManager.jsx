export const saveToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem("token", token); // Stockage pour sessions longues
  } else {
    sessionStorage.setItem("token", token); // Stockage pour sessions courtes
  }
};

export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const removeToken = (rememberMe) => {
  if (rememberMe) {
    localStorage.removeItem("token"); // Supprimer du localStorage seulement
  } else {
    sessionStorage.removeItem("token"); // Supprimer du sessionStorage seulement
  }
};
