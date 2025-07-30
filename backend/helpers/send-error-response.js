export const sendErrorResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({ message, data });
};
