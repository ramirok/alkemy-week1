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
