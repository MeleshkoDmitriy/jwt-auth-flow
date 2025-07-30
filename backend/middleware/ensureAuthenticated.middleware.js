import jwt from "jsonwebtoken";
import { CODE, HTTP_STATUS } from "../constants/index.js";
import { INVALID_TOKENS } from "../database/index.js";
import { sendErrorResponse } from "../helpers/index.js";
import { decodeAccessToken } from "../utils/index.js";

export const ensureAuthenticated = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    sendErrorResponse(res, HTTP_STATUS.UNAUTHORIZED, "Access token not found!");
    return;
  }

  if (await INVALID_TOKENS.findOne({ accessToken })) {
    sendErrorResponse(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      "Access token is invalid!"
    );
    return;
  }

  try {
    const decodedAccessToken = decodeAccessToken(accessToken);

    req.accessToken = { value: accessToken, expiresIn: decodedAccessToken.exp };
    req.user = {
      id: decodedAccessToken.userId,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Access token is expired!",
        CODE.ACCESS_TOKEN_EXPIRED
      );
      return;
    } else if (error instanceof jwt.JsonWebTokenError) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Access token is invalid!",
        CODE.ACCESS_TOKEN_INVALID
      );
      return;
    } else {
      sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
      return;
    }
  }
};
