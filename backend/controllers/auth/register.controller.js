import { ROLE, HTTP_STATUS } from "../../constants/index.js";
import { createUser, findUserByEmail, insertRefreshToken } from "../../services/index.js";
import { sendSuccessResponse, sendErrorResponse } from "../../helpers/index.js";
import { signAccessToken, signRefreshToken } from "../../utils/index.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      sendErrorResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "All fields is required"
      );
      return;
    }

    if (!Object.values(ROLE).includes(role)) {
      sendErrorResponse(res, HTTP_STATUS.UNPROCESSABLE_ENTITY, "Invalid role!");
      return;
    }

    const existingUser = await findUserByEmail(email);
    console.log('Checking for existing user:', email, 'Result:', existingUser);
    
    if (existingUser) {
      sendErrorResponse(
        res,
        HTTP_STATUS.CONFLICT,
        "Users with this email already exists!"
      );
      return;
    }

    const newUser = await createUser(name, email, password, role);

    const accessToken = signAccessToken(newUser._id);
    const refreshToken = signRefreshToken(newUser._id);

    await insertRefreshToken(newUser._id, refreshToken);

    const responseData = {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      accessToken,
      refreshToken,
    };
    console.log('Sending response:', responseData);
    
    sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      "New user created successfully!",
      responseData
    );
  } catch (error) {
    sendErrorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};
