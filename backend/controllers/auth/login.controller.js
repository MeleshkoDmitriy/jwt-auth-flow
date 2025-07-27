import { HTTP_STATUS } from "../../constants/index.js";
import {
  comparePasswords,
  signAccessToken,
  signRefreshToken,
} from "../../utils/index.js";
import { findUserByEmail, insertRefreshToken } from "../../services/index.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/index.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "All fields are required!"
      );
    }

    const user = await findUserByEmail(email);

    if (!user) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Email or password is invalid!"
      );
    }

    const isPasswordMatch = await comparePasswords(password, user.password);

    if (!isPasswordMatch) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        "Email or password is invalid!"
      );
    }

    const accessToken = signAccessToken(user._id);

    const refreshToken = signRefreshToken(user._id);

    await insertRefreshToken(user._id, refreshToken);

    sendSuccessResponse(res, HTTP_STATUS.OK, "Login successful!", {
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
