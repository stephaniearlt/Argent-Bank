// Fonction pour sauvegarder le token avec une date d'expiration
export const saveToken = (token, rememberMe) => {
  // 1 semaine ou 1 heure
  const expirationTime = new Date().getTime() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000); 
  const tokenData = {
    token,
    expirationTime,
  };

  if (rememberMe) {
    // Stockage pour sessions longues
    localStorage.setItem("token", JSON.stringify(tokenData)); 
  } else {
    // Stockage pour sessions courtes
    sessionStorage.setItem("token", JSON.stringify(tokenData)); 
  }
};

// Fonction pour récupérer le token en vérifiant la date d'expiration
export const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("token")) || JSON.parse(sessionStorage.getItem("token"));
  if (tokenData) {
    const { token, expirationTime } = tokenData;
    const currentTime = new Date().getTime();
    if (currentTime < expirationTime) {
      return token; // Token valide
    } else {
      removeToken(); // Token expiré
      return null;
    }
  }
  return null;
};

// Fonction pour supprimer le token du stockage approprié
export const removeToken = (rememberMe) => {
  if (rememberMe) {
    localStorage.removeItem("token"); // Supprimer du localStorage seulement
  } else {
    sessionStorage.removeItem("token"); // Supprimer du sessionStorage seulement
  }
};
