// const EXPIRATION_DAYS = 7;
// const EXPIRATION_MS = EXPIRATION_DAYS * 24 * 60 * 60 * 1000; // 7 jours en millisecondes

// Pour tester la fonctionnalité
const TEST_EXPIRATION_DAYS = 0.002; // Environ 3 minutes
const EXPIRATION_MS = TEST_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export const getStorageData = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  const { data, expiration } = JSON.parse(item);
  if (Date.now() > expiration) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

export const setStorageData = (key, data) => {
  const expiration = Date.now() + EXPIRATION_MS;
  localStorage.setItem(key, JSON.stringify({ data, expiration }));
};
