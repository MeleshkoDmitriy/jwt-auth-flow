import { HTTP_STATUS } from "../../constants/index.js";
import { deleteUserRefreshTokens } from "../../services/index.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/index.js";

export const logout = async (req, res) => {
  try {
    await deleteUserRefreshTokens(
      req.user.id,
      req.accessToken.value,
      req.accessToken.expiresIn
    );

    sendSuccessResponse(res, HTTP_STATUS.NO_CONTENT, "Logout successful!");
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
