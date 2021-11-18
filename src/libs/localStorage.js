export const saveToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const loadToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

// export const saveState = (state) => {
//   localStorage.setItem("state", JSON.stringify(state));
// };

// export const loadState = () => {
//   const state = localStorage.getItem("state");
//   return JSON.parse(state);
// };
