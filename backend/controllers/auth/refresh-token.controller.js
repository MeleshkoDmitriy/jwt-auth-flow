import { HTTP_STATUS } from "../../constants/index.js";
import {
  decodeRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "../../utils/index.js";
import {
  findRefreshToken,
  removeRefreshToken,
  insertRefreshToken,
} from "../../services/index.js";
import { sendErrorResponse, sendSuccessResponse } from "../../helpers/index.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Refresh token is not provided!"
      );
    }

    const decodedRefreshToken = decodeRefreshToken(refreshToken);

    const userRefreshToken = await findRefreshToken(
      refreshToken,
      decodedRefreshToken.userId
    );

    if (!userRefreshToken) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Refresh token is invalid or expired!"
      );
    }

    await removeRefreshToken(userRefreshToken._id);

    const accessToken = signAccessToken(decodedRefreshToken.userId);
    const newRefreshToken = signRefreshToken(decodedRefreshToken.userId);

    await insertRefreshToken(decodedRefreshToken.userId, newRefreshToken);

    sendSuccessResponse(res, HTTP_STATUS.OK, "Refresh token is successful!", {
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Refresh token is invalid or expired!"
      );
    }

    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
