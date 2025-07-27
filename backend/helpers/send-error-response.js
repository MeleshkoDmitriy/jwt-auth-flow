export const sendErrorResponse = (res, statusCode, message, code) => {
  return res.status(statusCode).json({ message, code });
};
