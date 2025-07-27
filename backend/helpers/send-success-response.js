export const sendSuccessResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({ message, data });
};
