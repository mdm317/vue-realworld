const token_id = "realworld_token";
export const storeToken = (token) => {
  window.localStorage.setItem(token_id, token);
};
export const destroyToken = () => {
  window.localStorage.removeItem(token_id);
};
export const getToken = () => {
  return window.localStorage.getItem(token_id);
};
