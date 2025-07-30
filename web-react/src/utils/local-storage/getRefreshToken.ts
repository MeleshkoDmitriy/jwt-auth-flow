export const getRefreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  return token;
};
