export const grabToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const storeGuestUserData = (guestUser) => {
  localStorage.setItem("guestUserData", JSON.stringify(guestUser));
};

export const grabGuestUser = () => {
  const stringifyObj = localStorage.getItem("guestUserData");
  return JSON.parse(stringifyObj);
};

export const grabUser = () => {
  const stringifyObj = localStorage.getItem("userData");
  return JSON.parse(stringifyObj);
};

export const storeUserData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const clearUsernameAndToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
};
